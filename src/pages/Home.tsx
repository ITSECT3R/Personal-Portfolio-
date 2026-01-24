import { useAnimateOnScroll, calculateAge } from '../hooks';
import { Link } from 'react-router-dom';
import {
  AboutMeIcon,
  MexicanFlagIcon,
  CakeIcon,
} from '../components/common/icons/about-me';
import '../styles/home.css';

export default function Home() {
  // Calculate age
  const birthDate = new Date(2000, 6, 27); // July 27, 2000 (month is 0-based)
  const age = calculateAge(birthDate);

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
      <div className="content-wrapper">
        <div className="description-container">
          <div>
            <p
              ref={revealUp}
              className="text-effect text-reveal-up home-description"
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
          <div className="about-me-container">
            <p className="about-me">
              <AboutMeIcon className="icons" /> About Me.
            </p>
            <ul>
              <li>
                <MexicanFlagIcon className="icons" />
                Mexican
              </li>
              <li>
                <CakeIcon className="icons" />
                {age} Years Old
              </li>
              <li>Open to Opportunities</li>
              <li>Lifelong Learner</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="img-container border-effect border-dual-spin border-thick border-hover-only">
            <img
              src="https://avatars.githubusercontent.com/u/160300092?v=4"
              alt="Me in a professional setting"
              className="profile-pic"
            />
          </div>
          <div className="download-cv-container">
            <p ref={typewriter} className="my-name text-effect text-typewriter">
              Luis A Marin
            </p>
            <button className="download-cv-button">Download CV</button>
            <Link to="/cv" className="cv-link">
              View My Web CV
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
