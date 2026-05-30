import { useMemo, useState } from 'react';
import usePageBackground from '../hooks/usePageBackground';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectFilter } from '../components/projects/ProjectFilter';
import type { FilterState } from '../components/projects/ProjectFilter';
import styles from '../styles/projects.module.css';

const DEFAULT_FILTER: FilterState = {
  kind: 'all',
  category: 'all',
  language: 'all',
};

export default function ProjectsPage() {
  usePageBackground('projects', 'linear-gradient(120deg,#1a1a2e,#2b2b55)');

  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  const allLanguages = useMemo(
    () => [...new Set(projects.flatMap(p => p.languages))].sort(),
    []
  );

  const filtered = useMemo(
    () =>
      projects.filter(p => {
        if (filter.kind !== 'all' && p.kind !== filter.kind) return false;
        if (filter.category !== 'all' && p.category !== filter.category) return false;
        if (filter.language !== 'all' && !p.languages.includes(filter.language)) return false;
        return true;
      }),
    [filter]
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Projects</h1>
      <ProjectFilter languages={allLanguages} filter={filter} onChange={setFilter} />
      {filtered.length === 0 ? (
        <p className={styles.empty}>No projects match the current filters.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

