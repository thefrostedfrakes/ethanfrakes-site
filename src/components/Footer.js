import React from 'react';
// read straight from package.json rather than a copy kept here, so bumping the
// version there is the only edit a release needs and the footer cannot drift
// out of step with it. CRA allows this one import from outside src/ - its
// ModuleScopePlugin lists the app's package.json as an explicit exception, and
// it has to be the default import - CRA rejects named imports from JSON.
import packageJson from '../../package.json';

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} Ethan Frakes</p>
      <p><small>v{packageJson.version}</small></p>
      <p><small><a href="https://github.com/thefrostedfrakes/ethanfrakes-site">Source</a></small></p>
    </footer>
  );
}
