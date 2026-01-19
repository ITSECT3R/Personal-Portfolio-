import { useAnimateOnScroll } from '../hooks';
import '../styles/home.css';

export default function Home() {
  // Each text animation hook
  const { ref: glitchRef } = useAnimateOnScroll<HTMLHeadingElement>({
    threshold: 0.5,
    delay: 200,
  });

  return (
    <main>
      <h1
        ref={glitchRef}
        className="text-effect text-glitch text-gradient home-subtitle"
      >
        Full-Stack Developer
      </h1>
      <div className="content-wrapper">
        <div></div>
        <div>
          <div className="img-container  border-effect border-dual-spin border-thick border-hover-only">
            <img
              src="https://avatars.githubusercontent.com/u/160300092?v=4"
              alt="Me in a professional setting"
              className="profile-pic"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
