import { jobs } from "../../data";
import  styles  from "../../styles/cv.module.css";
import { LocationIcon } from "../common/icons";

export const Experience = () => {
  return (
        <div className={styles.experience}>
          <h2>Experience</h2>
          <div className={styles.workHistory}>
            {jobs.map((job, index) => (
              <div key={index} className={`${styles.job1} ${styles.jobs}`}>
                <div className={styles.headerJobs}>
                  <h3>{job.company}</h3>
                  <span className={styles.jobPosition}>{job.position}</span>{' '}
                  <span className={styles.section2Dates}>{job.dates}</span>
                </div>

                <div className={styles.contentJobs}>
                  <p className={styles.mainTasks}>Main tasks</p>
                  <ul>
                    {job.responsibilities.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                  <p className={styles.contatInfo}>Location</p>
                  <div className={styles.contactDiv}>
                      <span>
                        <LocationIcon className={styles.locationIcon} />
                      </span>
                      <span>
                        <p className={styles.contactLink}>{job.location}</p>
                      </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
  );
};
