"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface Dot {
  x: number;
  y: number;
  originX: number;
  originY: number;
}

const SPACING = 32;
const BASE_DOT_RADIUS = 1.5;
const REPEL_RADIUS = 140;
const REPEL_STRENGTH = 22;
const RETURN_SPEED = 0.08;

export default function DottedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(0);
  const cssSizeRef = useRef({ w: 0, h: 0 });
  const dprRef = useRef(1);
  const [ready, setReady] = useState(false);

  const initDots = useCallback((w: number, h: number) => {
    const dots: Dot[] = [];
    const cols = Math.ceil(w / SPACING) + 2;
    const rows = Math.ceil(h / SPACING) + 2;
    const offsetX = (w - (cols - 1) * SPACING) / 2;
    const offsetY = (h - (rows - 1) * SPACING) / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * SPACING;
        const y = offsetY + row * SPACING;
        dots.push({ x, y, originX: x, originY: y });
      }
    }
    dotsRef.current = dots;
  }, []);

  // Setup canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const section = canvas.closest("section");
    if (!section) return;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      dprRef.current = dpr;
      cssSizeRef.current = { w, h };
      initDots(w, h);
      setReady(true);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [initDots]);

  // Document-level mouse/touch tracking (fixes z-index blocking)
  useEffect(() => {
    const section = canvasRef.current?.closest("section");
    if (!section) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const onTouchMove = (e: TouchEvent) => {
      const rect = section.getBoundingClientRect();
      const t = e.touches[0];
      mouseRef.current = {
        x: t.clientX - rect.left,
        y: t.clientY - rect.top,
      };
    };

    const onTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    section.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!ready) return;
    let running = true;

    const loop = () => {
      if (!running) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { w, h } = cssSizeRef.current;
      const dpr = dprRef.current;

      // Reset transform and clear in physical pixels
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Apply DPR scale for CSS-pixel drawing
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isDark = document.documentElement.classList.contains("dark");
      const dots = dotsRef.current;

      // Draw connecting lines between close displaced dots
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        const da = Math.sqrt((a.x - a.originX) ** 2 + (a.y - a.originY) ** 2);
        if (da < 2) continue;

        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const db = Math.sqrt((b.x - b.originX) ** 2 + (b.y - b.originY) ** 2);
          if (db < 2) continue;

          const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (dist < SPACING * 1.2) {
            const lineAlpha = isDark
              ? 0.06 * Math.min(da / REPEL_STRENGTH, 1) * Math.min(db / REPEL_STRENGTH, 1)
              : 0.04 * Math.min(da / REPEL_STRENGTH, 1) * Math.min(db / REPEL_STRENGTH, 1);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = isDark
              ? `rgba(232, 168, 56, ${lineAlpha})`
              : `rgba(180, 120, 30, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Update and draw dots
      for (const dot of dots) {
        const dx = mx - dot.originX;
        const dy = my - dot.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          const angle = Math.atan2(dy, dx);
          dot.x += (dot.originX - Math.cos(angle) * force - dot.x) * 0.3;
          dot.y += (dot.originY - Math.sin(angle) * force - dot.y) * 0.3;
        } else {
          dot.x += (dot.originX - dot.x) * RETURN_SPEED;
          dot.y += (dot.originY - dot.y) * RETURN_SPEED;
        }

        // Snap when very close
        if (Math.abs(dot.x - dot.originX) < 0.1) dot.x = dot.originX;
        if (Math.abs(dot.y - dot.originY) < 0.1) dot.y = dot.originY;

        const displace = Math.sqrt(
          (dot.x - dot.originX) ** 2 + (dot.y - dot.originY) ** 2
        );
        const t = Math.min(displace / REPEL_STRENGTH, 1);

        // Color transitions from subtle to accent gold when displaced
        const r = isDark
          ? Math.round(255 * (1 - t) + 232 * t)
          : Math.round(0 * (1 - t) + 180 * t);
        const g = isDark
          ? Math.round(255 * (1 - t) + 168 * t)
          : Math.round(0 * (1 - t) + 130 * t);
        const b = isDark
          ? Math.round(255 * (1 - t) + 56 * t)
          : Math.round(0 * (1 - t) + 30 * t);
        const alpha = isDark
          ? 0.1 + t * 0.6
          : 0.08 + t * 0.4;
        const radius = BASE_DOT_RADIUS + t * 2;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [ready]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
