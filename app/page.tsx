"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const TAU = Math.PI * 2;
const SEGMENTS = 120;
const RINGS = [
  28, 40, 52, 66, 80, 96, 114, 132, 152, 174, 198, 224, 252, 282, 314, 348,
  384, 422, 462, 504, 548, 594, 642, 692, 744,
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildRingPath(
  centerX: number,
  centerY: number,
  radius: number,
  cursorX: number,
  cursorY: number,
  viewportWidth: number,
  viewportHeight: number
) {
  const influenceRadius = 170 + radius * 0.28;
  const repulsion = 46 + radius * 0.035;
  const points: string[] = [];

  for (let index = 0; index <= SEGMENTS; index += 1) {
    const angle = (index / SEGMENTS) * TAU;
    let x = centerX + Math.cos(angle) * radius;
    let y = centerY + Math.sin(angle) * radius;

    const dx = x - cursorX;
    const dy = y - cursorY;
    const distance = Math.hypot(dx, dy) || 1;

    if (distance < influenceRadius) {
      const strength = (1 - distance / influenceRadius) ** 2;
      x += (dx / distance) * repulsion * strength;
      y += (dy / distance) * repulsion * strength;
    }

    x = clamp(x, -120, viewportWidth + 120);
    y = clamp(y, -120, viewportHeight + 120);

    points.push(`${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }

  return `${points.join(" ")} Z`;
}

export default function Home() {
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });
  const [cursor, setCursor] = useState({ x: 720, y: 450 });

  useEffect(() => {
    const syncViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewport({ width, height });
      setCursor((current) => {
        if (current.x === 720 && current.y === 450) {
          return { x: width / 2, y: height / 2 };
        }

        return {
          x: clamp(current.x, 0, width),
          y: clamp(current.y, 0, height),
        };
      });
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  return (
    <main
      className="home-stage"
      onPointerMove={(event) =>
        setCursor({ x: event.clientX, y: event.clientY })
      }
      onPointerLeave={() =>
        setCursor({
          x: viewport.width / 2,
          y: viewport.height / 2,
        })
      }
    >
      <div className="home-bg" aria-hidden="true">
        <svg
          className="ring-field"
          viewBox={`0 0 ${viewport.width} ${viewport.height}`}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="homeRingGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="38%" stopColor="#14b8a6" />
              <stop offset="70%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          <rect
            className="ring-field-base"
            width={viewport.width}
            height={viewport.height}
          />

          <g className="ring-cluster">
            {RINGS.map((radius, ringIndex) => (
              <path
                key={radius}
                className="ring-line"
                d={buildRingPath(
                  viewport.width / 2,
                  viewport.height / 2,
                  radius,
                  cursor.x,
                  cursor.y,
                  viewport.width,
                  viewport.height
                )}
                style={{
                  opacity: Math.min(0.96, 0.38 + ringIndex * 0.024),
                  strokeWidth: ringIndex % 5 === 0 ? 3.2 : 2.15,
                }}
              />
            ))}
          </g>
        </svg>
      </div>

      <section className="home-content">
        <p className="kicker">AP Psychology Mental Health Project</p>
        <h1 className="home-title">Persistent Depressive Disorder</h1>
        <p className="home-subtitle">
          Chronic depression marked by a low mood that lasts for years and can
          affect motivation, thinking, relationships, and daily functioning.
        </p>

        <nav className="home-actions" aria-label="Project Sections">
          <Link className="action-btn" href="/handout">
            Handout
          </Link>
          <Link className="action-btn action-btn-alt" href="/game">
            Game
          </Link>
        </nav>
      </section>
      <p className="home-credits">Milan Shah, Annie Ribas, Daniel Gao</p>
    </main>
  );
}
