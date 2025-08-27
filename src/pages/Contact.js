import React from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { SiLinkedin, SiGithub } from 'react-icons/si';

export default function Contact() {
  return (
    <main className="site-content">
      <h1>Contact</h1>
      <p><MdOutlineEmail/><a href="mailto:ethan@ethanfrakes.com">Email</a></p>
      <p><SiLinkedin/><a href="https://www.linkedin.com/in/ethan-frakes-b03070157/">LinkedIn</a></p>
      <p><SiGithub/><a href="https://github.com/thefrostedfrakes">GitHub</a></p>
    </main>
  );
}
