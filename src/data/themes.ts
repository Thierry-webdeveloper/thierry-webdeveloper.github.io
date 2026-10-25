// Icônes partagées : section Compétences, galerie des projets et pages projets.
import { siAstro, siReact, siSass } from "simple-icons";

// Icônes au trait (modèle Feather Icons) pour les compétences sans logo de marque
export const traits = {
  accessibilite:
    '<circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/>',
  seo: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  responsive:
    '<rect x="2" y="4" width="14" height="10" rx="1"/><path d="M6 18h6"/><path d="M9 14v4"/><rect x="17" y="9" width="5" height="11" rx="1"/>',
  performance: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  tests:
    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  kanban:
    '<rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="3" height="9"/><rect x="14" y="7" width="3" height="5"/>',
};

// Une icône par thème de filtre : logo de marque (tracé plein) ou icône au trait.
// Source unique : ajouter un filtre = ajouter une ligne ici (le schéma en dépend).
export type IconeTheme = { marque?: string; trait?: string };

export const iconesThemes = {
  React: { marque: siReact.path },
  Astro: { marque: siAstro.path },
  Sass: { marque: siSass.path },
  SEO: { trait: traits.seo },
  Performance: { trait: traits.performance },
  Accessibilité: { trait: traits.accessibilite },
  Tests: { trait: traits.tests },
  Agile: { trait: traits.kanban },
} satisfies Record<string, IconeTheme>;

// Noms des thèmes, déduits des clés : utilisés par le schéma des fiches
export type Theme = keyof typeof iconesThemes;
export const themes = Object.keys(iconesThemes) as [Theme, ...Theme[]];