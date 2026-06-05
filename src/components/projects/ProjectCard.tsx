import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types/project';
import { TECH_ICON_MAP } from '../common/icons/tech';
import styles from '../../styles/projects/card.module.css';

// Threshold: at or below this number, badges sit static. Above it they marquee.
// Icons are ~4× narrower than text pills so the threshold is raised accordingly.
const MARQUEE_THRESHOLD = 8;

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const hasMultipleImages = project.imageUrl.length > 1;
  const hasImage = project.imageUrl.length > 0;
  const allBadges = [...project.languages, ...project.technologies];
  const shouldMarquee = allBadges.length > MARQUEE_THRESHOLD;
  const kindClass = project.kind === 'demo' ? styles.demo : styles.project;

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex(i => (i === 0 ? project.imageUrl.length - 1 : i - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex(i => (i === project.imageUrl.length - 1 ? 0 : i + 1));
  };

  const toggleOverlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOverlayOpen(open => !open);
  };

  const borderClass =
    project.kind === 'project'
      ? 'border-effect border-rainbow border-hover-only'
      : 'border-effect border-dual-spin border-hover-only';

  return (
    <article
      className={`${styles.card} ${kindClass} ${overlayOpen ? styles.overlayOpen : ''} ${borderClass}`}
    >
      <div className={styles.cardInner}>
      {/* ── Image section ──────────────────────────────────────────── */}
      <div className={styles.imageSection}>
        {hasImage ? (
          <img
            src={project.imageUrl[imageIndex]}
            alt={`${project.title} screenshot ${imageIndex + 1}`}
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            {project.title[0]}
          </div>
        )}

        {hasMultipleImages && (
          <>
            <button
              className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`}
              onClick={prevImage}
              aria-label="Previous screenshot"
            >
              ‹
            </button>
            <button
              className={`${styles.carouselBtn} ${styles.carouselBtnNext}`}
              onClick={nextImage}
              aria-label="Next screenshot"
            >
              ›
            </button>
            <div className={styles.dots} aria-hidden="true">
              {project.imageUrl.map((url, i) => (
                <span
                  key={url}
                  className={`${styles.dot} ${i === imageIndex ? styles.dotActive : ''}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <div className={styles.footer}>
        <h3 className={styles.title}>{project.title}</h3>

        <div className={styles.techWrapper}>
          <div
            className={`${styles.techTrack} ${shouldMarquee ? styles.techAnimate : ''}`}
          >
            {/* Languages first — blue-tinted badges */}
            {project.languages.map(lang => {
              const IconComponent = TECH_ICON_MAP[lang];
              return IconComponent ? (
                <span key={lang} className={styles.langBadge} title={lang} aria-label={lang}>
                  <IconComponent width={20} height={20} />
                </span>
              ) : (
                <span key={lang} className={`${styles.langBadge} ${styles.langBadgeFallback}`}>
                  {lang}
                </span>
              );
            })}
            {/* Technologies after — neutral badges */}
            {project.technologies.map(tech => {
              const IconComponent = TECH_ICON_MAP[tech];
              return IconComponent ? (
                <span key={tech} className={styles.techBadge} title={tech} aria-label={tech}>
                  <IconComponent width={20} height={20} />
                </span>
              ) : (
                <span key={tech} className={`${styles.techBadge} ${styles.techBadgeFallback}`}>
                  {tech}
                </span>
              );
            })}
            {/* Duplicate the full combined set for seamless marquee loop */}
            {shouldMarquee && (
              <>
                {project.languages.map(lang => {
                  const IconComponent = TECH_ICON_MAP[lang];
                  return IconComponent ? (
                    <span key={`${lang}-dup`} className={styles.langBadge} aria-hidden="true">
                      <IconComponent width={20} height={20} />
                    </span>
                  ) : (
                    <span
                      key={`${lang}-dup`}
                      className={`${styles.langBadge} ${styles.langBadgeFallback}`}
                      aria-hidden="true"
                    >
                      {lang}
                    </span>
                  );
                })}
                {project.technologies.map(tech => {
                  const IconComponent = TECH_ICON_MAP[tech];
                  return IconComponent ? (
                    <span key={`${tech}-dup`} className={styles.techBadge} aria-hidden="true">
                      <IconComponent width={20} height={20} />
                    </span>
                  ) : (
                    <span
                      key={`${tech}-dup`}
                      className={`${styles.techBadge} ${styles.techBadgeFallback}`}
                      aria-hidden="true"
                    >
                      {tech}
                    </span>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Info toggle — always visible, drives mobile overlay */}
        <button
          className={styles.infoToggle}
          onClick={toggleOverlay}
          aria-label={overlayOpen ? 'Hide project details' : 'Show project details'}
          aria-expanded={overlayOpen}
        >
          <span
            className={`${styles.infoArrow} ${overlayOpen ? styles.infoArrowOpen : ''}`}
          >
            ↑
          </span>
        </button>
      </div>

      {/* ── Overlay ─────────────────────────────────────────────────── */}
      <div className={styles.overlay} aria-hidden={!overlayOpen}>
        <p className={styles.summary}>{project.summary}</p>
        <div className={styles.overlayLinks}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
          )}
          <Link to={`/projects/${project.slug}`} className={`${styles.link} ${styles.linkDetails}`}>
            Details →
          </Link>
        </div>
      </div>
      </div> {/* cardInner */}
    </article>
  );
}
