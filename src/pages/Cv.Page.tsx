import styles from '../styles/cv/cvPage.module.css';
import { SideBar, Experience } from '../components/cv/index';
import usePageBackground from '../hooks/usePageBackground';
import { useCvScale } from '../hooks/cv/useCvScale';
import { Certifications } from '../components/cv/certifications.Component';
import { jobs } from '../data';
import { certifications, linkedin } from '../data';
import {
  programmingSkills,
  frontendSkills,
  backendAndDatabase,
  testingAndQA,
  devOpsAndCICD,
  cloudPlatforms,
  developmentTools,
  softSkills,
} from '../data';
import { contacts } from '../data';

export default function Cv() {
  usePageBackground('cv', 'linear-gradient(120deg,#071013,#0f2b2b)');
  const zoom = useCvScale();

  return (
    <div className={styles.scaleWrapper}>
      <div
        className={styles.cvPage}
        style={{ '--cv-zoom': zoom } as React.CSSProperties}
      >
        {/* Left Side */}
        <SideBar
          skills={[
            programmingSkills,
            frontendSkills,
            backendAndDatabase,
            testingAndQA,
            devOpsAndCICD,
            cloudPlatforms,
            developmentTools,
            softSkills,
          ]}
          contacts={contacts}
        />

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
    </div>
  );
}
