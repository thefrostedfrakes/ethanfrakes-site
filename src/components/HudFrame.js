import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import './HudFrame.css';

const clamp = (n, lo, hi) => Math.min(Math.max(n, lo), hi);
const r = v => Math.round(v * 10) / 10;

/*
 * The whole frame is generated in CSS pixels against the real, measured size of
 * the page rather than being one drawing stretched to fit it. That is the only
 * way a frame like this survives both a 390px phone and a publications page two
 * metres of scroll deep: a chamfer stays 45 degrees, a rule stays 2px, a tick
 * stays the length it was drawn at, and a page that gets longer gets *more*
 * ticks rather than longer ones. A single <svg preserveAspectRatio="none">
 * would smear the corners into ramps the moment the box stopped being square.
 *
 * Returns three buckets: `rules` is the frame proper, `detail` is the lighter
 * thinner ornament, `marks` are filled solids.
 */
function buildFrame(w, h) {
  const u = clamp(w / 900, 0.55, 1.15);      // ornament scale, off the narrow axis
  const roomy = w >= 560;

  const o = 1;                               // half the 2px rule, keeps it in the box
  const cut = Math.round(46 * u);            // length of the 45 degree corner chamfer
  const gap = Math.round(12 * u);            // outer rule -> inner rule
  const k = r(cut + gap * (Math.SQRT2 - 1)); // where the inner chamfer meets the inner run

  const x0 = o, y0 = o, x1 = r(w - o), y1 = r(h - o);
  const ax0 = x0 + gap, ay0 = y0 + gap, ax1 = r(x1 - gap), ay1 = r(y1 - gap);
  const cx = r(w / 2);

  const rules = [];
  const detail = [];
  const marks = [];

  /* ---- outer ring: one unbroken chamfered rectangle ---- */
  rules.push(
    'M' + (x0 + cut) + ',' + y0 + 'H' + r(x1 - cut) + 'L' + x1 + ',' + (y0 + cut) +
    'V' + r(y1 - cut) + 'L' + r(x1 - cut) + ',' + y1 + 'H' + (x0 + cut) +
    'L' + x0 + ',' + r(y1 - cut) + 'V' + (y0 + cut) + 'Z'
  );

  /* ---- inner ring, top run: two straights meeting a stepped plate over the
     middle. The plate is a share of the width so it keeps its proportion, but
     clamped so it never swallows a phone nor strands itself on a monitor. */
  const tabW = Math.round(clamp(w * 0.20, 80, 320));
  const tabD = Math.round(11 * u);
  const tl = r(cx - tabW / 2);
  const tr = r(cx + tabW / 2);
  rules.push(
    'M' + ax0 + ',' + r(y0 + k) + 'L' + r(x0 + k) + ',' + ay0 + 'H' + r(tl - tabD) +
    'L' + tl + ',' + r(ay0 + tabD) + 'H' + tr + 'L' + r(tr + tabD) + ',' + ay0 +
    'H' + r(x1 - k) + 'L' + ax1 + ',' + r(y0 + k)
  );

  /* segmented readout inside the top plate */
  const nb = clamp(Math.floor((tabW - 26 * u) / (22 * u)), 3, 7);
  const bw = r(13 * u);
  const bh = r(Math.max(2.5, 3.4 * u));
  const bp = 22 * u;
  const bx = cx - ((nb - 1) * bp + bw) / 2;
  const by = r(y0 + (gap + tabD) / 2 - bh / 2);
  for (let i = 0; i < nb; i++) {
    marks.push('M' + r(bx + i * bp) + ',' + by + 'h' + bw + 'v' + bh + 'h' + -bw + 'Z');
  }

  /* ---- inner ring, bottom run: a deeper plate, hatched ---- */
  const btabW = Math.round(clamp(w * 0.30, 120, 460));
  const btabD = Math.round(16 * u);
  const bl = r(cx - btabW / 2);
  const br = r(cx + btabW / 2);
  rules.push(
    'M' + ax0 + ',' + r(y1 - k) + 'L' + r(x0 + k) + ',' + ay1 + 'H' + r(bl - btabD) +
    'L' + bl + ',' + r(ay1 - btabD) + 'H' + br + 'L' + r(br + btabD) + ',' + ay1 +
    'H' + r(x1 - k) + 'L' + ax1 + ',' + r(y1 - k)
  );

  const hs = r(gap + btabD - 6);             // slash runs the depth of the plate, at 45
  for (let hx = bl + 8 * u; hx <= br - 8 * u - hs; hx += 13 * u) {
    detail.push('M' + r(hx) + ',' + r(y1 - 3) + 'l' + hs + ',' + -hs);
  }

  /* ---- chamfer rungs: short ties across the gap, two per corner ---- */
  const s = Math.SQRT1_2;
  const rung = (px0, py0, px1, py1, nx, ny) => {
    [0.3, 0.7].forEach(f => {
      const px = px0 + (px1 - px0) * f;
      const py = py0 + (py1 - py0) * f;
      detail.push('M' + r(px) + ',' + r(py) + 'L' + r(px + nx * gap) + ',' + r(py + ny * gap));
    });
  };
  rung(x0 + cut, y0, x0, y0 + cut, s, s);
  rung(r(x1 - cut), y0, x1, y0 + cut, -s, s);
  rung(x1, r(y1 - cut), r(x1 - cut), y1, -s, -s);
  rung(x0 + cut, y1, x0, r(y1 - cut), s, -s);

  /* ---- stubs inboard of the two top corners ---- */
  if (roomy) {
    for (let i = 0; i < 3; i++) {
      const dx = (22 + i * 13) * u;
      const ty = r(y0 + gap * 0.6);
      detail.push('M' + r(x0 + cut + dx) + ',' + y0 + 'V' + ty);
      detail.push('M' + r(x1 - cut - dx) + ',' + y0 + 'V' + ty);
    }
  }

  /* ---- the sides: this is where page length is absorbed ----
     Both the solid port and the ladder are placed as a fraction of the run, and
     the ladder's rung count is recomputed from the span it has to fill, so a
     long page reads as a longer instrument scale rather than a stretched one. */
  const vFrom = y0 + k + 12 * u;
  const vTo = y1 - k - 12 * u;
  const vLen = vTo - vFrom;

  if (vLen > 200 * u) {
    const ph = r(26 * u);                                    // port height
    const pL = r(clamp(vFrom + vLen * 0.16, vFrom, vTo - ph));
    const pR = r(clamp(vTo - vLen * 0.16 - ph, vFrom, vTo - ph));

    /* the inner run breaks either side of its port */
    rules.push('M' + ax0 + ',' + r(y0 + k) + 'V' + pL + 'M' + ax0 + ',' + r(pL + ph) + 'V' + r(y1 - k));
    rules.push('M' + ax1 + ',' + r(y0 + k) + 'V' + pR + 'M' + ax1 + ',' + r(pR + ph) + 'V' + r(y1 - k));

    marks.push('M' + x0 + ',' + pL + 'h' + gap + 'v' + ph + 'h' + -gap + 'Z');
    marks.push('M' + ax1 + ',' + pR + 'h' + gap + 'v' + ph + 'h' + -gap + 'Z');

    const run = clamp(vLen * 0.22, 60 * u, 900);
    const ladder = (left, from, to) => {
      /* a floor on the pitch, so the rungs stay readable as ticks on a
         phone instead of collapsing into a dotted strip */
      const n = Math.max(2, Math.round((to - from) / Math.max(11, 15 * u)));
      const step = (to - from) / n;
      for (let i = 0; i <= n; i++) {
        const y = r(from + i * step);
        detail.push(left ? 'M' + x0 + ',' + y + 'H' + ax0 : 'M' + ax1 + ',' + y + 'H' + x1);
      }
    };
    ladder(true, clamp(pL + ph + 16 * u, vFrom, vTo), clamp(pL + ph + 16 * u + run, vFrom, vTo));
    ladder(false, clamp(pR - 16 * u - run, vFrom, vTo), clamp(pR - 16 * u, vFrom, vTo));
  } else {
    rules.push('M' + ax0 + ',' + r(y0 + k) + 'V' + r(y1 - k));
    rules.push('M' + ax1 + ',' + r(y0 + k) + 'V' + r(y1 - k));
  }

  /* ---- solid segments on the bottom rule, left of the plate ---- */
  if (roomy) {
    let sx = bl - btabD - 34 * u;
    [30, 18, 30].forEach(seg => {
      sx -= seg * u;
      if (sx > x0 + cut + 20 * u) {
        marks.push('M' + r(sx) + ',' + ay1 + 'h' + r(seg * u) + 'v' + gap + 'h' + r(-seg * u) + 'Z');
      }
      sx -= 11 * u;
    });
  }

  /* ---- status node inside the top left corner ---- */
  if (roomy) {
    /* far enough down the diagonal to clear the corner chamfer and its rungs */
    const nx = r(ax0 + 34 * u);
    const ny = r(ay0 + 34 * u);
    const nr = r(8 * u);
    const d = r(nr * 2);
    detail.push(
      'M' + r(nx - nr) + ',' + ny + 'a' + nr + ',' + nr + ' 0 1,0 ' + d + ',0' +
      'a' + nr + ',' + nr + ' 0 1,0 ' + -d + ',0'
    );
    const q = r(nr * 0.62);
    marks.push('M' + r(nx - q / 2) + ',' + r(ny - q / 2) + 'h' + q + 'v' + q + 'h' + -q + 'Z');
  }

  /* `bottomArt` is how far the bottom plate dips up into the page, measured
     from the frame's own outer rule. The footer reserves it - see below. */
  return { rules, detail, marks, bottomArt: gap + btabD };
}

export default function HudFrame() {
  const boxRef = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0, navH: 0 });

  /* Layout, not passive: on mount this measures and redraws before the first
     paint, so the frame never shows up a frame late at its starting size. */
  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;

    const nav = document.querySelector('.site-nav');

    const read = () => {
      const rect = el.getBoundingClientRect();
      return {
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        navH: nav ? Math.round(nav.getBoundingClientRect().height) : 0,
      };
    };

    let last = read();

    /* A ResizeObserver callback runs after layout but before the browser
       paints, so committing the new geometry synchronously here redraws the
       frame in the same frame the page changed size. Deferring the work to an
       animation frame, as this used to, left one painted frame in which the
       artwork was still built for the old page height - that frame is the
       jitter that showed on a route change or an accordion toggle. The
       equality check keeps the synchronous path off the critical path when a
       notification carries no actual change. */
    const ro = new ResizeObserver(() => {
      const next = read();
      if (next.w === last.w && next.h === last.h && next.navH === last.navH) return;
      last = next;
      flushSync(() => setBox(next));
    });

    setBox(last);
    ro.observe(el);        // the frame's own box, which is the document's height
    if (nav) ro.observe(nav);  // and the fixed bar it has to clear

    return () => ro.disconnect();
  }, []);

  const art = box.w > 0 && box.h > 0 ? buildFrame(box.w, box.h) : null;
  const bottomArt = art ? art.bottomArt : 0;

  /* The footer is the last thing in the document, so it is what the bottom
     plate lands on top of. Publishing the plate's depth lets the footer
     reserve exactly that much room; deriving it here rather than repeating
     the plate's proportions as a vw formula in the stylesheet keeps the two
     from drifting apart if the artwork is ever retuned. */
  useEffect(() => {
    const el = document.documentElement;
    el.style.setProperty('--hud-bottom-art', bottomArt + 'px');
    return () => el.style.removeProperty('--hud-bottom-art');
  }, [bottomArt]);

  return (
    <div
      ref={boxRef}
      className="hud"
      aria-hidden="true"
      style={{ top: 'calc(' + box.navH + 'px + var(--hud-inset))' }}
    >
      {/* The svg is drawn at its natural size and pinned to the top left rather
          than stretched to fill the box. The two are identical once a
          measurement has landed, but they fail differently: a stretched svg
          whose viewBox is a measurement behind rescales the whole drawing, so
          the corners and the top plate slide and squash. At a fixed size a
          stale measurement can only leave the bottom rule short for an
          instant, and every fixed feature stays exactly where it was. */}
      {art && (
        <svg
          className="hud__art"
          width={box.w}
          height={box.h}
          viewBox={'0 0 ' + box.w + ' ' + box.h}
          preserveAspectRatio="none"
          focusable="false"
        >
          {art.rules.map((d, i) => <path key={'r' + i} className="hud__rule" d={d} />)}
          {art.detail.map((d, i) => <path key={'d' + i} className="hud__detail" d={d} />)}
          {art.marks.map((d, i) => <path key={'m' + i} className="hud__mark" d={d} />)}
        </svg>
      )}
    </div>
  );
}
