import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} Ethan Frakes</p>
      <p><small><a href="https://github.com/thefrostedfrakes/ethanfrakes-site">Source</a></small></p>
    </footer>
  );
}
