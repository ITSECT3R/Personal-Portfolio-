import React, { useState } from 'react';
import { personalProjects, freeCodeCampProjects } from '../data/data-js/projects-data';
import { useSelector, useDispatch } from 'react-redux';
import { loadMorePersonal, loadMoreFCC, resetFCCCount } from '../redux/projectsReducer';

const ProjectCard = ({ project }) => (
  <div className="container-projects">
    <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
      <img src={project.projectImage} alt={project.projectName} />
    </a>
    <h3>{project.projectName}</h3>
    <div className="Technologies">
      {project.projectTechnologies.map((svg, idx) => (
        <span key={idx} dangerouslySetInnerHTML={{ __html: svg }} />
      ))}
    </div>
  </div>
);

const Projects = () => {
  const dispatch = useDispatch();
  const personalCount = useSelector(state => state.projects.personalCount);
  const fccCount = useSelector(state => state.projects.fccCount);
  const personalTotal = useSelector(state => state.projects.personalTotal);
  const fccTotal = useSelector(state => state.projects.fccTotal);

  // Responsive adjustment for FCC count
  React.useEffect(() => {
    const handleResize = () => {
      dispatch(resetFCCCount(window.innerWidth < 1368 ? 2 : 3));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <section id="projects" className="sections">
      <div className="main-body">
        <div className="section3-header">
          <h2>Projects</h2>
        </div>
        <h3 className="section3-h3">Personal Projects</h3>
        <div className="projects-grid" id="grid-1">
          {personalProjects.slice(0, personalCount).map(project => (
            <ProjectCard key={project.projectID} project={project} />
          ))}
        </div>
        {personalCount < personalTotal && (
          <button className="btn-load-projects" id="btn-loadmore-1" onClick={() => dispatch(loadMorePersonal())}>
            Load More
          </button>
        )}
        <h3 className="section3-h3">FreeCodeCamp Projects</h3>
        <div className="projects-grid" id="grid-2">
          {freeCodeCampProjects.slice(0, fccCount).map(project => (
            <ProjectCard key={project.projectID} project={project} />
          ))}
        </div>
        {fccCount < fccTotal && (
          <button className="btn-load-projects" id="btn-loadmore-2" onClick={() => dispatch(loadMoreFCC())}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;
