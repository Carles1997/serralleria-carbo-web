import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defaultLocale, locales } from './i18n/config';

// El contingut editorial viu a content/{idioma}/, fora de src/, com fixa el CONTEXT.
// Els esquemes descriuen el frontmatter existent; no afegeixen camps ni dades noves.

const otherLocales = locales.filter((locale) => locale !== defaultLocale);
const status = z.enum(['draft', 'draft-review', 'blocked-client', 'approved']);
const reviewNeeded = z.array(z.string()).optional();

const pages = defineCollection({
  loader: glob({ base: './content', pattern: ['*/*.md'] }),
  schema: z
    .object({
      // YAML llegeix «pageId: 404» com a número.
      pageId: z.coerce.string(),
      route: z.string().startsWith('/').optional(),
      lang: z.enum(locales),
      status,
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      noindex: z.boolean().optional(),
      publishReady: z.boolean().optional(),
      requiredSource: z.string().optional(),
      // Data de la darrera revisió d'un text legal (es mostra a la pàgina si hi és).
      updated: z.coerce.date().optional(),
      // Informació de privacitat del formulari (legal-formulari.md): casella de consentiment, només
      // si l'assessor la demana, i el seu text (admet enllaços en format Markdown). Casella voluntària
      // de comunicacions comercials i la nota per revocar-les (text de l'advocat, 06/10/2026).
      consent: z.boolean().optional(),
      consentLabel: z.string().optional(),
      marketingLabel: z.string().optional(),
      marketingNote: z.string().optional(),
      usage: z.string().optional(),
      reviewNeeded,
      // Al frontmatter és una llista separada per comes.
      projectIds: z
        .string()
        .transform((value) => value.split(',').map((id) => id.trim()).filter(Boolean))
        .optional(),
    })
    .refine((page) => !page.route || page.publishReady === false || (page.seoTitle && page.seoDescription), {
      message: 'Una ruta publicable necessita seoTitle i seoDescription.',
    })
    // URL per idioma (decisió del director, 28/09/2026): català sense prefix; castellà i anglès amb
    // prefix i slugs traduïts. Els slugs proposats, pendents de validar: fases/fase-5/FASE5-idiomes.md.
    .refine(
      (page) =>
        !page.route ||
        (page.lang === defaultLocale
          ? !otherLocales.some((locale) => page.route?.startsWith(`/${locale}/`))
          : page.route.startsWith(`/${page.lang}/`)),
      { message: `La ruta ha de començar pel prefix del seu idioma (/es/, /en/); el català (${defaultLocale}) no en porta.` },
    )
    .refine((page) => !page.consent || Boolean(page.consentLabel?.trim()), {
      message: 'Una casella de consentiment (consent: true) necessita el seu text a consentLabel.',
    })
    .refine((page) => !page.marketingLabel || Boolean(page.marketingNote?.trim()), {
      message: 'La casella de comunicacions comercials necessita la nota per revocar el consentiment (marketingNote).',
    })
    // approved = publicable; la indexació depèn a més de noindex (fases/fase-5/FASE5-indexacio.md).
    .refine((page) => page.status !== 'approved' || (page.publishReady !== false && !page.reviewNeeded?.length), {
      message: 'Una pàgina approved no pot tenir publishReady: false ni reviewNeeded pendents.',
    }),
});

const projects = defineCollection({
  loader: glob({ base: './content', pattern: ['*/projects/*.md'] }),
  schema: z.object({
    projectId: z.string(),
    branch: z.enum(['particulars', 'industrial']),
    category: z.enum(['estructures', 'automatismes', 'series-curtes']),
    year: z.number().int(),
    sourceWorkbookRow: z.number().int(),
    status,
    title: z.string(),
    reviewNeeded,
  }),
});

export const collections = { pages, projects };
