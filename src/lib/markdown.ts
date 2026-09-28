// Lectura estructurada del Markdown editorial per a plantilles compostes.
// Els textos no es copien al codi: la plantilla els pren de content/{idioma}/ i
// només accepta la sintaxi que hi ha realment (títols H1–H3, paràgrafs, llistes,
// negreta i enllaços). Qualsevol altra cosa atura el build perquè no es perdi text.

export type Inline =
  | { type: 'text'; value: string }
  | { type: 'strong'; value: string }
  | { type: 'link'; value: string; href: string };

export type Block = { type: 'paragraph'; inlines: Inline[] } | { type: 'list'; items: Inline[][] };

export interface Section {
  heading: string;
  blocks: Block[];
  /** Apartats H3 dins la secció H2, en ordre. */
  subsections: Section[];
}

export interface MarkdownDocument {
  title: string;
  intro: Block[];
  sections: Section[];
}

export interface Link {
  label: string;
  href: string;
}

const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseInlines(source: string): Inline[] {
  const inlines: Inline[] = [];
  let cursor = 0;
  for (const match of source.matchAll(INLINE)) {
    if (match.index > cursor) inlines.push({ type: 'text', value: source.slice(cursor, match.index) });
    if (match[1] !== undefined) inlines.push({ type: 'strong', value: match[1] });
    else inlines.push({ type: 'link', value: match[2], href: match[3] });
    cursor = match.index + match[0].length;
  }
  if (cursor < source.length) inlines.push({ type: 'text', value: source.slice(cursor) });
  return inlines;
}

function parseBlock(lines: string[]): Block {
  if (lines.every((line) => line.startsWith('- '))) {
    return { type: 'list', items: lines.map((line) => parseInlines(line.slice(2).trim())) };
  }
  if (lines.some((line) => /^(#{4,}|>|\d+\.|\||```|<)/.test(line))) {
    throw new Error(`Sintaxi Markdown no admesa per la plantilla: «${lines[0]}»`);
  }
  return { type: 'paragraph', inlines: parseInlines(lines.join(' ')) };
}

export function parseMarkdown(body: string): MarkdownDocument {
  const lines = body.replace(/<!--[\s\S]*?-->/g, '').replace(/\r\n/g, '\n').split('\n');
  let title = '';
  const intro: Block[] = [];
  const sections: Section[] = [];
  let buffer: string[] = [];

  const flush = () => {
    if (!buffer.length) return;
    const section = sections.at(-1);
    (section?.subsections.at(-1)?.blocks ?? section?.blocks ?? intro).push(parseBlock(buffer));
    buffer = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) flush();
    else if (line.startsWith('# ')) {
      flush();
      if (title) throw new Error('El document té més d’una H1.');
      title = line.slice(2).trim();
    } else if (line.startsWith('## ')) {
      flush();
      sections.push({ heading: line.slice(3).trim(), blocks: [], subsections: [] });
    } else if (line.startsWith('### ')) {
      flush();
      const section = sections.at(-1);
      if (!section) throw new Error(`H3 sense secció H2: «${line}»`);
      section.subsections.push({ heading: line.slice(4).trim(), blocks: [], subsections: [] });
    } else buffer.push(line);
  }
  flush();

  if (!title) throw new Error('El document no té H1.');
  return { title, intro, sections };
}

export const plainText = (inlines: Inline[]) => inlines.map((inline) => inline.value).join('');

/** Paràgraf format només per enllaços i separadors («·»). */
const isLinkRow = (block: Block) =>
  block.type === 'paragraph' &&
  block.inlines.some((inline) => inline.type === 'link') &&
  block.inlines.every((inline) => inline.type === 'link' || /^[\s·]*$/.test(inline.value));

export const paragraphs = (blocks: Block[]) =>
  blocks.filter((block) => block.type === 'paragraph' && !isLinkRow(block)).map((block) => (block as { inlines: Inline[] }).inlines);

export const links = (blocks: Block[]): Link[] =>
  blocks
    .filter(isLinkRow)
    .flatMap((block) => (block as { inlines: Inline[] }).inlines)
    .flatMap((inline) => (inline.type === 'link' ? [{ label: inline.value, href: inline.href }] : []));

export const listItems = (blocks: Block[]) => blocks.flatMap((block) => (block.type === 'list' ? block.items : []));

/** Retorna l'únic element o atura el build amb un missatge clar. */
export function one<T>(items: T[], what: string): T {
  if (items.length !== 1) throw new Error(`S'esperava ${what}; se n'han trobat ${items.length}.`);
  return items[0];
}
