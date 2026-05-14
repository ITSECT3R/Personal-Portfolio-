import styles from '../styles/cv.module.css';
import { SideBar, Experience } from '../components/cv/index';
import usePageBackground from '../hooks/usePageBackground';
import { Certifications } from '../components/cv/certifications.Component';
import { jobs } from '../data';
import { certifications, linkedin } from '../data';

export default function Cv() {
  usePageBackground('cv', 'linear-gradient(120deg,#071013,#0f2b2b)');

  return (
    <div className={styles.cvPage}>
      {/* Left Side */}
      <SideBar />

      {/* Right Side */}
      <div className={styles.divRight}>
        <div className={styles.summary}>
          <h2>Summary</h2>
          <p>
            Passionate Full-Stack Developer and QA Engineer with experience in
            building and testing web applications. Skilled in JavaScript,
            Python, React, Cloud solutions and automated testing frameworks.
            Adept at collaborating with cross-functional teams to deliver
            high-quality software solutions. Committed to continuous learning
            and staying updated with the latest industry trends to enhance
            development and testing processes. Eager to pursue excellence and
            continuous improvement.
          </p>
        </div>
        <Experience jobs={jobs} />
        <Certifications certifications={certifications} linkedin={linkedin} />
      </div>
    </div>
  );
}
