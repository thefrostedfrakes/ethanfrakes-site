import { useEffect } from 'react';

/* The length of the .key tap animation in App.css (`key-tap`). */
export const KEY_TAP_MS = 450;

/*
 * Plays the full press on a .key when it is tapped with a finger or pen.
 *
 * On a touchscreen :active only lasts as long as the finger is down, which for
 * a tap is a few dozen milliseconds - the key barely starts to move before it
 * springs back. Instead, a tap adds .is-tapped, whose animation carries the key
 * all the way down and back up, then the class comes off again.
 *
 * It listens for the click rather than the touch starting on purpose: a click
 * only fires for a real tap, so a key a scroll happens to start on never
 * flickers. Mouse clicks are left alone - :hover already has the key pressed.
 * One listener on the document covers every key, including ones rendered later.
 */
export function useKeyTap() {
  useEffect(() => {
    let lastPointer = 'mouse';
    const onPointerDown = e => { lastPointer = e.pointerType; };

    const onClick = e => {
      if (lastPointer !== 'touch' && lastPointer !== 'pen') return;
      const key = e.target.closest && e.target.closest('.key');
      if (!key) return;

      key.classList.remove('is-tapped');
      void key.offsetWidth;            // restart the animation on a quick re-tap
      key.classList.add('is-tapped');
      key.addEventListener('animationend', () => key.classList.remove('is-tapped'), { once: true });
    };

    document.addEventListener('pointerdown', onPointerDown, { capture: true, passive: true });
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, { capture: true });
      document.removeEventListener('click', onClick, true);
    };
  }, []);
}
