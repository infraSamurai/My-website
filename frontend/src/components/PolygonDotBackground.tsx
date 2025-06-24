"use client";

import React from "react";

const DOT_COUNT = 80;
const DOT_SIZE = 8;
const COLORS = ["#6366f1", "#f472b6", "#fbbf24", "#34d399", "#60a5fa", "#f87171"];
const HIGHLIGHT_COLOR = "#fff";
const LINE_COLOR = "#fff";
const LINE_OPACITY = 0.25;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function polygonPoints(cx: number, cy: number, r: number, sides: number, rotation: number) {
  const angle = (2 * Math.PI) / sides;
  return Array.from({ length: sides }, (_, i) => {
    const a = angle * i + (rotation * Math.PI) / 180;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

export default function PolygonDotBackground() {
  // Store initial positions and animation parameters
  const [dots] = React.useState(() =>
    Array.from({ length: DOT_COUNT }, (_, i) => {
      const x = randomBetween(0, 100);
      const y = randomBetween(0, 100);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const floatSpeed = randomBetween(0.2, 0.6);
      const floatPhase = randomBetween(0, Math.PI * 2);
      return { x, y, color, floatSpeed, floatPhase };
    })
  );

  // Animated state
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    const animate = () => {
      setTime(t => t + 0.016); // ~60fps
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Track which dot is hovered
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Calculate animated positions for all dots
  const animatedDots = dots.map(dot => ({
    ...dot,
    floatY: dot.y + Math.sin(time * dot.floatSpeed + dot.floatPhase) * 2
  }));

  return (
    <svg
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "auto",
        background: "#111827"
      }}
      width="100vw"
      height="100vh"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Draw lines when a dot is hovered */}
      {hovered !== null &&
        animatedDots.map((dot, i) =>
          i !== hovered ? (
            <line
              key={"line-" + i}
              x1={animatedDots[hovered].x}
              y1={animatedDots[hovered].floatY}
              x2={dot.x}
              y2={dot.floatY}
              stroke={LINE_COLOR}
              strokeWidth={0.3}
              opacity={LINE_OPACITY}
            />
          ) : null
        )}
      {/* Draw dots: only hovered dot is visible, with glow */}
      {animatedDots.map((dot, i) => {
        const isHovered = hovered === i;
        return (
          <g key={i}>
            {isHovered && (
              <>
                {/* Glow effect */}
                <circle
                  cx={dot.x}
                  cy={dot.floatY}
                  r={DOT_SIZE / 6}
                  fill={HIGHLIGHT_COLOR}
                  opacity={0.3}
                  filter="url(#glow)"
                  pointerEvents="none"
                />
                <circle
                  cx={dot.x}
                  cy={dot.floatY}
                  r={DOT_SIZE / 12}
                  fill={HIGHLIGHT_COLOR}
                  opacity={1}
                  style={{ filter: 'drop-shadow(0 0 6px #fff)' }}
                  pointerEvents="none"
                />
              </>
            )}
            {/* Invisible hit area for hover detection */}
            <circle
              cx={dot.x}
              cy={dot.floatY}
              r={DOT_SIZE / 10}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            />
          </g>
        );
      })}
      {/* SVG filter for glow */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
} 