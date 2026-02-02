import '../styles/cv.css';
import { SideBar } from '../components/cv/sideBar';

export default function Cv() {
  return (
    <div className="cv-page">
      {/* Left Side */}
      <SideBar />

      {/* Right Side */}
      <div className="div-right">
        <div className="summary">
          <h2>Professional Summary</h2>
          <p>
            Full-stack developer with experience in modern web technologies...
          </p>
        </div>

        <div className="work-experience">
          <div className="section2-header">
            <h3>Work Experience</h3>
          </div>
          {/* Work experience content will go here */}
        </div>

        <div className="education">
          <h3>Education</h3>
          {/* Education content will go here */}
        </div>
      </div>
    </div>
  );
}
