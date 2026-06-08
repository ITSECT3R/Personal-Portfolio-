import usePageBackground from '../hooks/usePageBackground';
import { useProjectFilters } from '../hooks/projects/useProjectFilters';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectFilter } from '../components/projects/ProjectFilter';
import styles from '../styles/projects.module.css';

export default function ProjectsPage() {
  usePageBackground('projects', 'linear-gradient(120deg,#1a1a2e,#2b2b55)');

  const {
    filter,
    setFilter,
    filtered,
    allKinds,
    allCategories,
    allLanguages,
    allTechnologies,
  } = useProjectFilters();

  return (
    <div className={styles.page}>
      <h1 className={`${styles.heading} text-effect text-glitch is-animated`}>
        Projects
      </h1>
      <ProjectFilter
        kinds={allKinds}
        categories={allCategories}
        languages={allLanguages}
        technologies={allTechnologies}
        filter={filter}
        onChange={setFilter}
      />
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
