// Collections de contenu : chaque fiche projet est vérifiée par ce schéma au build.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { themes } from "./data/themes";

// Filtres autorisés, déduits de src/data/themes.ts : une faute de frappe provoque une erreur
const filtres = z.enum(themes);

const projets = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projets" }),
  // La fonction reçoit l'aide image() d'Astro, qui vérifie que le fichier existe
  schema: ({ image }) =>
    z.object({
      nom: z.string(), // nom court, par exemple « Kasa »
      titre: z.string(), // titre accrocheur de la fiche
      accroche: z.string(), // une phrase de présentation
      projet: z.number().int(), // numéro du projet dans la formation
      ordre: z.number().int(), // ordre d'affichage
      complement: z.boolean().default(false), // projet présenté en complément
      filtres: z.array(filtres).min(1),
      depot: z.string().url().optional(), // dépôt GitHub
      site: z.string().url().optional(), // site en ligne
      estCeSite: z.boolean().default(false), // la fiche décrit ce site : lien « Voir le site » interne
      kanban: z.string().url().optional(), // tableau de suivi public (Notion)
      image: image(), // capture principale (16/10)
      imageAlt: z.string(), // texte alternatif de la capture en en-tête de fiche
    }),
});

export const collections = { projets };