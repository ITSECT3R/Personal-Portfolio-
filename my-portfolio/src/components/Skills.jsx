import React from 'react';
import {
  programmingLanguages,
  frontendTechnologies,
  otherTools,
  otherPrograms,
  svgs
} from '../data/data-js/svgs-data';

const certifications = [
    {
    name: 'Epam Systems',
    svg: svgs.epam,
    links: [
      { label: 'Automated Testing JavaScript Advanced', url: 'https://certificates.epam.com/certificates/11e97e15-d94e-4a88-afd8-27034d473d4d'},
      { label: 'Automated Testing JavaScript', url: 'https://certificates.epam.com/certificates/d87bdff8-001e-42ab-9bf6-e9b620b22841' }
    ]
  },
  {
    name: 'FreeCodeCamp',
    svg: svgs.freeCodeCamp,
    links: [
      { label: 'Responsive Web Design', url: 'https://freecodecamp.org/certification/ITSECT3R/responsive-web-design' },
      { label: 'JavaScript Algorithms and Data Structures', url: 'https://www.freecodecamp.org/certification/ITSECT3R/javascript-algorithms-and-data-structures-v8' },
      { label: 'Front End Development Libraries', url: 'https://www.freecodecamp.org/certification/ITSECT3R/front-end-development-libraries' },
      { label: 'Data Visualization', url: 'https://www.freecodecamp.org/certification/ITSECT3R/data-visualization' },
      
    ]
  },
  {
    name: 'Solo Learn',
    svg: svgs.soloLearn,
    links: [
      { label: 'HTML', url: 'https://www.sololearn.com/certificates/CC-GFJ0MCHG' },
      { label: 'CSS', url: 'https://www.sololearn.com/certificates/CC-AGLNFARH' },
      { label: 'JavaScript intro', url: 'https://www.sololearn.com/certificates/CC-OBNR8OMY' },
      { label: 'JavaScript advanced', url: 'https://www.sololearn.com/certificates/CC-SDBDGIBL' },
      { label: 'Python intro', url: 'https://www.sololearn.com/certificates/CC-LPM05QGQ' },
    ]
  }
];

const languages = [
  'English 100%',
  'Spanish 100%',
  'French 10%'
];

const otherSkills = [
  'Hardware Technician',
  'Analytical',
  'Team Player',
  'Good working under pressure',
  'Negotiation',
  'Customer Relation Management',
  'Excellent Communication',
  'Willing to become one of the Best'
];

const Skills = () => (
  <section id="skills" className="sections">
    <div className="main-body">
      <div className="section4-header">
        <h2>Skills</h2>
      </div>
      <div className="wrapper_skills">
        <div className="wrapper_skills_Programing">
          <h3 className="section4-sub-title">Programing Languages</h3>
          <div className="skills-svg-list" id='programming-languages'>
            {Object.values(programmingLanguages).map((svg, i) => (
              <span key={i} dangerouslySetInnerHTML={{ __html: svg }} />
            ))}
          </div>
          <h3 className="section4-sub-title">Front End Technologies</h3>
          <div className="skills-svg-list" id='front-end'>
            {Object.values(frontendTechnologies).map((svg, i) => (
              <span key={i} dangerouslySetInnerHTML={{ __html: svg }} />
            ))}
          </div>
          <h3 className="section4-sub-title">Other Tools</h3>
          <div className="skills-svg-list" id='other-tools'>
            {Object.values(otherTools).map((svg, i) => (
              <span key={i} dangerouslySetInnerHTML={{ __html: svg }} />
            ))}
          </div>
          <h3 className="section4-sub-title">Certifications</h3>
          <div className="Certifications">
            {certifications.map((cert, i) => (
              <div key={i} className="cert-block">
                <span dangerouslySetInnerHTML={{ __html: cert.svg }} />
                <h4>{cert.name}</h4>
                <ul className="ul-skills ul-skills1">
                  {cert.links.map((link, j) => (
                    <li key={j}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="wrapper_skills_Other">
          <h3 className="section4-sub-title">Other Programs</h3>
          <div className="skills-svg-list" id='other-programs'>
            {Object.values(otherPrograms).map((svg, i) => (
              <span key={i} dangerouslySetInnerHTML={{ __html: svg }} />
            ))}
          </div>
          <h3 className="section4-sub-title">Languages</h3>
          <ul className="ul-skills">
            {languages.map((lang, i) => <li key={i}>{lang}</li>)}
          </ul>
          <h3 className="section4-sub-title">Other Skills</h3>
          <ul className="ul-skills">
            {otherSkills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
