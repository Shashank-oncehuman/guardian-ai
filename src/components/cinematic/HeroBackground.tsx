import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  hue: number;
  saturation: number;
  lightness: number;
  opacity: number;
  phase: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Cinematic light orbs
    const orbs: Orb[] = [
      { x: 0.2, y: 0.3, radius: 180, vx: 0.15, vy: 0.08, hue: 217, saturation: 91, lightness: 60, opacity: 0.12, phase: 0 },
      { x: 0.7, y: 0.5, radius: 140, vx: -0.1, vy: 0.12, hue: 170, saturation: 60, lightness: 45, opacity: 0.1, phase: 2 },
      { x: 0.5, y: 0.7, radius: 100, vx: 0.08, vy: -0.06, hue: 217, saturation: 80, lightness: 50, opacity: 0.08, phase: 4 },
      { x: 0.8, y: 0.2, radius: 120, vx: -0.12, vy: 0.1, hue: 45, saturation: 80, lightness: 55, opacity: 0.06, phase: 1 },
    ];

    const animate = () => {
      time += 0.008;
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, w, h);

      // Scan line effect
      const scanY = ((Math.sin(time * 0.5) + 1) / 2) * h;
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      scanGrad.addColorStop(0, "transparent");
      scanGrad.addColorStop(0.5, "hsla(217, 91%, 60%, 0.03)");
      scanGrad.addColorStop(1, "transparent");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 40, w, 80);

      // Render orbs with cinematic glow
      for (const orb of orbs) {
        const ox = (orb.x + Math.sin(time * orb.vx + orb.phase) * 0.15) * w;
        const oy = (orb.y + Math.cos(time * orb.vy + orb.phase) * 0.1) * h;
        const pulse = 1 + Math.sin(time * 1.5 + orb.phase) * 0.3;
        const r = orb.radius * pulse;

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        grad.addColorStop(0, `hsla(${orb.hue}, ${orb.saturation}%, ${orb.lightness}%, ${orb.opacity * pulse})`);
        grad.addColorStop(0.4, `hsla(${orb.hue}, ${orb.saturation}%, ${orb.lightness}%, ${orb.opacity * 0.4})`);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.fillRect(ox - r, oy - r, r * 2, r * 2);
      }

      // Grid overlay
      ctx.strokeStyle = "hsla(217, 91%, 60%, 0.015)";
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Data stream particles
      for (let i = 0; i < 8; i++) {
        const px = (Math.sin(time * 0.3 + i * 1.2) + 1) / 2 * w;
        const py = ((time * 20 + i * 30) % h);
        const alpha = Math.sin(time + i) * 0.3 + 0.3;
        ctx.fillStyle = `hsla(217, 91%, 60%, ${alpha * 0.15})`;
        ctx.fillRect(px, py, 1.5, 8);
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 rounded-2xl"
      style={{ opacity: 0.9 }}
    />
  );
}
