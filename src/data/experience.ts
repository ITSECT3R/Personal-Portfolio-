import type { Job } from '../types/cv';

export const jobs: Job[] = [
  {
    company: 'Nielsen',
    position: 'QA & Automation Specialist',
    displayDate: '8/25 - Present',
    location: 'Hybrid - Guadalajara, Jalisco',
    responsibilities: [
      'Developed 3 internal web applications that flag errors and inconsistencies in interviewer-collected data, provide feedback on deviations, and surface trends to managers, Quality Analysts and research interviewers.',
      'Automated data review and reporting workflows with Google Apps Script (Clasp), JavaScript and Python.',
      'Used GitLab and GitLab Duo for AI-assisted (agentic) coding to accelerate development and delivery.',
      'Built data-quality metrics and monitoring systems to ensure data integrity and completeness.',
      'Collaborated with QA and business stakeholders to deliver reliable, data-driven solutions end to end.',
    ],
    achievements: [
      'Automated over 20 manual data processes with JavaScript, Python and Google Apps Script (via Clasp), saving over 30 hours of manual tasks per week.',
      'Delivered 3 internal tools and dashboards adopted by over 300 users (Research Interviewers, Analysts and Managers), improving data visualization and automated reporting.',
    ],
  },
  {
    company: 'Outlier',
    position: 'Full-Stack Developer',
    displayDate: '2/25 - 8/25',
    location: 'Remote - Guadalajara, Jalisco',
    responsibilities: [
      'Developed and maintained web applications and REST APIs using React, TypeScript, Tailwind CSS and SQL.',
      'Evaluated responses from 4 different AI models against a rubric, selecting the best demo-app design.',
      'Fixed broken features and UX/UI errors in AI-generated code before submission.',
      'Reviewed AI-generated code to ensure it met company standards and was functional.',
      'Submitted corrected responses for AI feedback to improve model output quality and relevance.',
    ],
    achievements: [
      'Delivered over 50 demo applications by evaluating responses from 4 AI models against a rubric, selecting the best solution, and fixing broken features and UX/UI errors.',
      'Improved code quality and response accuracy by 8% through systematic review and optimization.',
    ],
  },
  {
    company: 'HCL Technologies',
    position: 'Underwriter (Data Quality)',
    displayDate: '2/23 - 2/25',
    location: 'Minerva Av Vallarta - Guadalajara, Jalisco',
    responsibilities: [
      'Verified financial documents (pay stubs, tax returns, income statements) with meticulous attention to accuracy and compliance before approval.',
      'Analyzed credit bureau reports (Experian, Equifax, TransUnion) and internal protocols to make high-risk approval or decline decisions.',
      'Held lending authority up to $50k unsecured and $150k secured, minimizing risk while processing 50+ credit inquiries daily.',
      'Built web tools and automations (dashboards, calculator apps) with HTML, CSS and JavaScript that reduced manual effort for the department.',
      'Evaluated office processes and suggested improvements to increase efficiency and data accuracy.',
    ],
    achievements: [
      'Processed 50+ loan inquiries per day \u2014 the highest throughput in the bank\u2019s underwriting department history.',
      'Approved decisions up to $150k secured / $50k unsecured while maintaining a strong compliance record (less than 2% error rate per year).',
      'Developed strategies to mitigate risk and fraud, enhancing the overall security and reliability of the lending process.',
    ],
  },
];
