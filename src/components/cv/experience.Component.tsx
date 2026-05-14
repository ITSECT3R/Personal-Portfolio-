import styles from "../../styles/cv.module.css";
import { LocationIcon } from "../common/icons";
import type { Job } from '../../types/cv';

type Props = {
  jobs: Job[];
};

export const Experience = ({ jobs }: Props) => {
  return (
    <div className={styles.experience}>
      <h2>Experience</h2>
      <div className={styles.workHistory}>
        {jobs.map(job => {
          const date = (job as any).date ?? (
            job.startDate && job.endDate ? `${job.startDate} - ${job.endDate}` : (job.startDate ?? job.endDate ?? '')
          );
          const key = job.id ?? `${job.company}-${(job as any).position || ''}-${date}`;

          return (
            <div key={key} className={`${styles.job1} ${styles.jobs}`}>
              <div className={styles.headerJobs}>
                <h3>{job.company}</h3>
                <span className={styles.jobPosition}>{job.position}</span>{' '}
                <span className={styles.section2Dates}>{date}</span>
              </div>

              <div className={styles.contentJobs}>
                <p className={styles.mainTasks}>Main tasks</p>
                <ul>
                  {job.responsibilities.map((task, taskIndex) => (
                    <li key={taskIndex}>{task}</li>
                  ))}
                </ul>
                <p className={styles.contactInfo}>Location</p>
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
          );
        })}
      </div>
    </div>
  );
};
