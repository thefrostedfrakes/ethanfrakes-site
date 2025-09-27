import React, { useEffect, useRef } from 'react';

class Matrix {
    constructor(canvas, color, fontSize, charLists, speed, lineSpacing) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.color = color;
        this.fontSize = fontSize;

        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(0);
        this.charLists = this.gen_unicode(charLists);
        this.speed = speed;
        this.lineSpacing = lineSpacing; 

        this.w = window.innerWidth;
        this.h = window.innerHeight;
    }

    gen_unicode(char_limits) {
        var chars = []
        for (const char_list of char_limits) {
            for (let i = char_list[0]; i <= char_list[1]; i++) {
                let ch = String.fromCharCode(i);
                chars.push(ch);
            }
        }

        return chars;
    }

    onResize() {
      // Handle HiDPI correctly
      const dpr = window.devicePixelRatio || 1;
      this.w = window.innerWidth;
      this.h = window.innerHeight;

      this.canvas.width = Math.floor(this.w * dpr);
      this.canvas.height = Math.floor(this.h * dpr);
      this.canvas.style.width = this.w + "px";
      this.canvas.style.height = this.h + "px";

      // Reset transform then scale for DPR
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);

      // Recompute columns/drops based on CSS pixels
      this.columns = Math.floor(this.w / this.fontSize);
      this.drops = Array(this.columns)
        // random negative start so columns enter at different times
        .fill(0)
        .map(() => -Math.floor(Math.random() * Math.ceil(this.h / this.fontSize)));

      // Paint black immediately to avoid white flash
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.w, this.h);
    }

    draw() {
        // Fading background
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        this.ctx.fillRect(0, 0, this.w, this.h);

        // Text style
        this.ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
        this.ctx.font = `${this.fontSize}px hina mincho, times new roman`;
        this.ctx.textBaseline = 'top';

        const rows = this.h / this.fontSize;

        for (let i = 0; i < this.columns; i++) {
            // Random character from char list
            const charIndex = Math.floor(Math.random() * this.charLists.length);
            this.ctx.fillText(this.charLists[charIndex], i * this.fontSize, this.drops[i] * this.fontSize * this.lineSpacing);

            this.drops[i] += this.speed / this.fontSize;

            // Reset randomly after crossing bottom
            if (this.drops[i] * this.fontSize > this.h && Math.random() > 0.975) {
                this.drops[i] = -Math.floor(Math.random() * Math.ceil(rows));
            }
        }
    }
}

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const color = [0, 70, 255]; // change to any RGB
    const charRanges = [
      [0x0030, 0x0039],  // Digits
      [0x0041, 0x005A],  // Alphabet
      [0x30A1, 0x30F6],  // Katakana
      [0x3041, 0x3096],  // Hiragana
    ];

    const fontSize = 12;
    const speed = 5;
    const lineSpacing = 1.8;
    const matrix = new Matrix(canvas, color, fontSize, charRanges, speed, lineSpacing);

    const handleResize = () => matrix.onResize();
    handleResize();
    window.addEventListener("resize", handleResize);

    let rafId;
    const loop = () => {
      matrix.draw();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Render the canvas (positioned behind everything)
  return (
    <canvas
      id="matrix"
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        zIndex: -1,
      }}
    />
  );
}