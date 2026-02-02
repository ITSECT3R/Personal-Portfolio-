import React from 'react';
import {
  programmingSkills,
  frontendSkills,
  backendAndDatabase,
  testingAndQA,
  devOpsAndCICD,
  cloudPlatforms,
  developmentTools,
  softSkills,
} from '../../data/skills.ts';
import { contacts } from '../../data/contacts.tsx';
import { useDownloadCV } from '../../hooks/home/useDownloadCV';

export const SideBar = () => {
  const { downloadCV, isDownloading } = useDownloadCV();
  const skills = [
    programmingSkills,
    frontendSkills,
    backendAndDatabase,
    testingAndQA,
    devOpsAndCICD,
    cloudPlatforms,
    developmentTools,
    softSkills,
  ];

  return (
    <div className="side-bar">
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

      <div className="contacts">
        <h3>Contact</h3>
        {contacts.map(contact => (
          <div key={contact.name} className="contact-divs">
            <a href={contact.link} target="_blank" rel="noopener noreferrer">
              {contact.svg}
              <p>{contact.name}</p>
            </a>
          </div>
        ))}
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
  );
};
