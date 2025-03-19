// Import projects and SVGs from the data files
import { personalProjects, freeCodeCampProjects } from '../data-js/projects-data.js';

// Get DOM elements for the grids
const grid1 = document.getElementById('grid-1'); // Personal projects
const grid2 = document.getElementById('grid-2'); // FreeCodeCamp projects
const loadMoreBtn1 = document.getElementById('btn-loadmore-1');
const loadMoreBtn2 = document.getElementById('btn-loadmore-2');

// Initial display counts and increment values
let personalStartLoad = 2;
let fccStartLoad = 3;
const loadMore = 3;

// Creates project HTML and adds it to the grid
const createProjectElement = (project) => {
    const projectElement = document.createElement('div');
    projectElement.className = 'container-projects';
    
    // Create the project HTML structure
    projectElement.innerHTML = `
        <a href="${project.projectLink}" target="_blank">
            <img src="${project.projectImage}" alt="${project.projectName}">
        </a>
        <h3>${project.projectName}</h3>
        <div class="Technologies">
            ${project.projectTechnologies.join('')}
        </div>
    `;
    
    return projectElement;
};

// Load initial personal projects
const loadPersonalProjects = () => {
    // Clear current grid
    grid1.innerHTML = '';
    
    // Load first set of projects
    for (let i = 0; i < Math.min(personalStartLoad, personalProjects.length); i++) {
        const projectElement = createProjectElement(personalProjects[i]);
        grid1.appendChild(projectElement);
    }
    
    // Hide load more button if all projects are loaded
    if (personalStartLoad >= personalProjects.length) {
        loadMoreBtn1.style.display = 'none';
    } else {
        loadMoreBtn1.style.display = 'block';
    }
};

// Load initial FreeCodeCamp projects
const loadFCCProjects = () => {
    // Clear current grid
    grid2.innerHTML = '';
    
    // Load first set of projects
    for (let i = 0; i < Math.min(fccStartLoad, freeCodeCampProjects.length); i++) {
        const projectElement = createProjectElement(freeCodeCampProjects[i]);
        grid2.appendChild(projectElement);
    }
    
    // Hide load more button if all projects are loaded
    if (fccStartLoad >= freeCodeCampProjects.length) {
        loadMoreBtn2.style.display = 'none';
    } else {
        loadMoreBtn2.style.display = 'block';
    }
};

// Add more personal projects when Load More button is clicked
const loadMorePersonalProjects = () => {
    // Calculate end index for next batch of projects
    const endIndex = Math.min(personalStartLoad + loadMore, personalProjects.length);
    
    // Add new projects to the grid
    for (let i = personalStartLoad; i < endIndex; i++) {
        const projectElement = createProjectElement(personalProjects[i]);
        grid1.appendChild(projectElement);
    }
    
    // Update startLoad
    personalStartLoad = endIndex;
    
    // Hide button if all projects are loaded
    if (personalStartLoad >= personalProjects.length) {
        loadMoreBtn1.style.display = 'none';
    }
};

// Add more FCC projects when Load More button is clicked
const loadMoreFCCProjects = () => {
    // Calculate end index for next batch of projects
    const endIndex = Math.min(fccStartLoad + loadMore, freeCodeCampProjects.length);
    
    // Add new projects to the grid
    for (let i = fccStartLoad; i < endIndex; i++) {
        const projectElement = createProjectElement(freeCodeCampProjects[i]);
        grid2.appendChild(projectElement);
    }
    
    // Update startLoad
    fccStartLoad = endIndex;
    
    // Hide button if all projects are loaded
    if (fccStartLoad >= freeCodeCampProjects.length) {
        loadMoreBtn2.style.display = 'none';
    }
};

// Add event listeners to load more buttons
loadMoreBtn1.addEventListener('click', loadMorePersonalProjects);
loadMoreBtn2.addEventListener('click', loadMoreFCCProjects);

// Initialize by loading projects when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadPersonalProjects();
    loadFCCProjects();
});