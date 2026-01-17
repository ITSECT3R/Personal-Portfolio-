import '../styles/home.css';

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <h2>Full-Stack Developer</h2>
      <div className="content-wrapper">
        <div></div>
        <div>
          <div className="border-effect border-rainbow">
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
