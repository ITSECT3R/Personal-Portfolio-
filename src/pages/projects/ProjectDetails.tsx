import { useParams, Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import usePageBackground from '../../hooks/usePageBackground';

export default function ProjectDetails() {
  usePageBackground('projects', 'linear-gradient(120deg,#1a1a2e,#2b2b55)');
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(p => p.slug === projectId);

  if (!project) {
    return (
      <div style={{ padding: '2rem', color: '#fff' }}>
        <p>Project not found.</p>
        <Link to="/projects" style={{ color: '#4fc3f7' }}>
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
      <Link
        to="/projects"
        style={{ color: '#4fc3f7', textDecoration: 'none', fontSize: '0.85rem' }}
      >
        ← Back to Projects
      </Link>
      <h1 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>{project.title}</h1>
      <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{project.description}</p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#4fc3f7' }}
          >
            Live Demo →
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#4fc3f7' }}
          >
            GitHub →
          </a>
        )}
      </div>
    </div>
  );
}

