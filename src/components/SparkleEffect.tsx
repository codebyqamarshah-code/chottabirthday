'use client';

import { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

const COLORS = ['#FF5C8A', '#FF9F9F', '#F2C66D', '#FFD6C9', '#ffffff'];

export default function SparkleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } =
        'touches' in e ? e.touches[0] : (e as MouseEvent);

      for (let i = 0; i < 4; i++) {
        sparklesRef.current.push({
          x: clientX + (Math.random() - 0.5) * 20,
          y: clientY + (Math.random() - 0.5) * 20,
          size: 3 + Math.random() * 6,
          opacity: 1,
          life: 0,
          maxLife: 30 + Math.random() * 30,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number,
      opacity: number,
      color: string
    ) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparklesRef.current = sparklesRef.current.filter((s) => {
        s.life++;
        s.opacity = 1 - s.life / s.maxLife;
        s.size *= 0.97;
        s.y -= 0.5;
        if (s.opacity <= 0) return false;
        drawStar(ctx, s.x, s.y, s.size, s.opacity, s.color);
        return true;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      aria-hidden="true"
    />
  );
}
