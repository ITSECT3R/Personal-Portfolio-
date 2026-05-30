import styles from "../../styles/cv/experience.module.css";
import type { Job } from '../../types/cv';
import { JobItem } from './JobItem';

type Props = {
  jobs: Job[];
};

export const Experience = ({ jobs }: Props) => {
  return (
    <div className={styles.experience}>
      <h2>Experience</h2>
      <div className={styles.workHistory}>
        {jobs.map(job => {
          const key = job.id ?? `${job.company}-${job.position}-${job.displayDate}`;

          return <JobItem key={key} job={job} />;
        })}
      </div>
    </div>
  );
};
