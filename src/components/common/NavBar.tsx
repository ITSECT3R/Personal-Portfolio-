import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/experience">Experience</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/skills">Skills</Link>
    </nav>
  )
}