import React from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { SiLinkedin, SiGithub } from 'react-icons/si';

/* one contact link, as a large key with its icon inside - the same size and
   spacing as the Portfolio dropdowns (.key-row / .key-big in App.css) */
function ContactLink({ href, icon: Icon, label }) {
  return (
    <p className="key-row">
      {/* web links open in a new tab; mailto: is left alone - it opens the
          mail app, not a page, so there is no tab to keep */}
      <a
        className="key key-big"
        href={href}
        {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        <Icon aria-hidden="true" />
        <span className="key-big__label">{label}</span>
      </a>
    </p>
  );
}

export default function Contact() {
  return (
    <main className="site-content">
      <h1>Contact</h1>
      <ContactLink href="mailto:ethan@ethanfrakes.com" icon={MdOutlineEmail} label="Email" />
      <ContactLink href="https://www.linkedin.com/in/ethan-frakes-b03070157/" icon={SiLinkedin} label="LinkedIn" />
      <ContactLink href="https://github.com/thefrostedfrakes" icon={SiGithub} label="GitHub" />
    </main>
  );
}
