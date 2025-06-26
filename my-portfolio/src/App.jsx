import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contacts from './components/Contacts';
import './App.css'

function App() {
  return (
    <>
      <main>
        <Navbar />
        <Welcome />
        <Experience />
        <Projects />
        <Skills />
        <Contacts />
      </main>
    </>
  );
}

export default App;
