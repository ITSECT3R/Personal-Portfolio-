import { Link } from "react-router-dom"
import { HomeIcon, ExperienceIcon, ProjectsIcon, SkillsIcon } from './icons'
import './NavBar.css'

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-button">
        <HomeIcon className="nav-icon" />
      </Link>
      <Link to="/experience" className="nav-button">
        <ExperienceIcon className="nav-icon" />
      </Link>
      <Link to="/projects" className="nav-button">
        <ProjectsIcon className="nav-icon" />
      </Link>
      <Link to="/skills" className="nav-button">
        <SkillsIcon className="nav-icon" />
      </Link>
    </nav>
  )
}