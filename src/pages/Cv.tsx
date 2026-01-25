import '../styles/cv.css';
import { useDownloadCV } from '../hooks/useDownloadCV';

export default function Cv() {
  const { downloadCV, isDownloading } = useDownloadCV();

  return (
    <div className="cv-page">
      {/* Left Side */}
      <div className="div-left">
        <h2 className="h2-name">Luis Marin</h2>
        <img src="/profile.jpg" alt="Profile" className="profile-img" />

        <div className="skills">
          <h3>Skills</h3>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>Node.js</li>
          </ul>
        </div>

        <div className="contacts">
          <h3>Contact</h3>
          <div className="contact-divs">
            <p>📧 email@example.com</p>
          </div>
          <div className="contact-divs">
            <p>📱 +1234567890</p>
          </div>
        </div>

        <button
          id="download-btn"
          className="download-cv"
          onClick={downloadCV}
          disabled={isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download CV'}
        </button>
      </div>

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
