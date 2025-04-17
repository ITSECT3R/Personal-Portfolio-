import React, { useEffect } from 'react';
import { svgs } from '../data/data-js/svgs-data.js';

const Welcome = () => {
  useEffect(() => {
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = '/resources/CV-Luis-Angel-Marin-Rodriguez-2025_compressed.pdf';
        link.download = 'CV-Luis-Angel-Marin-Rodriguez-2025_compressed';
        link.click();
      });
    }

    return () => {
      if (downloadBtn) {
        downloadBtn.removeEventListener('click', () => {});
      }
    };
  }, []);

  return (
    <section id="welcome-section" className="sections section1">
      <div className="main-body">
        <div className="section1-title-div">
          <h1 className="section1-title">
            <span className="title-span"> "Software Developer"</span> Luis Angel Marin Rodriguez
          </h1>
        </div>
        <div className="section1-div2">
          <div className="img-container">
            <a href="https://github.com/ITSECT3R" target="_blank">
              <img src="https://avatars.githubusercontent.com/u/160300092?v=4" alt="Picture of me" className="profile-picture" />
            </a>
            <button id="download-btn">Download CV</button>
            <a href="https://itsect3r.github.io/CV-Luis-Angel-M/" className="view-cv" target="_blank">View online.</a>
          </div>
          <div>
            <p>Hello! I'm a passionate newcomer to the world of software development, excited to learn and grow in this dynamic field. I'm dedicated to building my skills, creating innovative solutions, and eventually becoming one of the best software developers in Mexico. Thank you for visiting!</p>
            <h2>About Me!.</h2>
            <ul className="ul-section1">
              <li>
                <img src="https://humanidades.com/wp-content/uploads/2018/08/bandera-de-mexico-e1577915774733-800x416.jpg" alt="" />
                <span>Mexican</span>
              </li>
              <li>
                <span dangerouslySetInnerHTML={{ __html: svgs.calender}} />
                <span>24 Years Old</span></li>
              <li>
                <span dangerouslySetInnerHTML={{__html: svgs.mapPin}}></span>
                <span><a href="https://www.google.com/maps/place/Guadalajara,+Jal./@20.6738512,-103.4177997,12z/data=!3m1!4b1!4m6!3m5!1s0x8428b18cb52fd39b:0xd63d9302bf865750!8m2!3d20.6751707!4d-103.3473385!16zL20vMGpwMjY?entry=ttu" target="_blank">Guadalajara, Jalisco</a></span>
              </li>
              <li>
                <span dangerouslySetInnerHTML={{__html: svgs.maleGender}}></span>
                <span>Status: Single / Male</span>
              </li>
              <li>
                <span dangerouslySetInnerHTML={{__html: svgs.devScreen}}></span>
                <span>Full Stack Developer</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
