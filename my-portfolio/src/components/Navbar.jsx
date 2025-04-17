import React, { useEffect, useRef } from 'react';
import { svgs } from '../data/data-js/svgs-data.js';


const navLinks = [
  { href: '#welcome-section', label: 'Welcome' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#Contacts-section', label: 'Contacts' },
];

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      let currentSection = null;
      navLinks.forEach(link => {
        const section = document.querySelector(link.href);
        if (section && section.offsetTop <= scrollY) {
          currentSection = link.href;
        }
      });
      if (navRef.current) {
        const links = navRef.current.querySelectorAll('a');
        links.forEach(link => {
          if (link.getAttribute('href') === currentSection) {
            link.classList.add('active-nav');
          } else {
            link.classList.remove('active-nav');
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="navbar">
      <div className="logos-box">
        <span dangerouslySetInnerHTML={{ __html: svgs.dragonLogo }} />
        <span className="logo-name">ITSECT3R</span>

        {/* Add your logo image here if needed */}
      </div>
      <nav className="ul-nav" ref={navRef}>
        {navLinks.map(link => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </nav>
    </header>
  );
}