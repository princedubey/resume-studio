import Link from "next/link";
import { TEMPLATE_CATALOG } from "@/templates/registry";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.brand}>Resume Studio</p>
        <h1 className={styles.title}>Pick a template. Edit. Print.</h1>
        <p className={styles.lead}>
          Local-first resume editor with A4 print preview. Drafts autosave in your browser, with
          the last 10 versions ready to restore.
        </p>
      </header>

      <section className={styles.grid} aria-label="Templates">
        {TEMPLATE_CATALOG.map((template) => {
          const ready = template.status === "ready";
          return (
            <article
              key={template.id}
              className={`${styles.card} ${ready ? "" : styles.soon}`}
            >
              <div
                className={styles.swatch}
                style={{ background: template.previewAccent }}
                aria-hidden
              />
              <div className={styles.cardTop}>
                <h2>{template.name}</h2>
                <span className={styles.badge}>{ready ? "Ready" : "Coming soon"}</span>
              </div>
              <p>{template.description}</p>
              {ready ? (
                <Link className={styles.cta} href={`/editor/${template.id}`}>
                  Open editor
                </Link>
              ) : (
                <span className={styles.disabled}>Not available yet</span>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
