import React, { useState } from 'react';

export default function JobComponent({ job }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Show content if open (clicked) or hovered (but not yet clicked)
  const showContent = open || hovered;

  const handleHeaderClick = () => {
    setOpen((prev) => !prev);
    setHovered(false); // Remove hover effect after click
  };

  return (
    <div className={job.className + ' jobs'}>
      <div
        className="header-jobs"
        onMouseEnter={() => { if (!open) setHovered(true); }}
        onMouseLeave={() => { if (!open) setHovered(false); }}
        onClick={handleHeaderClick}
        style={{ cursor: 'pointer', userSelect: 'none', transition: 'background 0.3s, box-shadow 0.3s' }}
      >
        <h2>{job.company}</h2>
        <span className="job-position">{job.position}</span>
        <div className="dates-div">
        <span className="section2-dates">{job.dates}</span>
        <span style={{ marginLeft: 16, fontSize: 28, transition: 'transform 0.3s', display: 'inline-block', transform: showContent ? 'rotate(90deg)' : 'rotate(0deg)' }}>
          ▶
        </span>
        </div>
      </div>
      <div
        className="content-jobs"
        style={{
          maxHeight: showContent ? 3000 : 0,
          opacity: showContent ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.5s cubic-bezier(.4,0,.2,1), opacity 0.4s cubic-bezier(.4,0,.2,1)',
          pointerEvents: showContent ? 'auto' : 'none',
        }}
      >
        <p className="main-tasks">Main tasks</p>
        <ul>
          {job.tasks.map((task, idx) => <li key={idx}>{task}</li>)}
        </ul>
        <p className="contat-info">Contact info</p>
        <div className="contact-div">
          {job.contacts.map((contact, idx) => (
            <div key={idx}>
              {contact.icon}
              <span>{contact.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Add fadeIn animation for smooth effect
// You can add this to your App.css:
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }