import React, { useEffect, useRef } from 'react';

export default function CherryBlossomCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const petalCount = Math.min(Math.floor(width / 30), 45); // Adjust density based on screen size
    const petals = [];

    // Helper to create a single petal
    const createPetal = (isInitial = false) => {
      return {
        x: Math.random() * width,
        y: isInitial ? Math.random() * height : -20,
        r: Math.random() * 6 + 6, // size
        d: Math.random() * 1.2 + 0.8, // density/speed multiplier
        angle: Math.random() * 360,
        spin: Math.random() * 0.8 - 0.4, // spin speed
        wind: Math.random() * 0.4 + 0.2, // horizontal speed
        opacity: Math.random() * 0.5 + 0.35,
      };
    };

    // Initialize petals
    for (let i = 0; i < petalCount; i++) {
      petals.push(createPetal(true));
    }

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      // Draw stylized cherry blossom petal shape (two connected curves)
      ctx.beginPath();
      // Warm soft pink gradient
      const gradient = ctx.createLinearGradient(0, 0, p.r * 1.5, p.r);
      gradient.addColorStop(0, '#FFAEC9'); // Light pink
      gradient.addColorStop(1, '#E45275'); // Deeper rose pink
      ctx.fillStyle = gradient;

      // Draw petal geometry
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(p.r / 2, -p.r / 2, p.r, 0);
      ctx.quadraticCurveTo(p.r / 2, p.r / 2, 0, 0);
      ctx.fill();

      // Delicate center fold line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, 0);
      ctx.lineTo(p.r * 0.85, 0);
      ctx.stroke();

      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Move down and sideways (simulating wind)
        p.y += p.d * 1.1;
        p.x += p.wind;
        p.angle += p.spin;

        // Reset when falling off screen or sides
        if (p.y > height + 20 || p.x > width + 20 || p.x < -20) {
          petals[i] = createPetal(false);
        } else {
          drawPetal(p);
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    update();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5, // Behind text/cards, in front of background radial glows
      }}
    />
  );
}
