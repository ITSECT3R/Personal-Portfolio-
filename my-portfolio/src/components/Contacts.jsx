import React from 'react';
import { svgs } from '../data/data-js/svgs-data';

const contactLinks = [
  {
    href: 'https://www.linkedin.com/in/luis-angel-marin-rodriguez-084449165/',
    label: 'LinkedIn',
    svg: svgs.linkedin
  },
  {
    href: 'https://www.facebook.com/profile.php?id=100004578071386&locale=es_LA',
    label: 'Facebook',
    svg: svgs.facebook
  },
  {
    href: '#',
    label: 'WhatsApp',
    svg: svgs.phone
  },
  {
    href: 'mailto:ITSECT3R@GMAIL.COM?subject=Developer%20Contact&body=Hello,%20greetings%20the%20reason%20of%20my%20contact%20is%20about:',
    label: 'Email',
    svg: svgs.mailbox
  },
  {
    href: 'https://github.com/ITSECT3R',
    label: 'GitHub',
    svg: svgs.githubFooter
  },
];

const Contacts = () => (
  <section id="Contacts-section" className="sections">
    <div className="main-body">
      <div className="wrapper_footer">
        <h2 className="h2-contacts">Contacts</h2>
        <div className="contact_list">
          <ul className="ul-nav ul_footer">
            {contactLinks.map((contact, i) => (
              <li key={i}>
                <a href={contact.href} target="_blank" rel="noopener noreferrer">
                  <span dangerouslySetInnerHTML={{ __html: contact.svg }} />
                  {contact.label === 'Email' ? 'ITSECT3R@GMAIL.COM' : null}
                  {contact.label === 'WhatsApp' ? '+52 3332483975' : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Contacts;
