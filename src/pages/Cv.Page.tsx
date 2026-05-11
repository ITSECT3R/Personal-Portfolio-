import '../styles/cv.css';
import { SideBar } from '../components/cv/sideBar';

export default function Cv() {
  return (
    <div className="cv-page">
      {/* Left Side */}
      <SideBar />

      {/* Right Side */}
      <div className="div-right">
        <div className="summary">
          <h2>Summary</h2>
          <p>
            Passionate Full-Stack Developer and QA Engineer with experience in
            building and testing web applications. Skilled in JavaScript,
            Python, React, Cloud solutions and automated testing frameworks.
            Adept at collaborating with cross-functional teams to deliver
            high-quality software solutions. Committed to continuous learning
            and staying updated with the latest industry trends to enhance
            development and testing processes. Eager to pursue excellence and
            continuous improvement.
          </p>
        </div>

        <div className="experience">
          <h2>Experience</h2>
          <div className="work-history">
            <div className="job1 jobs">
              <div className="header-jobs">
                <h3>Nielsen</h3>
                <span className="job-position">Full-Stack QA</span>{' '}
                <span className="section2-dates">8/25 - Present</span>
              </div>

              <div className="content-jobs">
                <p className="main-tasks">Main tasks</p>
                <ul>
                  <li>
                    Verify Data collection and quality assurance processes.
                    Audit SQL Data collected to guarantee accuracy and
                    completeness.
                  </li>
                  <li>
                    Ensure Legal requirements and compliance standards are met
                    throughout the data collection process.
                  </li>
                  <li>
                    Collaborate with cross-functional teams to identify and
                    resolve data quality issues.
                  </li>
                  <li>
                    Develop and implement data quality metrics and reporting
                    mechanisms to monitor data integrity.
                  </li>
                  <li>
                    Automate Spreadsheets for business efficiency, effectively
                    reducing time in repetitive tasks with JavaScript /
                    Python.{' '}
                  </li>
                </ul>
                <p className="contat-info">Location</p>
                <div className="contact-div">
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="#0dff00"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="10" r="3" />
                          <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8" />
                        </g>
                      </svg>
                      <span>
                        <a
                          className="contact-link"
                          href="https://www.google.com/maps/place/HCL+Mexico/@20.6748743,-103.3949036,17z/data=!3m1!4b1!4m6!3m5!1s0x8428ae6fe52fa9d7:0x9dd1c6856b5e381e!8m2!3d20.6748743!4d-103.3923287!16s%2Fg%2F11b75jbdvh?entry=ttu"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Hybrid - Guadalajara, Jalisco
                        </a>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="job1 jobs">
              <div className="header-jobs">
                <h3>Outlier </h3>
                <span className="job-position">Full-Stack Developer</span>
                <span className="section2-dates">2/24 - 8/25</span>
              </div>

              <div className="content-jobs">
                <p className="main-tasks">Main tasks</p>
                <ul>
                  <li>
                    Review AI generated code to ensure it meets the standards of
                    the company, and make sure it is functional.
                  </li>
                  <li>
                    Developed and maintained web applications using React,
                    JavaScript, TypeScript, SQL, Etc.
                  </li>
                  <li>
                    Collaborated Across multiple Projects for different clients,
                    ensuring quality standards are met.
                  </li>
                  <li>
                    Analyzed and optimized AI generated responses to improve
                    accuracy and relevance.
                  </li>
                  <li>
                    Reviewed team members applications and provided feedback to
                    improve AI responses.
                  </li>
                  <li>
                    Performed manual testing and debugging of AI generated code
                    to ensure functionality and performance.
                  </li>
                </ul>
                <p className="contat-info">Location</p>
                <div className="contact-div">
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="#0dff00"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="10" r="3" />
                          <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8" />
                        </g>
                      </svg>
                      <span>
                        <a
                          className="contact-link"
                          href="https://www.google.com/maps/place/HCL+Mexico/@20.6748743,-103.3949036,17z/data=!3m1!4b1!4m6!3m5!1s0x8428ae6fe52fa9d7:0x9dd1c6856b5e381e!8m2!3d20.6748743!4d-103.3923287!16s%2Fg%2F11b75jbdvh?entry=ttu"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Remote - Guadalajara, Jalisco
                        </a>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="job1 jobs">
              <div className="header-jobs">
                <h3>HCL Technologies </h3>
                <span className="job-position">Underwriter</span>{' '}
                <span className="section2-dates">2/23 - 2/25</span>
              </div>

              <div className="content-jobs">
                <p className="main-tasks">Main tasks</p>
                <ul>
                  <li>
                    review financial profiles for a USA bank, to determine if it
                    would be best to approve or decline credit inquiries for
                    cars, recreational vehicles, boats or cash.
                  </li>
                  <li>
                    Applied best practices to align accounting processes with
                    current laws and regulations.
                  </li>
                  <li>
                    Maintained journal entries to track and analyze credit and
                    debit transactions.
                  </li>
                  <li>
                    Applied understanding of tax code to conduct financial
                    reviews and prepare documentation for external auditors.
                  </li>
                  <li>
                    Maintain the best quality and review process updates weekly,
                    while taking constantly high risk decisions to ensure the
                    best business for the bank.
                  </li>
                  <li>
                    Gathered and collected all financial information for
                    business and verified accuracy in system.
                  </li>
                  <li>
                    Evaluated office processes, making suggestions to improve
                    efficiency.
                  </li>
                  <li>
                    Developed Excel tools (calculators, tables of content, ETC)
                  </li>
                  <li>
                    Developed Web Application tools to increase team
                    productivity.
                  </li>
                </ul>

                <p className="contat-info">Location</p>
                <div className="contact-div">
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="#0dff00"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="10" r="3" />
                          <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8" />
                        </g>
                      </svg>
                      <span>
                        <a
                          className="contact-link"
                          href="https://www.google.com/maps/place/HCL+Mexico/@20.6748743,-103.3949036,17z/data=!3m1!4b1!4m6!3m5!1s0x8428ae6fe52fa9d7:0x9dd1c6856b5e381e!8m2!3d20.6748743!4d-103.3923287!16s%2Fg%2F11b75jbdvh?entry=ttu"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Minerva Av Vallarta - Guadalajara, Jalisco
                        </a>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="education">
          <div>
            <h2>Education / Certifications</h2>
            <h3>High School Diploma</h3>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.google.com.mx/maps/place/UNE+Tonal%C3%A1/@20.6307716,-103.244323,17.79z/data=!4m6!3m5!1s0x8428b460bebd5689:0x68278f71b14b2dc!8m2!3d20.6318207!4d-103.2446157!16s%2Fg%2F11d_y58xxn?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D"
              className="high-school"
            >
              UNE UNIVERSITY - 45400, Av. Tonaltecas 333, El Zapote, Tonalá,
              Jal.{' '}
            </a>
          </div>
          <div>
            <div className="Certifications">
              <h3>Certifications</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#eab308"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 8l-4 4l4 4m10-8l4 4l-4 4M14 4l-4 16"
                />
              </svg>
              <h4>EPAM Systems</h4>
              <div>
                <ul className="ul-skills ul-skills1">
                  <li>
                    <a
                      href="https://certificates.epam.com/certificates/a7e2ad55-80df-4196-a09d-ab329003ed45"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Front End Development Advanced
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://certificates.epam.com/certificates/ce97b0ed-768c-4394-b36a-cc7ee7fec276"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Automated Testing JavaScript Specialization
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://certificates.epam.com/certificates/11e97e15-d94e-4a88-afd8-27034d473d4d"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Automated Testing JavaScript Advanced
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://certificates.epam.com/certificates/d87bdff8-001e-42ab-9bf6-e9b620b22841"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Automated Testing JavaScript
                    </a>
                  </li>
                </ul>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="M19.885 3.906a.62.62 0 0 0-.354.12c-.08.08-.161.196-.161.313c0 .2.236.474.673.923c1.822 1.754 2.738 3.903 2.732 6.494c-.007 2.867-.97 5.17-2.844 6.954c-.394.353-.556.63-.557.867c0 .116.08.237.16.353a.58.58 0 0 0 .353.162c.434 0 1.04-.512 1.833-1.509c1.542-1.89 2.24-3.978 2.279-6.824c.036-2.847-.857-4.777-2.603-6.77c-.63-.712-1.153-1.082-1.511-1.083m-15.769.002c-.358 0-.882.37-1.51 1.083C.858 6.984-.035 8.914.001 11.761c.04 2.846.737 4.933 2.28 6.824c.791.997 1.398 1.51 1.832 1.509a.57.57 0 0 0 .352-.162c.08-.116.16-.237.16-.353c0-.237-.162-.514-.556-.866c-1.873-1.785-2.837-4.087-2.844-6.955c-.006-2.591.91-4.74 2.732-6.494c.437-.449.674-.722.673-.923c0-.117-.08-.233-.161-.313a.62.62 0 0 0-.354-.12zm7.056.895s.655 2.081-2.649 6.727c-3.156 4.433 1.045 7.15 1.432 7.386c-.281-.18-2.001-1.5.402-5.423c.466-.77 1.076-1.47 1.834-3.041c0 0 .67.946.32 2.998c-.523 3.101 2.271 2.214 2.314 2.257c.976 1.15-.808 3.17-.917 3.233c-.108.061 5.096-3.13 1.399-7.935c-.253.253-.582 1.442-1.267 1.266c-.684-.174 2.125-3.494-2.868-7.468M9.955 18.916q.036.024.038.024z"
                />
              </svg>
              <h4>FreeCodeCamp</h4>
              <div>
                <ul className="ul-skills ul-skills1">
                  <li>
                    <a
                      href="https://freecodecamp.org/certification/ITSECT3R/responsive-web-design"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Responsive Web Design
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.freecodecamp.org/certification/ITSECT3R/javascript-algorithms-and-data-structures-v8"
                      target="_blank"
                      rel="noreferrer"
                    >
                      JavaScript Algorithms and Data Structures
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.freecodecamp.org/certification/ITSECT3R/front-end-development-libraries"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Front End Development Libraries
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.freecodecamp.org/certification/ITSECT3R/data-visualization"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Data Visualization
                    </a>
                  </li>
                </ul>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 256 256"
              >
                <g fill="none">
                  <rect width="256" height="256" fill="#242938" rx="60" />
                  <path
                    fill="#fff"
                    d="M84.745 111.961c0 2.434.263 4.407.723 5.855a35 35 0 0 0 2.106 4.737c.329.526.46 1.052.46 1.513c0 .658-.395 1.316-1.25 1.973l-4.145 2.764c-.592.394-1.184.592-1.71.592c-.658 0-1.316-.329-1.974-.921a20.4 20.4 0 0 1-2.368-3.092a51 51 0 0 1-2.04-3.882q-7.697 9.08-19.342 9.079c-5.526 0-9.934-1.579-13.158-4.737c-3.223-3.158-4.868-7.368-4.868-12.631c0-5.593 1.974-10.132 5.987-13.553s9.342-5.132 16.118-5.132c2.237 0 4.54.198 6.974.527s4.934.855 7.566 1.447v-4.803c0-5-1.053-8.487-3.092-10.526c-2.106-2.04-5.658-3.026-10.724-3.026c-2.303 0-4.671.263-7.105.855s-4.803 1.316-7.106 2.237a19 19 0 0 1-2.302.855c-.46.132-.79.198-1.053.198c-.92 0-1.382-.658-1.382-2.04v-3.224c0-1.052.132-1.842.461-2.302s.921-.921 1.842-1.382q3.454-1.776 8.29-2.96c3.223-.856 6.644-1.25 10.263-1.25c7.829 0 13.552 1.776 17.237 5.328c3.618 3.553 5.46 8.948 5.46 16.185v21.316zm-26.71 10c2.17 0 4.407-.395 6.776-1.185c2.368-.789 4.473-2.237 6.25-4.21c1.052-1.25 1.842-2.632 2.236-4.211s.658-3.487.658-5.723v-2.764a55 55 0 0 0-6.052-1.118a50 50 0 0 0-6.185-.395c-4.408 0-7.631.856-9.802 2.632s-3.224 4.276-3.224 7.566c0 3.092.79 5.394 2.434 6.973c1.58 1.645 3.882 2.435 6.908 2.435m52.828 7.105c-1.184 0-1.974-.198-2.5-.658c-.526-.395-.987-1.316-1.381-2.566l-15.46-50.855c-.396-1.316-.593-2.171-.593-2.632c0-1.052.526-1.645 1.579-1.645h6.447c1.25 0 2.106.198 2.566.658c.526.395.921 1.316 1.316 2.566l11.052 43.553l10.264-43.553c.329-1.316.723-2.17 1.25-2.566c.526-.394 1.447-.657 2.631-.657h5.263c1.25 0 2.106.197 2.632.657c.526.395.987 1.316 1.25 2.566l10.395 44.079l11.381-44.079c.395-1.316.856-2.17 1.316-2.566c.526-.394 1.382-.657 2.566-.657h6.118c1.053 0 1.645.526 1.645 1.644c0 .33-.066.658-.132 1.053c-.065.395-.197.92-.46 1.645l-15.855 50.855q-.593 1.974-1.382 2.566c-.526.394-1.382.658-2.5.658h-5.658c-1.25 0-2.105-.198-2.631-.658c-.527-.461-.987-1.316-1.25-2.632l-10.198-42.434l-10.131 42.368c-.329 1.316-.724 2.171-1.25 2.632c-.527.46-1.448.658-2.632.658zm84.54 1.776c-3.421 0-6.842-.395-10.132-1.184c-3.289-.79-5.855-1.645-7.566-2.632c-1.052-.592-1.776-1.25-2.039-1.842a4.65 4.65 0 0 1-.395-1.842v-3.355c0-1.382.526-2.04 1.513-2.04q.593 0 1.184.198c.395.131.987.394 1.645.658a35.8 35.8 0 0 0 7.237 2.302a39.5 39.5 0 0 0 7.829.79c4.145 0 7.368-.724 9.605-2.171c2.237-1.448 3.421-3.553 3.421-6.25c0-1.842-.592-3.356-1.776-4.606s-3.421-2.368-6.645-3.421l-9.539-2.96c-4.803-1.513-8.356-3.75-10.527-6.71c-2.171-2.895-3.289-6.12-3.289-9.54q0-4.144 1.776-7.303c1.184-2.105 2.763-3.947 4.737-5.394c1.974-1.514 4.211-2.632 6.842-3.422c2.632-.79 5.395-1.118 8.29-1.118c1.447 0 2.96.066 4.408.263c1.513.197 2.894.46 4.276.724c1.316.329 2.566.658 3.75 1.053q1.776.591 2.763 1.184c.921.526 1.579 1.052 1.974 1.644q.592.79.592 2.172v3.092c0 1.381-.526 2.105-1.513 2.105c-.527 0-1.382-.263-2.5-.79q-5.625-2.565-12.632-2.565c-3.75 0-6.71.592-8.75 1.842s-3.092 3.158-3.092 5.855c0 1.842.658 3.421 1.974 4.671s3.75 2.5 7.237 3.618l9.342 2.96c4.736 1.514 8.158 3.619 10.197 6.317s3.026 5.789 3.026 9.21c0 2.829-.592 5.395-1.71 7.632c-1.184 2.237-2.763 4.21-4.803 5.789c-2.039 1.645-4.474 2.829-7.302 3.685c-2.961.921-6.053 1.381-9.408 1.381"
                  />
                  <path
                    fill="#F90"
                    fillRule="evenodd"
                    d="M207.837 162.816c-21.645 15.987-53.092 24.474-80.132 24.474c-37.894 0-72.04-14.014-97.829-37.303c-2.04-1.842-.197-4.342 2.237-2.895c27.895 16.184 62.303 25.987 97.895 25.987c24.013 0 50.395-5 74.671-15.263c3.618-1.645 6.71 2.368 3.158 5"
                    clipRule="evenodd"
                  />
                  <path
                    fill="#F90"
                    fillRule="evenodd"
                    d="M216.85 152.553c-2.763-3.553-18.289-1.711-25.329-.856c-2.105.264-2.434-1.579-.526-2.96c12.368-8.684 32.697-6.184 35.066-3.29c2.368 2.961-.658 23.29-12.237 33.027c-1.777 1.513-3.487.723-2.698-1.25c2.632-6.513 8.487-21.185 5.724-24.671"
                    clipRule="evenodd"
                  />
                </g>
              </svg>
              <h4>AWS</h4>
              <div>
                <ul className="ul-skills ul-skills1">
                  <li>
                    <a
                      href="https://www.credly.com/badges/41e411cb-ea32-47c5-8ec9-1258517f4963/linked_in_profile"
                      target="_blank"
                      rel="noreferrer"
                    >
                      AWS Cloud Practitioner
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/luis-angel-m-084449165/">
                      AWS Artificial Intelligence Practitioner
                    </a>
                  </li>
                </ul>
              </div>
              <a
                href="https://www.linkedin.com/in/luis-angel-m-084449165/details/certifications/"
                target="_blank"
                rel="noreferrer"
                className="high-school link-all-certifications"
              >
                click here to visit my linkedin to view all my certifications :D
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
