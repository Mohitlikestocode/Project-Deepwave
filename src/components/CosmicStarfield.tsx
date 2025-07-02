import { useEffect, useRef } from 'react';

export default function CosmicStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const STAR_COLORS = [
      '#00ff88', // cosmic green
      '#6c5ce7', // cosmic purple
      '#0066cc', // cosmic blue
      '#c0c5ce', // cosmic silver
      '#ffffff', // white
    ];

    function randomColor() {
      return STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    }

    const STAR_COUNT = Math.floor(width * height / 1200);
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1 + 0.5,
      r: Math.random() * 1.2 + 0.2,
      color: randomColor(),
      twinkle: Math.random() * Math.PI * 2,
    }));

    let shootingStar = null as null | {
      x: number, y: number, vx: number, vy: number, life: number, color: string
    };
    let shootingTimer = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      // Draw stars
      for (const star of stars) {
        const tw = 0.7 + 0.3 * Math.sin(Date.now() / 700 + star.twinkle);
        ctx.globalAlpha = tw;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * star.z, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 8 * star.z;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
      // Draw shooting star
      if (shootingStar) {
        ctx.save();
        ctx.strokeStyle = shootingStar.color;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = Math.max(0, shootingStar.life / 1.2);
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - shootingStar.vx * 30, shootingStar.y - shootingStar.vy * 30);
        ctx.stroke();
        ctx.restore();
      }
    }

    function update() {
      // Parallax effect
      for (const star of stars) {
        star.x -= 0.02 * star.z;
        if (star.x < 0) star.x = width;
      }
      // Shooting star logic
      if (!shootingStar && Math.random() < 0.002 && shootingTimer < Date.now() - 2000) {
        shootingStar = {
          x: Math.random() * width * 0.7 + width * 0.2,
          y: Math.random() * height * 0.3 + height * 0.1,
          vx: Math.random() * 6 + 4,
          vy: Math.random() * 2 + 1,
          life: 1.2,
          color: randomColor(),
        };
        shootingTimer = Date.now();
      }
      if (shootingStar) {
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.life -= 0.03;
        if (shootingStar.life <= 0) shootingStar = null;
      }
    }

    let running = true;
    function loop() {
      if (!running) return;
      update();
      draw();
      requestAnimationFrame(loop);
    }
    loop();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      running = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
} 