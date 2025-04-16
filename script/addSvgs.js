import { 
  svgs,
  svgsSection1,
  programmingLanguages,
  frontendTechnologies,
  otherTools,
  otherPrograms
} from '../data-js/svgs-data.js';

const loadHeaderLogo = () => {
  const logosBox = document.querySelector('.logos-box');
  logosBox.insertAdjacentHTML('afterbegin', svgs.dragonLogo);
};

// Function to load SVGs into section1 list items (except the first one)
const loadSection1Svg = () => {
    const ul = document.querySelector('.ul-section1');
    const liElements = ul.querySelectorAll('li');
    const svgKeys = Object.keys(svgsSection1);
    liElements.forEach((li, idx) => {
        if (idx === 0) return; // skip the first li (with img)
        const span = li.querySelector('span');
        if (span && svgKeys[idx - 1]) {
            span.insertAdjacentHTML('beforebegin', svgsSection1[svgKeys[idx - 1]]);
        }
    });
}

const loadProgramingLanguagesSvgs = () => {
  const programmingLanguagesContainer = document.getElementById('programming-languages');
  programmingLanguagesContainer.innerHTML = Object.values(programmingLanguages).join('');
};

const loadFrontendSvgs = () => {
  const frontendContainer = document.getElementById('front-end');
  frontendContainer.innerHTML = Object.values(frontendTechnologies).join('');
};

const loadOtherToolsSvgs = () => {
  const otherToolsContainer = document.getElementById('other-tools');
  otherToolsContainer.innerHTML = Object.values(otherTools).join('');
};

const loadOtherProgramsSvgs = () => {
  const otherProgramsContainer = document.getElementById('other-programs');
  otherProgramsContainer.innerHTML = Object.values(otherPrograms).join('');
};

// Load initial SVGs

// Call the function after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadHeaderLogo();
    loadSection1Svg();
    loadProgramingLanguagesSvgs();
    loadFrontendSvgs();
    loadOtherToolsSvgs();
    loadOtherProgramsSvgs();
});