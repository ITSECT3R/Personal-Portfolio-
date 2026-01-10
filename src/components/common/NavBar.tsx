import { Link } from "react-router-dom"
import { Home, Briefcase, FolderGit2, Code } from "lucide-react"
import './NavBar.css'

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-button">
        <Home className="nav-icon" />
        <span>Home</span>
      </Link>
      <Link to="/experience" className="nav-button">
        <Briefcase className="nav-icon" />
        <span>Experience</span>
      </Link>
      <Link to="/projects" className="nav-button">
        <FolderGit2 className="nav-icon" />
        <span>Projects</span>
      </Link>
      <Link to="/skills" className="nav-button">
        <Code className="nav-icon" />
        <span>Skills</span>
      </Link>
    </nav>
  )
}