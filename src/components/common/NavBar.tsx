import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ExperienceIcon, ProjectsIcon, SkillsIcon } from './icons';
import { getActiveClass, ROUTES } from '../../utils/navigation';
import './NavBar.css';

export default function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar border-effect border-rainbow border-hover-only border-glow">
      <Link
        to={ROUTES.HOME}
        className={`nav-button nav-button-home ${getActiveClass(currentPath, ROUTES.HOME)}`}
      >
        <HomeIcon className="nav-icon" />
      </Link>
      <Link
        to={ROUTES.EXPERIENCE}
        className={`nav-button nav-button-experience ${getActiveClass(currentPath, ROUTES.EXPERIENCE)}`}
      >
        <ExperienceIcon className="nav-icon" />
      </Link>
      <Link
        to={ROUTES.PROJECTS}
        className={`nav-button nav-button-projects ${getActiveClass(currentPath, ROUTES.PROJECTS)}`}
      >
        <ProjectsIcon className="nav-icon" />
      </Link>
      <Link
        to={ROUTES.SKILLS}
        className={`nav-button nav-button-skills ${getActiveClass(currentPath, ROUTES.SKILLS)}`}
      >
        <SkillsIcon className="nav-icon" />
      </Link>
    </nav>
  );
}
