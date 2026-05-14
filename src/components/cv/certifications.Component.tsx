import React from "react";
import { certifications } from "../../data";
import styles from "../../styles/cv.module.css";
import { Link } from "react-router-dom";

export const Certifications = () => {
  return (
        <div className={styles.education}>
          <div>
            <h2>Education / Certifications</h2>
            <h3>High School Diploma</h3>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.google.com.mx/maps/place/UNE+Tonal%C3%A1/@20.6307716,-103.244323,17.79z/data=!4m6!3m5!1s0x8428b460bebd5689:0x68278f71b14b2dc!8m2!3d20.6318207!4d-103.2446157!16s%2Fg%2F11d_y58xxn?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D"
              className={styles.highSchool}
            >
              UNE UNIVERSITY - 45400, Av. Tonaltecas 333, El Zapote, Tonalá,
              Jal.{' '}
            </a>
          </div>
          <div>
            <div className={styles.certifications}>
            {certifications.map((certification) => (
              <React.Fragment key="Certification">
                <h3>Certifications</h3>
                {certification.svg}
                <h4>{certification.issuer}</h4>
                <div>
                  {certification.certificates.map((cert) => (
                    <React.Fragment key={cert.name}>
                    <ul
                      key={cert.name}
                      className={`${styles.ulSkills} ${styles.ulSkills1}`}
                    >
                      <li>
                        <a href={cert.link} target="_blank" rel="noreferrer">
                          {cert.name}
                        </a>
                      </li>
                    </ul>
                    
                    </React.Fragment>
                  ))} 
                </div>
              </React.Fragment>
            ))}
            <Link to="https://www.linkedin.com/in/luis-angel-m-084449165/details/certifications/" target="_blank" rel="noreferrer" className={`${styles.highSchool} ${styles.linkAllCertifications}`}>
                      Click here to view all my certifications on LinkedIn :D
            </Link>
            </div>
          </div>
        </div>
  );
};

