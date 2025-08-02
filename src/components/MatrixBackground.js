import React, { useEffect, useRef } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1) load the cmatrix script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/cmatrix';
    script.async = true;
    document.body.appendChild(script);

    // 2) once loaded, initialize the effect
    script.onload = () => {
      if (window.matrix && canvasRef.current) {
        window.matrix(canvasRef.current, {
          // you can customize these:
          chars: window.matrix.custom_chars, // full katakana/hiragana + digits
          font_size: 14,
          color: '#00f',
          background: 'rgba(0, 0, 0, 0.05)',
          exit: false
        });
      }
    };

    // 3) cleanup (remove script; matrix itself will keep running unless you call stop())
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: -1
      }}
    />
  );
}
