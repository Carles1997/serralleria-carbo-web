// Proves del formulari real en mode dry-run i amb enviadors falsos (Fase 8, tasca 8.5). Cap prova no
// fa peticions a Microsoft 365: Graph se substitueix per un `fetch` fals.
// Ús: npm run test:contact
import assert from 'node:assert/strict';
import { generateKeyPairSync, createVerify } from 'node:crypto';
import { describe, test } from 'node:test';
import { MAILBOX, MAX_ATTACHMENT_BYTES, MAX_REQUEST_BYTES, RATE_LIMIT_PER_HOUR } from '../src/lib/contact/config.ts';
import { clientAssertion, resetTokenCache, sendMail } from '../src/lib/contact/graph.ts';
import { handleContact, resolveFingerprintSecret, resolveMode } from '../src/lib/contact/handler.ts';
import { contactMessages } from '../src/lib/contact/messages.ts';
import { claim, referenceScope, settle, sweep } from '../src/lib/contact/references.ts';
import { detectKind, REF_PATTERN } from '../src/lib/contact/schema.ts';
import { memoryStore } from '../src/lib/contact/store.ts';
import { consume, fingerprint, hourKey } from '../src/lib/contact/throttle.ts';

const NOW = Date.UTC(2026, 9, 9, 10, 30);
const JPEG = [0xff, 0xd8, 0xff, 0xe0];
const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const bytes = (signature, size) => {
  const data = new Uint8Array(size);
  data.set(signature.slice(0, size));
  return data;
};
const file = (signature, size, name, type = 'application/octet-stream') => new File([bytes(signature, size)], name, { type });

const valid = (overrides = {}) => {
  const fields = {
    tipus: 'particular',
    nom: 'Anna Puig',
    correu: 'anna@example.com',
    telefon: '600 000 000',
    servei: 'estructures',
    descripcio: 'Necessito una barana per a una escala interior.',
    consentiment: 'on',
    idioma: 'ca',
    origen: '/contacte/',
    ...overrides,
  };
  const form = new FormData();
  for (const [name, value] of Object.entries(fields)) if (value !== undefined) form.append(name, value);
  return form;
};

const request = (form, { json = true, locale, headers = {} } = {}) =>
  new Request(`https://local.test/api/contacte${locale ? `?idioma=${locale}` : ''}`, {
    method: 'POST',
    body: form,
    headers: { ...(json ? { accept: 'application/json' } : {}), ...headers },
  });

const SECRET = 'secret-de-prova-estable-0123456789abcdef';

function harness({ mode = 'dry-run', environment = 'local', store = memoryStore(), ip = '192.0.2.10', sendResult = { ok: true, attempts: 1 }, now = () => NOW, secret = SECRET } = {}) {
  const sent = [];
  const logs = [];
  const deps = {
    mode,
    store,
    environment,
    ip,
    fingerprintSecret: secret,
    now,
    send: async (payload) => {
      sent.push(payload);
      await new Promise((resolve) => setTimeout(resolve, 5));
      return typeof sendResult === 'function' ? sendResult(sent.length) : sendResult;
    },
    log: (entry) => logs.push(entry),
  };
  const call = async (form, options) => {
    const response = await handleContact(request(form, options), deps);
    const text = await response.text();
    return { status: response.status, headers: response.headers, body: options?.json === false ? text : JSON.parse(text) };
  };
  return { deps, sent, logs, store, call };
}

describe('validació al servidor', () => {
  test('consulta vàlida en català: dry-run, cap enviament i referència', async () => {
    const h = harness();
    const { status, body, headers } = await h.call(valid());
    assert.equal(status, 200);
    assert.equal(body.state, 'dry-run');
    assert.equal(body.message, contactMessages.ca.notSent);
    assert.match(body.ref, REF_PATTERN);
    assert.equal(h.sent.length, 0);
    assert.equal(headers.get('x-robots-tag'), 'noindex');
    assert.equal(headers.get('cache-control'), 'no-store');
  });

  test('castellà: els missatges segueixen el camp idioma', async () => {
    const { body } = await harness().call(valid({ idioma: 'es' }), { locale: 'es' });
    assert.equal(body.message, contactMessages.es.notSent);
    const invalid = await harness().call(valid({ idioma: 'es', nom: '' }), { locale: 'es' });
    assert.equal(invalid.body.errors.nom, contactMessages.es.errors.required);
  });

  test('sense JavaScript: resposta HTML en l\'idioma de la pàgina, amb noindex', async () => {
    const ok = await harness().call(valid({ idioma: 'es' }), { json: false, locale: 'es' });
    assert.equal(ok.status, 200);
    assert.match(ok.body, /<html lang="es">/);
    assert.match(ok.body, /<meta name="robots" content="noindex">/);
    assert.ok(ok.body.includes(contactMessages.es.notSent));
    assert.ok(ok.body.includes('href="/es/contacto/"'));
    const ko = await harness().call(valid({ correu: 'no-es-correu', descripcio: '' }), { json: false });
    assert.equal(ko.status, 400);
    assert.match(ko.body, /<html lang="ca">/);
    assert.ok(ko.body.includes(contactMessages.ca.errors.email));
    assert.ok(ko.body.includes(`${contactMessages.ca.fieldLabels.descripcio}:`));
  });

  test('camps obligatoris i consentiment', async () => {
    const form = valid({ nom: '', correu: '', servei: '', descripcio: '', consentiment: undefined });
    const { status, body } = await harness().call(form);
    assert.equal(status, 400);
    assert.equal(body.state, 'invalid');
    assert.deepEqual(Object.keys(body.errors).sort(), ['consentiment', 'correu', 'descripcio', 'nom', 'servei']);
    assert.equal(body.errors.consentiment, contactMessages.ca.errors.consent);
  });

  test('formats, longituds i valors permesos', async () => {
    const cases = [
      [{ correu: 'anna@example' }, 'correu', 'email'],
      [{ correu: `${'a'.repeat(250)}@example.com` }, 'correu', 'email'],
      [{ telefon: 'abc' }, 'telefon', 'phone'],
      [{ telefon: '1'.repeat(26) }, 'telefon', 'phone'],
      [{ nom: 'A' }, 'nom', 'length'],
      [{ descripcio: 'curt' }, 'descripcio', 'length'],
      [{ descripcio: 'x'.repeat(5001) }, 'descripcio', 'length'],
      [{ descripcio: '1234567890 !!!' }, 'descripcio', 'letters'],
      [{ servei: 'inventat' }, 'servei', 'choice'],
      [{ tipus: 'altres' }, 'tipus', 'choice'],
    ];
    for (const [overrides, field, code] of cases) {
      const { body } = await harness().call(valid(overrides));
      assert.equal(body.errors?.[field], contactMessages.ca.errors[code], `${field}: ${JSON.stringify(overrides).slice(0, 60)}`);
    }
  });

  test('Industrial: producte opcional amb camp propi; el servei de Particulars no compta', async () => {
    const h = harness({ mode: 'test' });
    assert.equal((await h.call(valid({ tipus: 'empresa', servei: '', empresa: 'Taller SL', unitats: '200', material: 'Inox', termini: '6 setmanes', sector: 'Alimentació' }))).status, 200);
    const body = h.sent[0].message.body.content;
    for (const line of ['Empresa: Taller SL', 'Unitats previstes: 200', 'Material: Inox', 'Termini desitjat: 6 setmanes', 'Sector: Alimentació']) assert.ok(body.includes(line), line);
    // Sense JavaScript arriben els dos desplegables: només compta «producte».
    assert.equal((await h.call(valid({ tipus: 'empresa', servei: 'urgencies', producte: 'peces' }))).status, 200);
    assert.ok(h.sent[1].message.subject.includes('Industrial · Peces i conjunts a mida'));
    assert.ok(!h.sent[1].message.body.content.includes('Reparacions'));
    // Un valor de Particulars al producte no és vàlid.
    const wrong = await h.call(valid({ tipus: 'empresa', producte: 'urgencies' }));
    assert.equal(wrong.status, 400);
    assert.equal(wrong.body.errors.producte, contactMessages.ca.errors.choice);
    // A Particulars, els camps d'Industrial no arriben al correu.
    await h.call(valid({ empresa: 'No hauria de sortir', unitats: '9', producte: 'carros' }));
    assert.ok(!h.sent[2].message.body.content.includes('No hauria de sortir'));
    assert.ok(!h.sent[2].message.subject.includes('Carros'));
  });

  test('manteniment industrial (12/10/2026): només a Industrial, sense dades de fabricació obligatòries', async () => {
    const h = harness({ mode: 'test' });
    const ok = await h.call(valid({ tipus: 'empresa', servei: '', producte: 'manteniment', descripcio: 'Cal revisar una porta seccional de la nau.' }));
    assert.equal(ok.status, 200);
    const { subject, body } = h.sent[0].message;
    assert.ok(subject.includes('Industrial · Manteniment industrial'), subject);
    assert.ok(body.content.includes("Tipus d'encàrrec: Manteniment industrial"), body.content);
    for (const absent of ['Unitats previstes', 'Material:', 'Termini desitjat']) assert.ok(!body.content.includes(absent), absent);
    const es = await h.call(valid({ tipus: 'empresa', producte: 'manteniment', idioma: 'es' }), { locale: 'es' });
    assert.equal(es.status, 200);
    // A Particulars, «manteniment» no és un servei permès.
    const particular = await harness().call(valid({ servei: 'manteniment' }));
    assert.equal(particular.status, 400);
    assert.equal(particular.body.errors.servei, contactMessages.ca.errors.choice);
  });

  test('reparacions (12/10/2026): el valor antic «urgencies» continua vàlid amb l’etiqueta Reparacions', async () => {
    const h = harness({ mode: 'test' });
    assert.equal((await h.call(valid({ servei: 'urgencies' }))).status, 200);
    const { subject, body } = h.sent[0].message;
    assert.ok(subject.includes('Particulars · Reparacions · Ref.'), subject);
    assert.ok(body.content.includes('Servei: Reparacions'), body.content);
    assert.ok(!/urg[eè]nci/i.test(JSON.stringify(h.sent[0])), 'cap «urgències» al correu');
  });

  test('serveis: només claus pròpies de les llistes (toString, constructor, __proto__…)', async () => {
    for (const value of ['toString', 'constructor', '__proto__', 'hasOwnProperty', 'valueOf', 'isPrototypeOf']) {
      const particular = await harness().call(valid({ servei: value }));
      assert.equal(particular.status, 400, `servei=${value}`);
      assert.equal(particular.body.errors.servei, contactMessages.ca.errors.choice, `servei=${value}`);
      const industrial = await harness().call(valid({ tipus: 'empresa', producte: value }));
      assert.equal(industrial.status, 400, `producte=${value}`);
      assert.equal(industrial.body.errors.producte, contactMessages.ca.errors.choice, `producte=${value}`);
    }
  });

  test('tipus de fitxer pel contingut', () => {
    assert.equal(detectKind(bytes(JPEG, 16)), 'jpeg');
    assert.equal(detectKind(bytes(PNG, 16)), 'png');
    assert.equal(detectKind(new TextEncoder().encode('%PDF-1.7 ...')), 'pdf');
    assert.equal(detectKind(new Uint8Array([0, 0, 0, 24, ...new TextEncoder().encode('ftypheic'), 0, 0])), 'heic');
    assert.equal(detectKind(new TextEncoder().encode('MZ executable')), undefined);
  });
});

describe('adjunts: límit en bytes', () => {
  test(`exactament ${MAX_ATTACHMENT_BYTES} bytes s'accepta; un byte per sota també`, async () => {
    for (const size of [MAX_ATTACHMENT_BYTES, MAX_ATTACHMENT_BYTES - 1]) {
      const form = valid();
      form.append('adjunt', file(JPEG, size, 'foto.jpg', 'image/jpeg'));
      const { status, body } = await harness().call(form);
      assert.equal(status, 200, `${size} bytes`);
      assert.equal(body.state, 'dry-run');
    }
  });

  test('un byte per sobre del límit: 413 amb el missatge del fitxer', async () => {
    const form = valid();
    form.append('adjunt', file(JPEG, MAX_ATTACHMENT_BYTES + 1, 'foto.jpg', 'image/jpeg'));
    const { status, body } = await harness().call(form);
    assert.equal(status, 413);
    assert.equal(body.state, 'too-large');
    assert.equal(body.errors.adjunt, contactMessages.ca.errors.fileSize);
  });

  test('la mida exacta arriba íntegra al correu (base64)', async () => {
    const h = harness({ mode: 'test' });
    const form = valid();
    form.append('adjunt', file(JPEG, MAX_ATTACHMENT_BYTES, 'plànol.jpg', 'image/jpeg'));
    assert.equal((await h.call(form)).status, 200);
    const attachment = h.sent[0].message.attachments[0];
    assert.equal(Buffer.from(attachment.contentBytes, 'base64').length, MAX_ATTACHMENT_BYTES);
    assert.equal(attachment.contentType, 'image/jpeg');
    assert.equal(attachment.name, 'plànol.jpg');
  });

  test('extensió que no coincideix amb el contingut, executable i fitxer buit: 415', async () => {
    for (const attachment of [file(PNG, 100, 'foto.jpg'), file([0x4d, 0x5a], 100, 'factura.pdf'), file([], 0, 'buit.pdf')]) {
      const form = valid();
      form.append('adjunt', attachment);
      const { status, body } = await harness().call(form);
      assert.equal(status, 415, attachment.name);
      assert.equal(body.errors.adjunt, contactMessages.ca.errors.fileType);
    }
  });

  test('cap fitxer seleccionat no és un error', async () => {
    const form = valid();
    form.append('adjunt', new File([], '', { type: 'application/octet-stream' }));
    assert.equal((await harness().call(form)).status, 200);
  });

  test('error de fitxer amb altres errors: 400 amb tots els camps', async () => {
    const form = valid({ nom: '' });
    form.append('adjunt', file(JPEG, MAX_ATTACHMENT_BYTES + 1, 'foto.jpg'));
    const { status, body } = await harness().call(form);
    assert.equal(status, 400);
    assert.deepEqual(Object.keys(body.errors).sort(), ['adjunt', 'nom']);
  });

  test('petició més gran que el màxim declarat: 413 sense llegir el cos', async () => {
    const h = harness();
    const response = await handleContact(
      new Request('https://local.test/api/contacte?idioma=es', { method: 'POST', body: 'x', headers: { accept: 'application/json', 'content-type': 'multipart/form-data; boundary=x', 'content-length': String(MAX_REQUEST_BYTES + 1) } }),
      h.deps,
    );
    assert.equal(response.status, 413);
    assert.equal((await response.json()).message, contactMessages.es.errors.fileSize);
  });
});

describe('peticions incorrectes', () => {
  test('mètode, tipus de contingut i multipart malmès', async () => {
    const h = harness();
    const get = await handleContact(new Request('https://local.test/api/contacte', { headers: { accept: 'application/json' } }), h.deps);
    assert.equal(get.status, 405);
    assert.equal(get.headers.get('allow'), 'POST');
    const json = await handleContact(new Request('https://local.test/api/contacte', { method: 'POST', body: '{}', headers: { accept: 'application/json', 'content-type': 'application/json' } }), h.deps);
    assert.equal(json.status, 400);
    const broken = await handleContact(new Request('https://local.test/api/contacte', { method: 'POST', body: '--x\r\nbroken', headers: { accept: 'application/json', 'content-type': 'multipart/form-data; boundary=x' } }), h.deps);
    assert.equal(broken.status, 400);
    assert.equal((await broken.json()).state, 'bad-request');
  });
});

describe('antispam', () => {
  test('camp parany ple: resposta d\'acceptació, sense enviament ni dades desades', async () => {
    const h = harness({ mode: 'test' });
    const { status, body } = await h.call(valid({ nota_interna: 'http://spam.example' }));
    assert.equal(status, 200);
    assert.equal(body.state, 'sent');
    assert.equal(h.sent.length, 0);
    assert.equal(h.store.size(), 0);
    assert.equal(h.logs.at(-1).result, 'honeypot');
  });

  test('emplenament ràpid i molts enllaços: es marca, no es rebutja', async () => {
    const h = harness({ mode: 'test' });
    const links = 'Mireu https://a.example https://b.example www.c.example http://d.example per favor';
    const { status } = await h.call(valid({ temps: '1200', descripcio: links }));
    assert.equal(status, 200);
    const content = h.sent[0].message.body.content;
    assert.ok(content.includes('Senyal antispam: enviament ràpid (1,2 s)'));
    assert.ok(content.includes('Senyal antispam: 4 enllaços a la descripció'));
    assert.deepEqual(h.logs.at(-1).signals, ['rapid', 'enllacos']);
  });

  test('sense mesura de temps (sense JavaScript): cap senyal', async () => {
    const h = harness({ mode: 'test' });
    await h.call(valid());
    assert.ok(!h.sent[0].message.body.content.includes('Senyal antispam'));
  });
});

describe('control de freqüència', () => {
  test(`${RATE_LIMIT_PER_HOUR} consultes per hora i connexió; la sisena, 429; una altra connexió continua`, async () => {
    const store = memoryStore();
    const h = harness({ store });
    for (let index = 0; index < RATE_LIMIT_PER_HOUR; index += 1) assert.equal((await h.call(valid())).status, 200);
    const limited = await h.call(valid());
    assert.equal(limited.status, 429);
    assert.equal(limited.body.message, contactMessages.ca.rateLimited);
    assert.equal((await harness({ store, ip: '198.51.100.7' }).call(valid())).status, 200);
  });

  test('els errors de validació no gasten el límit', async () => {
    const h = harness();
    for (let index = 0; index < 10; index += 1) assert.equal((await h.call(valid({ nom: '' }))).status, 400);
    assert.equal((await h.call(valid())).status, 200);
  });

  test('10 peticions simultànies des de la mateixa connexió: mai més de 5 i cap increment perdut', async () => {
    const h = harness();
    const results = await Promise.all(Array.from({ length: 10 }, () => h.call(valid())));
    const statuses = results.map((result) => result.status);
    const accepted = statuses.filter((status) => status === 200).length;
    assert.ok(accepted >= 1 && accepted <= RATE_LIMIT_PER_HOUR, `acceptades: ${accepted}`);
    assert.equal(statuses.filter((status) => status === 429).length, 10 - accepted);
    const counter = await h.store.get(`rl/${hourKey(NOW)}/${referenceScope('dry-run', 'local')}/${await fingerprint('192.0.2.10', SECRET, NOW)}`);
    assert.equal(counter.data.count, accepted);
    // Passada la ràfega, la mateixa connexió pot completar el límit de l'hora.
    for (let index = accepted; index < RATE_LIMIT_PER_HOUR; index += 1) assert.equal((await h.call(valid())).status, 200);
    assert.equal((await h.call(valid())).status, 429);
  });

  test('escriptura condicional: cap increment perdut amb 20 escriptures simultànies', async () => {
    const store = memoryStore();
    const results = await Promise.all(Array.from({ length: 20 }, () => consume(store, 'live/production', 'empremta', NOW, 100, 50)));
    const oks = results.filter((result) => result === 'ok').length;
    assert.equal(oks, 20);
    assert.equal((await store.get(`rl/${hourKey(NOW)}/live/production/empremta`)).data.count, 20);
  });

  test('amb pocs intents, els conflictes es responen com a límit, no com a acceptació', async () => {
    const store = memoryStore();
    const results = await Promise.all(Array.from({ length: 20 }, () => consume(store, 'live/production', 'empremta', NOW, 100, 1)));
    const oks = results.filter((result) => result === 'ok').length;
    assert.equal((await store.get(`rl/${hourKey(NOW)}/live/production/empremta`)).data.count, oks);
    assert.ok(results.every((result) => result === 'ok' || result === 'conflict'));
  });

  test('l\'empremta canvia cada dia i no conté la IP', async () => {
    const today = await fingerprint('192.0.2.10', 's', NOW);
    assert.notEqual(today, await fingerprint('192.0.2.10', 's', NOW + 86_400_000));
    assert.ok(!today.includes('192'));
    assert.match(today, /^[0-9a-f]{32}$/);
  });
});

describe('prevenció de duplicats', () => {
  test('la mateixa referència dues vegades: un sol correu i la mateixa resposta', async () => {
    const h = harness({ mode: 'test' });
    const first = await h.call(valid({ ref: 'ABCDEFGH23' }));
    const second = await h.call(valid({ ref: 'ABCDEFGH23' }));
    assert.equal(first.status, 200);
    assert.equal(second.status, 200);
    assert.equal(second.body.duplicate, true);
    assert.equal(second.body.ref, 'ABCDEFGH23');
    assert.equal(h.sent.length, 1);
  });

  test('cinc enviaments simultanis amb la mateixa referència: un sol correu', async () => {
    const h = harness({ mode: 'test' });
    const results = await Promise.all(Array.from({ length: 5 }, () => h.call(valid({ ref: 'ZZZZZZZZZZ' }))));
    assert.equal(h.sent.length, 1);
    assert.ok(results.every((result) => result.status === 200 || result.status === 409), results.map((r) => r.status).join());
    assert.ok(results.some((result) => result.status === 409));
    assert.equal(results.find((result) => result.status === 409).body.message, contactMessages.ca.inProgress);
  });

  test('després d\'un error es pot tornar a provar amb la mateixa referència', async () => {
    const h = harness({ mode: 'test', sendResult: (count) => (count === 1 ? { ok: false, code: 'unavailable', attempts: 3 } : { ok: true, attempts: 1 }) });
    const failed = await h.call(valid({ ref: 'RETRY23456' }));
    assert.equal(failed.status, 502);
    assert.equal(failed.body.message, contactMessages.ca.failed);
    assert.equal((await h.call(valid({ ref: 'RETRY23456' }))).status, 200);
    assert.equal(h.sent.length, 2);
  });

  test('un «enviant» de més de 60 s es considera interromput', async () => {
    const store = memoryStore();
    const scope = referenceScope('live', 'production');
    await store.set(`sub/${scope}/STALE23456`, { state: 'sending', mode: 'live', at: NOW - 61_000 });
    assert.deepEqual(await claim(store, 'live', scope, 'STALE23456', NOW), { kind: 'new' });
    await store.set(`sub/${scope}/FRESH23456`, { state: 'sending', mode: 'live', at: NOW - 5_000 });
    assert.deepEqual(await claim(store, 'live', scope, 'FRESH23456', NOW), { kind: 'in-progress' });
  });

  test('sense referència vàlida (sense JavaScript), la funció en genera una', async () => {
    const { body } = await harness().call(valid({ ref: 'curta' }));
    assert.match(body.ref, REF_PATTERN);
  });
});

describe('referències separades per mode i entorn', () => {
  // Alfabet de referències: sense O, I, L, 0 ni 1.
  const REF = 'MQDE234567';
  const run = async (store, mode, environment, sent) => {
    const h = harness({ mode, environment, store });
    const result = await h.call(valid({ ref: REF }));
    // La referència enviada es conserva: si no, la prova no comprovaria la separació d'àmbits.
    assert.equal(result.body.ref, REF);
    sent.push(...h.sent);
    return result;
  };

  test('dry-run → live: la demostració no confirma cap enviament real', async () => {
    const store = memoryStore();
    const sent = [];
    const dry = await run(store, 'dry-run', 'production', sent);
    assert.equal(dry.body.state, 'dry-run');
    const live = await run(store, 'live', 'production', sent);
    assert.equal(live.status, 200);
    assert.equal(live.body.state, 'sent');
    assert.notEqual(live.body.duplicate, true);
    assert.equal(sent.length, 1);
  });

  test('dry-run → test: la prova envia', async () => {
    const store = memoryStore();
    const sent = [];
    await run(store, 'dry-run', 'branch-deploy', sent);
    const test = await run(store, 'test', 'branch-deploy', sent);
    assert.equal(test.body.state, 'sent');
    assert.notEqual(test.body.duplicate, true);
    assert.equal(sent.length, 1);
    assert.ok(sent[0].message.subject.startsWith('[PROVA] '));
  });

  test('test → live: una prova no confirma l\'enviament real', async () => {
    const store = memoryStore();
    const sent = [];
    await run(store, 'test', 'production', sent);
    const live = await run(store, 'live', 'production', sent);
    assert.notEqual(live.body.duplicate, true);
    assert.equal(sent.length, 2);
    assert.ok(!sent[1].message.subject.startsWith('[PROVA]'));
  });

  test('dins del mateix mode i entorn, la protecció contra duplicats es manté', async () => {
    for (const mode of ['dry-run', 'test', 'live']) {
      const store = memoryStore();
      const sent = [];
      await run(store, mode, 'production', sent);
      const again = await run(store, mode, 'production', sent);
      assert.equal(again.body.duplicate, true, mode);
      assert.equal(sent.length, mode === 'dry-run' ? 0 : 1, mode);
    }
  });

  test('mateix mode en un altre entorn: referència independent', async () => {
    const store = memoryStore();
    const sent = [];
    await run(store, 'test', 'branch-deploy', sent);
    const other = await run(store, 'test', 'deploy-preview', sent);
    assert.notEqual(other.body.duplicate, true);
    assert.equal(sent.length, 2);
  });

  test('un registre de demostració dins de l\'àmbit real no es pren com a confirmació', async () => {
    const store = memoryStore();
    const scope = referenceScope('live', 'production');
    await store.set(`sub/${scope}/${REF}`, { state: 'dry-run', mode: 'dry-run', at: NOW });
    assert.deepEqual(await claim(store, 'live', scope, REF, NOW), { kind: 'new' });
    await store.set(`sub/${scope}/LEGACY2345`, { state: 'sent', at: NOW });
    assert.deepEqual(await claim(store, 'live', scope, 'LEGACY2345', NOW), { kind: 'new' });
    assert.match(REF, REF_PATTERN);
  });

  test('els comptadors de freqüència també són per àmbit', async () => {
    const store = memoryStore();
    for (let index = 0; index < RATE_LIMIT_PER_HOUR; index += 1) assert.equal((await harness({ store, environment: 'branch-deploy' }).call(valid())).status, 200);
    assert.equal((await harness({ store, environment: 'branch-deploy' }).call(valid())).status, 429);
    assert.equal((await harness({ store, mode: 'live', environment: 'production' }).call(valid())).status, 200);
  });
});

describe('secret estable de l\'empremta', () => {
  test('test i live exigeixen RL_SECRET d\'almenys 32 caràcters; dry-run admet el provisional', () => {
    const fallback = 'provisional-de-la-instancia';
    assert.equal(resolveFingerprintSecret('live', SECRET, fallback), SECRET);
    assert.equal(resolveFingerprintSecret('test', SECRET, fallback), SECRET);
    assert.equal(resolveFingerprintSecret('live', undefined, fallback), undefined);
    assert.equal(resolveFingerprintSecret('test', '', fallback), undefined);
    assert.equal(resolveFingerprintSecret('live', 'curt', fallback), undefined);
    assert.equal(resolveFingerprintSecret('dry-run', undefined, fallback), fallback);
    assert.equal(resolveFingerprintSecret('dry-run', SECRET, fallback), SECRET);
  });

  test('sense secret: error controlat (503), sense enviar ni desar res', async () => {
    for (const [mode, locale] of [['test', 'ca'], ['live', 'es']]) {
      const h = harness({ mode, secret: null });
      const { status, body } = await h.call(valid({ idioma: locale }), { locale });
      assert.equal(status, 503, mode);
      assert.equal(body.state, 'failed');
      assert.equal(body.message, contactMessages[locale].failed);
      assert.equal(h.sent.length, 0);
      assert.equal(h.store.size(), 0);
      assert.equal(h.logs.at(-1).code, 'rl_secret_missing');
    }
    const html = await harness({ mode: 'live', secret: null }).call(valid(), { json: false });
    assert.equal(html.status, 503);
    assert.ok(html.body.includes(contactMessages.ca.failed));
  });
});

describe('errors del magatzem i de l\'enviament', () => {
  test('si el magatzem falla, la consulta s\'accepta igualment', async () => {
    const broken = { get: async () => { throw new Error('caigut'); }, set: async () => { throw new Error('caigut'); }, delete: async () => {}, list: async () => [] };
    const h = harness({ mode: 'test', store: broken });
    assert.equal((await h.call(valid())).status, 200);
    assert.equal(h.sent.length, 1);
    assert.ok(h.logs.some((entry) => entry.warning === 'store_unavailable'));
  });

  test('mode real sense credencials: 502, sense enviament', async () => {
    const h = harness({ mode: 'live' });
    h.deps.send = undefined;
    const { status, body } = await h.call(valid({ idioma: 'es' }), { locale: 'es' });
    assert.equal(status, 502);
    assert.equal(body.message, contactMessages.es.failed);
    assert.equal(h.logs.at(-1).code, 'not_configured');
  });

  test('els registres no contenen dades personals', async () => {
    const h = harness({ mode: 'test' });
    await h.call(valid());
    await h.call(valid({ correu: 'malament' }));
    const text = JSON.stringify(h.logs);
    for (const personal of ['Anna', 'anna@example.com', '600 000 000', '192.0.2.10', 'barana']) assert.ok(!text.includes(personal), personal);
  });
});

describe('correu', () => {
  test('remitent i destinatari fixats al servidor; Reply-To validat; assumpte sense nom', async () => {
    const h = harness({ mode: 'test' });
    await h.call(valid({ toRecipients: 'atacant@example.com', destinatari: 'atacant@example.com', ref: 'MAQ2345678' }));
    const { message, saveToSentItems } = h.sent[0];
    assert.deepEqual(message.toRecipients, [{ emailAddress: { address: MAILBOX } }]);
    assert.deepEqual(message.replyTo, [{ emailAddress: { address: 'anna@example.com', name: 'Anna Puig' } }]);
    assert.equal(message.subject, '[PROVA] Consulta web · Particulars · Estructures · Ref. MAQ2345678');
    assert.ok(!message.subject.includes('Anna'));
    assert.equal(saveToSentItems, false);
    assert.deepEqual(message.internetMessageHeaders, [{ name: 'X-Carbo-Ref', value: 'MAQ2345678' }]);
    assert.ok(message.body.content.includes('Política de privacitat acceptada: sí'));
    assert.ok(message.body.content.includes('Comunicacions comercials: no'));
    assert.ok(!JSON.stringify(h.sent).includes('atacant'));
  });

  test('un correu amb salts de línia no es pot fer servir com a Reply-To', async () => {
    const h = harness({ mode: 'test' });
    const { status } = await h.call(valid({ correu: 'anna@example.com\r\nBcc: altre@example.com' }));
    assert.equal(status, 400);
    assert.equal(h.sent.length, 0);
  });

  test('mode efectiu: «live» només a producció', () => {
    assert.equal(resolveMode('live', 'production'), 'live');
    assert.equal(resolveMode('live', 'branch-deploy'), 'dry-run');
    assert.equal(resolveMode('test', 'branch-deploy'), 'test');
    assert.equal(resolveMode(undefined, 'production'), 'dry-run');
    assert.equal(resolveMode('qualsevol', 'production'), 'dry-run');
  });
});

describe('Microsoft Graph (fetch fals)', () => {
  const config = { tenantId: 'tenant', clientId: 'client', clientSecret: 'no-real' };
  const graphDeps = (responses) => {
    const calls = [];
    const waits = [];
    let clock = NOW;
    return {
      calls,
      waits,
      deps: {
        now: () => clock,
        sleep: async (ms) => {
          waits.push(ms);
          clock += ms;
        },
        fetch: async (url, init) => {
          calls.push({ url: String(url), init });
          if (String(url).includes('login.microsoftonline.com')) return Response.json({ access_token: 'testimoni', expires_in: 3600 });
          const next = responses.shift();
          if (next instanceof Error) throw next;
          return new Response(null, { status: next.status, headers: next.headers });
        },
      },
    };
  };
  const timeout = () => Object.assign(new Error('timeout'), { name: 'TimeoutError' });

  test('202 al primer intent; petició a la bústia fixada', async () => {
    resetTokenCache();
    const g = graphDeps([{ status: 202 }]);
    assert.deepEqual(await sendMail(config, { message: {} }, g.deps), { ok: true, attempts: 1 });
    const token = g.calls[0].init.body;
    assert.equal(token.get('grant_type'), 'client_credentials');
    assert.equal(token.get('scope'), 'https://graph.microsoft.com/.default');
    assert.equal(g.calls[1].url, `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(MAILBOX)}/sendMail`);
    assert.equal(g.calls[1].init.headers.authorization, 'Bearer testimoni');
  });

  test('503, 503 i 202: dos reintents amb espera creixent', async () => {
    resetTokenCache();
    const g = graphDeps([{ status: 503 }, { status: 503 }, { status: 202 }]);
    assert.deepEqual(await sendMail(config, {}, g.deps), { ok: true, attempts: 3 });
    assert.deepEqual(g.waits, [500, 1500]);
  });

  test('tres errors temporals: s\'atura sense un quart intent', async () => {
    resetTokenCache();
    const g = graphDeps([{ status: 503 }, { status: 500 }, { status: 504 }, { status: 202 }]);
    const result = await sendMail(config, {}, g.deps);
    assert.equal(result.ok, false);
    assert.equal(result.code, 'unavailable');
    assert.equal(result.attempts, 3);
  });

  test('errors definitius: sense reintent', async () => {
    for (const [status, code] of [[400, 'bad_request'], [401, 'auth_failed'], [403, 'forbidden'], [404, 'mailbox_not_found'], [413, 'too_large']]) {
      resetTokenCache();
      const g = graphDeps([{ status }, { status: 202 }]);
      assert.deepEqual(await sendMail(config, {}, g.deps), { ok: false, code, status, attempts: 1 });
    }
  });

  test('429: respecta Retry-After curt i abandona si és llarg', async () => {
    resetTokenCache();
    const short = graphDeps([{ status: 429, headers: { 'retry-after': '2' } }, { status: 202 }]);
    assert.deepEqual(await sendMail(config, {}, short.deps), { ok: true, attempts: 2 });
    assert.deepEqual(short.waits, [2000]);
    resetTokenCache();
    const long = graphDeps([{ status: 429, headers: { 'retry-after': '30' } }]);
    assert.equal((await sendMail(config, {}, long.deps)).code, 'throttled');
  });

  test('temps esgotat: un sol reintent (resultat ambigu)', async () => {
    resetTokenCache();
    const g = graphDeps([timeout(), timeout(), { status: 202 }]);
    const result = await sendMail(config, {}, g.deps);
    assert.deepEqual(result, { ok: false, code: 'timeout', attempts: 2 });
    resetTokenCache();
    const recovered = graphDeps([timeout(), { status: 202 }]);
    assert.deepEqual(await sendMail(config, {}, recovered.deps), { ok: true, attempts: 2 });
  });

  test('credencial rebutjada: cap petició d\'enviament', async () => {
    resetTokenCache();
    const calls = [];
    const result = await sendMail(config, {}, { now: () => NOW, sleep: async () => {}, fetch: async (url) => (calls.push(String(url)), new Response('{}', { status: 401 })) });
    assert.deepEqual(result, { ok: false, code: 'auth_failed', attempts: 0 });
    assert.equal(calls.length, 1);
  });

  test('asserció de client amb certificat: RS256 verificable i amb l\'empremta', async () => {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
    const thumbprint = 'A1B2C3D4E5F60718293A4B5C6D7E8F9012345678';
    const jwt = await clientAssertion({ tenantId: 'tenant', clientId: 'client', certThumbprint: thumbprint, privateKeyPem: privateKey.export({ type: 'pkcs8', format: 'pem' }) }, NOW);
    const [header, claims, signature] = jwt.split('.');
    assert.ok(createVerify('RSA-SHA256').update(`${header}.${claims}`).verify(publicKey, Buffer.from(signature, 'base64url')));
    const decodedHeader = JSON.parse(Buffer.from(header, 'base64url'));
    assert.equal(decodedHeader.alg, 'RS256');
    assert.equal(Buffer.from(decodedHeader.x5t, 'base64url').toString('hex').toUpperCase(), thumbprint);
    const decoded = JSON.parse(Buffer.from(claims, 'base64url'));
    assert.equal(decoded.aud, 'https://login.microsoftonline.com/tenant/oauth2/v2.0/token');
    assert.equal(decoded.iss, 'client');
    assert.equal(decoded.exp - decoded.nbf, 600);
  });
});

describe('conservació de les dades temporals', () => {
  test('la neteja esborra les hores anteriors i les referències de més d\'una hora', async () => {
    const store = memoryStore();
    await store.set(`rl/${hourKey(NOW - 3_600_000)}/a`, { count: 1 });
    await store.set(`rl/${hourKey(NOW)}/b`, { count: 1 });
    await settle(store, 'live', 'live/production', 'OLD2345678', 'sent', NOW - 3_600_000);
    await settle(store, 'live', 'live/production', 'NEW2345678', 'sent', NOW - 60_000);
    assert.deepEqual(await sweep(store, NOW), { counters: 1, references: 1 });
    assert.deepEqual(store.keys().sort(), [`rl/${hourKey(NOW)}/b`, 'sub/live/production/NEW2345678']);
  });

  test('amb una neteja cada hora (minut 5): comptadors ≤ 1 h 5 min i referències < 2 h', async () => {
    const day = Date.UTC(2026, 9, 9);
    let longestCounter = 0;
    let longestReference = 0;
    // Minuts límit de cada hora (just abans i després de la neteja) i alguns d'intermedis.
    for (const minute of [0, 1, 4, 5, 6, 30, 58, 59, 60, 64, 65, 66, 119]) {
      const created = day + minute * 60_000 + 59_000;
      const store = memoryStore();
      await store.set(`rl/${hourKey(created)}/live/production/x`, { count: 1 });
      await settle(store, 'live', 'live/production', 'TTL2345678', 'sent', created);
      let counterGone;
      let referenceGone;
      for (let hour = 0; hour < 6 && (!counterGone || !referenceGone); hour += 1) {
        const run = day + hour * 3_600_000 + 5 * 60_000;
        if (run < created) continue;
        await sweep(store, run);
        if (!counterGone && !store.keys().some((key) => key.startsWith('rl/'))) counterGone = run;
        if (!referenceGone && !store.keys().some((key) => key.startsWith('sub/'))) referenceGone = run;
      }
      longestCounter = Math.max(longestCounter, counterGone - created);
      longestReference = Math.max(longestReference, referenceGone - created);
    }
    assert.ok(longestCounter <= 65 * 60_000, `comptador: ${longestCounter / 60_000} min`);
    assert.ok(longestReference < 120 * 60_000, `referència: ${longestReference / 60_000} min`);
  });
});
