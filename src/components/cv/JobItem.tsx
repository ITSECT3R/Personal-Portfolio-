import type { Job } from '../../types/cv';
import styles from '../../styles/cv/experience.module.css';
import { LocationIcon } from '../common/icons';

type Props = { job: Job };

export const JobItem = ({ job }: Props) => {
  const date = job.dates ?? job.date ?? (
    job.startDate && job.endDate ? `${job.startDate} - ${job.endDate}` : (job.startDate ?? job.endDate ?? '')
  );

  return (
    <div className={`${styles.job1} ${styles.jobs}`}>
      <div className={styles.headerJobs}>
        <h3>{job.company}</h3>
        <span className={styles.jobPosition}>{job.position}</span>{' '}
        <span className={styles.section2Dates}>{date}</span>
      </div>

      <div className={styles.contentJobs}>
        <p className={styles.mainTasks}>Main tasks</p>
        <ul>
          {job.responsibilities.map((task, idx) => (
            <li key={idx}>{task}</li>
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
};

export default JobItem;
