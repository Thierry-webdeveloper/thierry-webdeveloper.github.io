// Galerie des projets, avec un filtre par thème (îlot React chargé avec client:visible).
import { useEffect, useState } from "react";
import styles from "./ProjectGallery.module.scss";
import ThemeIcon from "./ThemeIcon.jsx";

const TOUS = "Tous";
const FILTER_STORAGE_KEY  = "filtre-projets"; // clé du filtre mémorisé pendant la visite

export default function ProjectGallery({ projets }) {
  // Seul état du composant : le thème choisi
  const [actif, setActif] = useState(TOUS);

  // Les thèmes réellement utilisés, sans doublon, dans l'ordre d'apparition
  const themes = [...new Set(projets.flatMap((projet) => projet.filtres))];

  // Après l'affichage : reprend le filtre choisi plus tôt dans cet onglet
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(FILTER_STORAGE_KEY);
      if (stored && themes.includes(stored)) setActif(stored);
    } catch {
      // sessionStorage indisponible : on reste sur « Tous »
    }
  }, []); // une seule fois, au chargement (les projets ne changent pas)

  // Choix d'un filtre : mise à jour de l'état et mémorisation
  const selectFilter = (theme) => {
    setActif(theme);
    try {
      sessionStorage.setItem(FILTER_STORAGE_KEY, theme);
    } catch {
      // sessionStorage indisponible : le choix vaut pour cette page seulement
    }
  };

  // Le numéro est fixé sur la liste complète : il ne change pas quand on filtre
  const numerotes = projets.map((projet, index) => ({ ...projet, numero: index + 1 }));

  const visibles =
    actif === TOUS
      ? numerotes
      : numerotes.filter((projet) => projet.filtres.includes(actif));

  // Phrase complète en une seule chaîne : un seul nœud de texte,
  // lu d'un trait par les lecteurs d'écran
  const pluriel = visibles.length > 1 ? "s" : "";
  const resultat = `${visibles.length} projet${pluriel} affiché${pluriel}`;

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filtrer les projets par thème">
        {[TOUS, ...themes].map((theme) => (
          <button
            key={theme}
            type="button"
            className={styles.filter}
            aria-pressed={actif === theme}
            onClick={() => selectFilter(theme)}
          >
            <ThemeIcon theme={theme} />
            {theme}
          </button>
        ))}
      </div>

      {/* Annonce le résultat aux lecteurs d'écran après chaque clic */}
      <p className={styles.status} aria-live="polite">
        {resultat}
      </p>

      <ol className={styles.list} role="list">
        {visibles.map((projet) => (
          <li key={projet.id} className={styles.card}>
            <div className={styles.body}>
              <p className={styles.meta}>
                Projet {projet.projet}
                {projet.complement && (
                  <span className={styles.complement}> (présenté en complément)</span>
                )}
              </p>
              <h3 className={styles.title}>{projet.titre}</h3>
              <p className={styles.accroche}>{projet.accroche}</p>

              <ul className={styles.tags} role="list">
                {projet.filtres.map((filtre) => (
                  <li key={filtre}>
                    <ThemeIcon theme={filtre} />
                    {filtre}
                  </li>
                ))}
              </ul>

              <div className={styles.actions}>
                <a className={styles.primary} href={`/projets/${projet.id}/`}>
                  Détails du projet
                  <span className="visually-hidden"> {projet.nom}</span>
                </a>
                {/* Pas de « Voir le site » sur la carte de ce site : on y est déjà ! */}
                {projet.site && !projet.estCeSite && (
                  <a
                    className={styles.secondary}
                    href={projet.site}
                    target="_blank"
                    rel="noopener"
                  >
                    Voir le site
                    <span className="visually-hidden"> {projet.nom} (nouvel onglet)</span>
                  </a>
                )}
              </div>
            </div>

            {/* Capture décorative : le titre de la carte nomme déjà le projet */}
            <div className={styles.media}>
              <img
                src={projet.image.src}
                srcSet={projet.image.srcset}
                sizes={projet.image.sizes}
                width={projet.image.width}
                height={projet.image.height}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span className={styles.number} aria-hidden="true">
                {String(projet.numero).padStart(2, "0")}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}