import React from 'react';
import styles from '../../styles/cv/sidebar.module.css';
import { useDownloadCV } from '../../hooks/home/useDownloadCV.ts';
import type { SkillSet, ContactItem } from '../../types/cv';

type Props = {
  skills: SkillSet[];
  contacts: ContactItem[];
};

export const SideBar = ({ skills, contacts }: Props) => {
  const { downloadCV, isDownloading } = useDownloadCV();

  return (
    <div className={styles.sideBar}>
      <div>
        <a
          href="https://github.com/ITSECT3R"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/profile-picture.jpg"
            alt="Profile"
            className={styles.profileImg}
          />
        </a>
      </div>
      <div>
        <h2 className={styles.h2Name}>Luis Angel Marin Rodriguez</h2>
      </div>

      <div className={styles.skills}>
        <h3>Skills</h3>
        {skills.map(skillSet => (
          <React.Fragment key={skillSet.category}>
            <p>{skillSet.category}</p>
            <ul>
              {skillSet.skills.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>

      <div className={styles.contacts}>
        <h3>Contact</h3>
        {contacts.map(contact => (
          <div key={contact.name} className={styles.contactDivs}>
            <a href={contact.link} target="_blank" rel="noopener noreferrer">
              {contact.svg}
              <p>{contact.name}</p>
            </a>
          </div>
        ))}
      </div>

      <button
        id="download-btn"
        className={styles.downloadCv}
        onClick={downloadCV}
        disabled={isDownloading}
      >
        {isDownloading ? 'Downloading...' : 'Download CV'}
      </button>
    </div>
  );
};
