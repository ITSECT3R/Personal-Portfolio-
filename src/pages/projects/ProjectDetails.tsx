import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import usePageBackground from '../../hooks/usePageBackground';
import { TECH_ICON_MAP } from '../../components/common/icons/tech';
import { KIND_LABEL_MAP, CATEGORY_LABEL_MAP } from '../../utils/projectLabels';
import styles from '../../styles/projects/details.module.css';

export default function ProjectDetails() {
  usePageBackground('projects', 'linear-gradient(120deg,#1a1a2e,#2b2b55)');

  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(p => p.slug === projectId);
  const [imageIndex, setImageIndex] = useState(0);

  if (!project) {
    return (
      <div className={styles.notFound}>
        <p>Project not found.</p>
        <Link to="/projects" className={styles.back}>
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const hasImage = project.imageUrl.length > 0;
  const hasMultipleImages = project.imageUrl.length > 1;
  const kindClass = project.kind === 'demo' ? styles.demo : styles.project;
  const kindChipClass = project.kind === 'demo' ? styles.chipDemo : styles.chipProject;

  // Hero border follows the same convention as ProjectCard
  const heroBorderClass =
    project.kind === 'project'
      ? 'border-effect border-rainbow'
      : 'border-effect border-shimmer';

  const prevImage = () =>
    setImageIndex(i => (i === 0 ? project.imageUrl.length - 1 : i - 1));

  const nextImage = () =>
    setImageIndex(i => (i === project.imageUrl.length - 1 ? 0 : i + 1));

  return (
    <div className={`${styles.page} ${kindClass}`}>
      {/* ── Hero image carousel ────────────────────────────────────── */}
      <div
        className={`${styles.heroOuter} ${heroBorderClass}`}
      >
        <div className={styles.heroInner}>
          {hasImage ? (
            <img
              src={project.imageUrl[imageIndex]}
              alt={`${project.title} screenshot ${imageIndex + 1}`}
              className={styles.heroImage}
            />
          ) : (
            <div className={styles.heroPlaceholder} aria-hidden="true">
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
                  <button
                    key={url}
                    className={`${styles.dot} ${i === imageIndex ? styles.dotActive : ''}`}
                    onClick={() => setImageIndex(i)}
                    aria-label={`Screenshot ${i + 1}`}
                  />
                ))}
              </div>
              <span className={styles.counter}>
                {imageIndex + 1} / {project.imageUrl.length}
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── Content panel ──────────────────────────────────────────── */}
      <div className={`${styles.contentPanel} border-effect border-gradient border-slow`}>
        {/* Title + meta chips */}
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h1 className={`${styles.title} text-effect text-reveal-up is-animated`}>
              {project.title}
            </h1>
          </div>
          <div className={styles.meta}>
            <span className={`${styles.chip} ${kindChipClass}`}>
              {KIND_LABEL_MAP[project.kind]}
            </span>
            <span className={`${styles.chip} ${styles.chipCategory}`}>
              {CATEGORY_LABEL_MAP[project.category]}
            </span>
          </div>
        </div>

        {/* Full description */}
        <p className={styles.description}>{project.description}</p>

        {/* Language + Technology badges */}
        {(project.languages.length > 0 || project.technologies.length > 0) && (
          <div className={styles.badgeSections}>
            {project.languages.length > 0 && (
              <div className={styles.badgeSection}>
                <span className={styles.sectionLabel}>Languages</span>
                <div className={styles.badgeRow}>
                  {project.languages.map(lang => {
                    const Icon = TECH_ICON_MAP[lang];
                    return (
                      <span key={lang} className={styles.langBadge}>
                        {Icon && <Icon width={18} height={18} />}
                        {lang}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            {project.technologies.length > 0 && (
              <div className={styles.badgeSection}>
                <span className={styles.sectionLabel}>Technologies</span>
                <div className={styles.badgeRow}>
                  {project.technologies.map(tech => {
                    const Icon = TECH_ICON_MAP[tech];
                    return (
                      <span key={tech} className={styles.techBadge}>
                        {Icon && <Icon width={18} height={18} />}
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* External links + back navigation */}
        <div className={styles.linksRow}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link} ${styles.linkGithub}`}
            >
              GitHub →
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link} ${styles.linkLive}`}
            >
              Live Demo →
            </a>
          )}
          <Link to="/projects" className={`${styles.back} ${styles.backInRow}`}>
            ← Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

