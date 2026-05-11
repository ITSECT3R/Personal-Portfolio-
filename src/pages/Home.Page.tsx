import { useAnimateOnScroll, calculateAge, useDownloadCV } from '../hooks';
import usePageBackground from '../hooks/usePageBackground';
import { Link } from 'react-router-dom';
import {
  AboutMeIcon,
  MexicanFlagIcon,
  CakeIcon,
  LocationIcon,
} from '../components/common/icons';
import styles from '../styles/home.module.css';

export default function Home() {
  usePageBackground('home', 'linear-gradient(120deg, #000000, #717171)');
  // Calculate age
  const birthDate = new Date(2000, 6, 27); // July 27, 2000 (month is 0-based)
  const age = calculateAge(birthDate);

  // CV download hook
  const { downloadCV, isDownloading } = useDownloadCV();

  // Each text animation hook
  const { ref: glitchRef } = useAnimateOnScroll<HTMLHeadingElement>({
    threshold: 0.5,
    delay: 100,
  });
  const { ref: revealUp } = useAnimateOnScroll<HTMLParagraphElement>({
    threshold: 0.5,
    delay: 200,
  });
  const { ref: typewriter } = useAnimateOnScroll<HTMLParagraphElement>({
    threshold: 0.5,
    delay: 300,
  });

  return (
    <>
      <h1
        ref={glitchRef}
        className="text-effect text-glitch text-gradient home-subtitle"
      >
        Full-Stack Developer
      </h1>
      <div className={styles.contentWrapper}>
        <div className={styles.descriptionContainer}>
          <div>
            <p
              ref={revealUp}
              className={`text-effect text-reveal-up ${styles.homeDescription}`}
            >
              &quot;Hello! I am a passionate Full-Stack Software Developer
              dedicated to continuously grow in this dynamic field. I have
              actively built and contributed to various innovative solutions and
              applications, consistently striving to deliver high-quality and
              impactful results. My focus is on leveraging my skills to create
              cutting-edge software and further my expertise in this exciting
              field. Thank you for visiting!&quot;
            </p>
          </div>
          <div className={styles.aboutMeContainer}>
            <p className={styles.aboutMe}>
              <AboutMeIcon className={styles.icons} /> About Me.
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <MexicanFlagIcon className={styles.icons} />
                Mexican
              </li>
              <li className={styles.listItem}>
                <CakeIcon className={styles.icons} />
                {age} Years Old
              </li>
              <li className={styles.listItem}>
                <LocationIcon className={styles.icons} />
                Based in Guadalajara, Jalisco, Mexico
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className={`${styles.imgContainer} border-effect border-dual-spin border-thick border-hover-only`}>
            <img
              src="/profile-picture.jpg"
              alt="Me in a professional setting"
              className={`${styles.image} ${styles.profilePic}`}
            />
          </div>
          <div className={styles.downloadCvContainer}>
            <p ref={typewriter} className={`${styles.myName} text-effect text-typewriter`}>
              Luis A Marin
            </p>
            <button
              className={styles.downloadCvButton}
              onClick={downloadCV}
              disabled={isDownloading}
            >
              {isDownloading ? 'Downloading...' : 'Download CV'}
            </button>
            <Link to="/cv" className={styles.cvLink}>
              View My Web CV
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
