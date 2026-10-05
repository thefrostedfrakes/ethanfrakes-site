import React, { useEffect, useRef, useState } from 'react';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { THEMES } from '../theme';

/*
 * The color theme menu: a palette key in the nav bar that drops a list of the
 * themes below the bar.
 *
 * Each option carries its own data-theme, so it is drawn in its own colors -
 * the list is a set of previews rather than a set of names. Picking one does
 * not close the menu, so the themes can be flipped through and seen on the
 * page behind it; a click anywhere else, Escape, or the key again closes it.
 *
 * `onOpen` lets the header fold its own mobile menu away when this one opens,
 * since the two drop into the same spot.
 */
export default function ThemePicker({ theme, onChange, onOpen }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = e => {
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = e => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const toggle = () => {
    if (!open && onOpen) onOpen();
    setOpen(!open);
  };

  return (
    <div className="theme-picker" ref={rootRef}>
      <button
        ref={toggleRef}
        type="button"
        className="key theme-picker__toggle"
        aria-label="Color theme"
        aria-expanded={open}
        aria-controls="theme-menu"
        onClick={toggle}
      >
        <IoColorPaletteOutline aria-hidden="true" />
      </button>

      {open && (
        <div id="theme-menu" className="theme-picker__menu" role="group" aria-label="Color theme">
          {THEMES.map(t => (
            <button
              key={t.id}
              type="button"
              className="theme-picker__option"
              data-theme={t.id}
              aria-pressed={t.id === theme}
              onClick={() => onChange(t.id)}
            >
              <span className="theme-picker__swatch" aria-hidden="true" />
              {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
