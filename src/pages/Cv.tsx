import '../styles/cv.css';
import { useDownloadCV } from '../hooks/useDownloadCV';

export default function Cv() {
  const { downloadCV, isDownloading } = useDownloadCV();

  return (
    <div className="cv-page">
      {/* Left Side */}
      <div className="div-left">
        <div>
          <a
            href="https://github.com/ITSECT3R"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/profile-picture.jpg"
              alt="Profile"
              className="profile-img"
            />
          </a>
        </div>
        <div>
          <h2 className="h2-name">Luis Angel Marin Rodriguez</h2>
        </div>

        <div className="skills">
          <h3>Skills</h3>
          <p>Programming Languages</p>
          <ul>
            <li>JavaScript</li>
            <li>Node.js</li>
            <li>TypeScript</li>
            <li>Python</li>
          </ul>
          <p>Front-End Frameworks & Libraries</p>
          <ul>
            <li>React</li>
            <li>React Native</li>
            <li>Redux</li>
            <li>Bootstrap</li>
            <li>Sass</li>
            <li>jQuery</li>
          </ul>
          <p>Back-End & Databases</p>
          <ul>
            <li>PostgreSQL</li>
            <li>MongoDB</li>
            <li>DynamoDB</li>
            <li>Express.js</li>
            <li>Next.js</li>
            <li>Axios</li>
          </ul>
          <p>Testing & QA</p>
          <ul>
            <li>WebDriver IO</li>
            <li>Playwright</li>
            <li>Jest</li>
            <li>Mocha</li>
            <li>Chai</li>
            <li>Prettier</li>
            <li>Eslint</li>
            <li>SDLC / STLC</li>
          </ul>
          <p>DevOps & CI/CD</p>
          <ul>
            <li>Jenkins</li>
            <li>GitHub Actions</li>
            <li>CI/CD Pipelines</li>
            <li>Docker</li>
            <li>Kubernetes</li>
            <li>Postman</li>
            <li>N8N</li>
          </ul>
          <p>Cloud Platforms</p>
          <ul>
            <li>AWS</li>
            <li>Azure</li>
            <li>CloudFlare</li>
            <li>Vercel</li>
          </ul>
          <p>Development Tools</p>
          <ul>
            <li>Git</li>
            <li>GitHub / GitLab</li>
            <li>Visual Studio Code</li>
            <li>GitHub Copilot</li>
            <li>Vite</li>
          </ul>
          <p>Soft Skills</p>
          <ul>
            <li>English C2</li>
            <li>Spanish Native</li>
            <li>Customer Relation</li>
            <li>Analytical</li>
            <li>Team Player</li>
            <li>Creative</li>
            <li>Excellent Communication</li>
            <li>Negotiation</li>
            <li>Working Hard</li>
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
