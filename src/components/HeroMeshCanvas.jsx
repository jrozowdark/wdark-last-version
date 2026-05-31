import React,{ useEffect, useRef } from 'react';

const MAX_DPR = 1.6;

function buildPoints(width, height) {
  const centerX = width * 0.56;
  const centerY = height * 0.53;
  const baseRadius = Math.min(width, height) * 0.38;

  const ringCount = 44;
  const meshCount = 30;

  const ring = Array.from({ length: ringCount }, (_, index) => {
    const angle = (index / ringCount) * Math.PI * 2;
    const radialNoise = (Math.random() - 0.5) * 26;
    const radius = baseRadius + radialNoise;

    return {
      x0: centerX + Math.cos(angle) * radius,
      y0: centerY + Math.sin(angle) * radius,
      swingX: Math.random() * 10 + 3,
      swingY: Math.random() * 10 + 3,
      speed: Math.random() * 0.0003 + 0.00014,
      phase: Math.random() * Math.PI * 2,
      size: Math.random() * 1.2 + 0.9,
      ring: true,
    };
  });

  const mesh = Array.from({ length: meshCount }, () => {
    const angle = Math.random() * Math.PI * 2;
    const radius = baseRadius * (0.76 + Math.random() * 0.56);
    const stretchX = 1.14 + Math.random() * 0.28;
    const stretchY = 0.88 + Math.random() * 0.34;

    return {
      x0: centerX + Math.cos(angle) * radius * stretchX,
      y0: centerY + Math.sin(angle) * radius * stretchY,
      swingX: Math.random() * 16 + 4,
      swingY: Math.random() * 14 + 4,
      speed: Math.random() * 0.00032 + 0.0001,
      phase: Math.random() * Math.PI * 2,
      size: Math.random() * 1.6 + 1,
      ring: false,
    };
  });

  const sparks = Array.from({ length: 70 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.3 + 0.2,
    pulse: Math.random() * 1.8 + 0.6,
    phase: Math.random() * Math.PI * 2,
  }));

  return {
    centerX,
    centerY,
    baseRadius,
    points: [...ring, ...mesh],
    sparks,
  };
}

export default function HeroMeshCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return undefined;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let model = buildPoints(800, 540);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      model = buildPoints(width, height);
    };

    const drawArcRings = (timestamp) => {
      const spin = timestamp * 0.00018;
      const ringRadii = [model.baseRadius * 1.06, model.baseRadius * 1.18, model.baseRadius * 1.32];

      context.save();
      context.translate(model.centerX, model.centerY);

      ringRadii.forEach((radius, index) => {
        const start = spin * (index % 2 === 0 ? 1 : -1) + index * 0.32;
        const end = start + Math.PI * (1.26 + index * 0.08);
        context.beginPath();
        context.lineWidth = 0.9;
        context.strokeStyle = `rgba(37, 198, 244, ${0.12 + index * 0.05})`;
        context.setLineDash([7 + index * 2, 11 + index * 3]);
        context.arc(0, 0, radius, start, end);
        context.stroke();
      });

      context.restore();
      context.setLineDash([]);
    };

    const render = (timestamp) => {
      context.clearRect(0, 0, width, height);

      const halo = context.createRadialGradient(
        model.centerX,
        model.centerY,
        model.baseRadius * 0.24,
        model.centerX,
        model.centerY,
        model.baseRadius * 1.6,
      );
      halo.addColorStop(0, 'rgba(16, 155, 220, 0.16)');
      halo.addColorStop(1, 'rgba(16, 155, 220, 0)');
      context.fillStyle = halo;
      context.fillRect(0, 0, width, height);

      drawArcRings(timestamp);

      const animated = model.points.map((point) => ({
        x: reducedMotion ? point.x0 : point.x0 + Math.sin(timestamp * point.speed + point.phase) * point.swingX,
        y: reducedMotion ? point.y0 : point.y0 + Math.cos(timestamp * point.speed * 1.32 + point.phase) * point.swingY,
        size: point.size,
        ring: point.ring,
      }));

      const linkDistance = Math.min(width, height) * 0.24;

      for (let i = 0; i < animated.length; i += 1) {
        const a = animated[i];
        for (let j = i + 1; j < animated.length; j += 1) {
          const b = animated[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.hypot(dx, dy);

          if (distance > linkDistance) {
            continue;
          }

          const alpha = (1 - distance / linkDistance) * (a.ring && b.ring ? 0.26 : 0.16);
          context.strokeStyle = `rgba(36, 212, 255, ${alpha})`;
          context.lineWidth = a.ring && b.ring ? 1.05 : 0.8;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      animated.forEach((point) => {
        context.beginPath();
        context.fillStyle = point.ring ? 'rgba(121, 240, 255, 0.96)' : 'rgba(63, 219, 255, 0.88)';
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = 'rgba(49, 210, 255, 0.2)';
        context.arc(point.x, point.y, point.size * 3.7, 0, Math.PI * 2);
        context.fill();
      });

      model.sparks.forEach((spark) => {
        const pulse = 0.34 + 0.66 * (0.5 + 0.5 * Math.sin(timestamp * 0.0012 * spark.pulse + spark.phase));
        context.beginPath();
        context.fillStyle = `rgba(59, 219, 255, ${0.08 + pulse * 0.22})`;
        context.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
        context.fill();
      });
    };

    const loop = (timestamp) => {
      render(timestamp);
      frameId = window.requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const handleMotionChange = (event) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        stopLoop();
        render(0);
      } else if (!frameId) {
        frameId = window.requestAnimationFrame(loop);
      }
    };

    resize();

    if (reducedMotion) {
      render(0);
    } else {
      frameId = window.requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);

    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (typeof motionQuery.removeEventListener === 'function') {
        motionQuery.removeEventListener('change', handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
      stopLoop();
    };
  }, []);

  return <canvas className="hero-mesh-canvas" ref={canvasRef} aria-hidden="true" />;
}
