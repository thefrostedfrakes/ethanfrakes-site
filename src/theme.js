import { useLayoutEffect, useState } from 'react';

/* The color themes, in the order the picker lists them: the two-color themes
   first, then the single-phosphor ones in order of hue, so the list reads as
   a spectrum. Each id matches a [data-theme] block in themes.css, which is
   where the colors themselves live. */
export const THEMES = [
  { id: 'default',   name: 'Default' },
  { id: 'cyberpunk', name: 'Cyberpunk' },
  { id: 'plasma',    name: 'Plasma' },
  { id: 'matrix',    name: 'Matrix' },
  { id: 'amber',     name: 'Amber' },
  { id: 'red',       name: 'Red Alert' },
  { id: 'turquoise', name: 'Turquoise' },
  { id: 'blue',      name: 'Deep Blue' },
  { id: 'vector',    name: 'Vector' },
  { id: 'mono',      name: 'Black & White' },
  { id: 'ghost',     name: 'Ghost' },
];

/* also read by the inline script in public/index.html - keep the two in step */
const STORAGE_KEY = 'theme';

const isTheme = id => THEMES.some(t => t.id === id);

/*
 * The current theme, remembered across visits.
 *
 * The inline script in index.html has already put a saved theme on <html>
 * before the first paint, so it is read back from there rather than from
 * storage: whatever the page first painted in is where React starts.
 * Storage can be unavailable (private windows, blocked site data), so every
 * touch of it is guarded and the site simply forgets the choice instead.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = document.documentElement.getAttribute('data-theme');
    return isTheme(saved) ? saved : 'default';
  });

  /* Layout, so <html> has the new theme before anything reads its colors -
     the matrix canvas does, in a passive effect, after this has run. */
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* not remembered, still applied */
    }
  }, [theme]);

  return [theme, setTheme];
}
