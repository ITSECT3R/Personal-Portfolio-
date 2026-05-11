import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home.Page'));
const Cv = lazy(() => import('./pages/Cv.Page'));
const Experience = lazy(() => import('./pages/Experience.Page'));
const Skills = lazy(() => import('./pages/Skills.Page'));
const Projects = lazy(() => import('./pages/Projects.Page'));
const ProjectDetails = lazy(() => import('./pages/projects/ProjectDetails'));

// Loading fallback

const Loading = () => <div>Loading...</div>;

export function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<Cv />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/skills" element={<Skills />} />

        {/* Projects with nested routes */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
      </Routes>
    </Suspense>
  );
}
