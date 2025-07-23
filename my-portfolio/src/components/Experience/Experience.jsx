import JobComponent from './jobComponent';
import React from 'react';

const locationIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><g fill="none" stroke="#3300ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8"/></g></svg>
);
const phoneIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="none" stroke="#3300ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>
);

const jobs = [
  {
    className: 'job1',
    company: 'Outlier AI',
    position: 'Full Stack Developer',
    dates: '2/24 - Present',
    tasks: [
      'Review AI generated code to ensure it meets the standards of the company, and make sure it is functional.',
      'Developed and maintained web applications using React, JavaScript, TypeScript, SQL, Etc.',
      'Collaborated Across multiple Projects for different clients, ensuring quality standards are met.',
      'Analyzed and optimized AI generated responses to improve accuracy and relevance.',
      'Reviewed team members apllications and provided feedback to improve AI responses.',
      'Performed manual testing and debugging of AI generated code to ensure functionality and performance.',
    ],
    contacts: [
      {
        icon: locationIcon,
        value: <a className="contact-link" href="https://www.google.com/maps/place/HCL+Mexico/@20.6748743,-103.3949036,17z/data=!3m1!4b1!4m6!3m5!1s0x8428ae6fe52fa9d7:0x9dd1c6856b5e381e!8m2!3d20.6748743!4d-103.3923287!16s%2Fg%2F11b75jbdvh?entry=ttu" target="_blank" rel="noopener noreferrer">Remote from Guadalajara Jalisco, Mexico</a>
      },

    ]
  },
  {
    className: 'job2',
    company: 'HCL Technologies',
    position: 'Underwriter',
    dates: '2/23 - 2/25',
    tasks: [
      'review financial profiles for a USA bank, to determine if it would be best to approve or decline credit inquiries for cars, recreational vehicles, boats or cash.',
      'Applied best practices to align accounting processes with current laws and regulations.',
      'Maintained journal entries to track and analyze credit and debit transactions.',
      'Applied understanding of tax code to conduct financial reviews and prepare documentation for external auditors.',
      'Maintain the best quality and review process updates weekly, while taking constantly high risk decisions to ensure the best business for the bank.',
      'Gathered and collected all financial information for business and verified accuracy in system.',
      'Evaluated office processes, making suggestions to improve efficiency.',
      'Developed Excel tools (calculators, tables of content, ETC)',
      'Devlepoed HTML, CSS and Javascript tools to enhance accuracy across application and remain compliant with bank regulations.'
    ],
    contacts: [
      {
        icon: locationIcon,
        value: <a className="contact-link" href="https://www.google.com/maps/place/HCL+Mexico/@20.6748743,-103.3949036,17z/data=!3m1!4b1!4m6!3m5!1s0x8428ae6fe52fa9d7:0x9dd1c6856b5e381e!8m2!3d20.6748743!4d-103.3923287!16s%2Fg%2F11b75jbdvh?entry=ttu" target="_blank" rel="noopener noreferrer">Minerva Av Vallarta - Guadalajara, Jalisco</a>
      },
      {
        icon: phoneIcon,
        value: '+52 3340005745'
      }
    ]
  },
  {
    className: 'job3',
    company: 'Tata Consultancy Services',
    position: 'Customer Service Representative / Recruitter',
    dates: '8/21 - 2/23',
    tasks: [
      'Increased efficiency and team productivity by promoting operational best practices.',
      'Help customers with starting electric service for SCE (Southern California Edison), or tuning off the service',
      'Explained Solar information to customers regarding rebates, incentives, programs and benefits',
      'Helped customers fill in applications for LIQP (Low Income Qualified Programs), And review recertifications process And medical programs enrollment.',
      'review billing inquires and review charges and balance info such as KWH monthly using graphs to compare and explain usage info',
      'Recruit Persons with the standard requirements of the company knowledge, abilities and experience., Helped New Agents with documents filling and creating online profiles for the company, give fallow up with recruiters and other departments to help new agents continue there process.'
    ],
    contacts: [
      {
        icon: locationIcon,
        value: <a className="contact-link" href="https://www.google.com/maps/place/Tata+Consultancy+Services+3/@20.614337,-103.4193837,17z/data=!3m1!4b1!4m6!3m5!1s0x8428ac5849be3963:0xc055db6fa9808f11!8m2!3d20.614337!4d-103.4168088!16s%2Fg%2F1tffztsk?entry=ttu" target="_blank" rel="noopener noreferrer">Av Camino al ITESO - Guadalajara, Jalisco</a>
      },
      {
        icon: phoneIcon,
        value: '+52 3330038200'
      }
    ]
  },
  {
    className: 'job4',
    company: 'Teleperformance',
    position: 'Customer Service Representative',
    dates: '6/19 - 8/21',
    tasks: [
      'Achieved high satisfaction rating through proactive one-call resolutions of customer issues.',
      'Used consultative techniques to understand customer needs and make strategic referrals to business partners.',
      'Addressed customer complaints and mitigated dissatisfaction by employing timely and on-point solutions',
      'Maintained and managed customer files and databases.',
      'Assisted customers with opening accounts and signing up for new services.',
      'Offer Remote trouble shooting for online issues help opening credit card accounts',
      'review billing information and explained detailed information to customers meeting Average Handle Time Expectations',
      'review charges and Negotiating Late Fees'
    ],
    contacts: [
      {
        icon: locationIcon,
        value: <a className="contact-link" href="https://www.google.com/maps/place/Teleperformance+Nova/@20.6135715,-103.420187,17z/data=!3m1!4b1!4m6!3m5!1s0x8428ac580ed911f3:0xfd4066402e7e2181!8m2!3d20.6135715!4d-103.4176121!16s%2Fg%2F12hr605ml?entry=ttu" target="_blank" rel="noopener noreferrer">Av Camino al ITESO - Guadalajara, Jalisco</a>
      },
      {
        icon: phoneIcon,
        value: '8001110202'
      }
    ]
  }
];

const Experience = () => (
  <section id="experience" className="sections">
    <div className="main-body">
      <div className="section2-header">
        <h2>Experience</h2>
        <p>
          <span>Note:</span> I have been working as a freelance developer, contributing to multiple projects and earning various certifications from different sources, with a focus on full-stack development since 2020. Please see the Projects and Skills sections for more details. :3
        </p>
      </div>
      <div className="work-history">
        {jobs.map((job, idx) => <JobComponent key={idx} job={job} />)}
      </div>
    </div>
  </section>
);

export default Experience;
