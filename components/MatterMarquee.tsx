"use client";

import React, { useRef, useEffect } from "react";
import Matter from "matter-js";

const MatterMarquee: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<HTMLDivElement>(null);

  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  // FIRE FUNCTION
 const fireCannon = () => {
  const engine = engineRef.current;
  const scene = sceneRef.current;
  const can = canRef.current;

  if (!engine || !scene || !can) return;

  const rect = can.getBoundingClientRect();
  const sceneRect = scene.getBoundingClientRect();

  const baseX = rect.left - sceneRect.left + rect.width / 2;
  const baseY = rect.top - sceneRect.top + 6;

  const total = 16;
  const spreadDeg = 12;
  const baseAngleDeg = -90; // tir vertical
  const speed = 14;

  const radius = 24; // rayon physique
  const originalImageSize = 200; // tes images sont 200x200

  const sponsorImages = [
    "/sponsorts/music/t1.png",
    "/sponsorts/music/t1.png",
    "/sponsorts/music/t1.png",
    "/sponsorts/music/t1.png",
  ];

  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const angleDeg =
        baseAngleDeg + (Math.random() * spreadDeg * 2 - spreadDeg);
      const angleRad = (angleDeg * Math.PI) / 180;

      const velocity = {
        x: Math.cos(angleRad) * speed,
        y: Math.sin(angleRad) * speed,
      };

      const image = sponsorImages[Math.floor(Math.random() * sponsorImages.length)];

      const circle = Matter.Bodies.circle(baseX, baseY, radius, {
        restitution: 0.7,
        friction: 0.00005,
        frictionAir: 0.01,
        density: 0.01,
        render: {
          sprite: {
            texture: image,
            xScale: (radius * 2) / originalImageSize,
            yScale: (radius * 2) / originalImageSize,
          },
        },
      });

      Matter.Body.setVelocity(circle, velocity);
      Matter.Body.setAngularVelocity(circle, (Math.random() - 0.5) * 0.4);

      Matter.World.add(engine.world, circle);
    }, i * 70);
  }
};

  useEffect(() => {
    const scene = sceneRef.current;
    const can = canRef.current;

    if (!scene || !can) return;

    const width = scene.offsetWidth;
    const height = scene.offsetHeight;

    // ENGINE
    const engine = Matter.Engine.create();
    engine.gravity.y = 1;
    engineRef.current = engine;

    // RENDER
    const render = Matter.Render.create({
      element: scene,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    renderRef.current = render;
    Matter.Render.run(render);

    // RUNNER
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // WALLS (container boundaries)
    const walls = [
      // floor
      Matter.Bodies.rectangle(width / 2, height + 25, width, 50, {
        isStatic: true,
      }),

      // left
      Matter.Bodies.rectangle(-25, height / 2, 50, height, {
        isStatic: true,
      }),

      // right
      Matter.Bodies.rectangle(width + 25, height / 2, 50, height, {
        isStatic: true,
      }),

      // ceiling
      Matter.Bodies.rectangle(width / 2, -25, width, 50, {
        isStatic: true,
      }),
    ];

    Matter.World.add(engine.world, walls);

    // CAN COLLIDER
    const rect = can.getBoundingClientRect();
    const sceneRect = scene.getBoundingClientRect();

    const canBody = Matter.Bodies.rectangle(
      rect.left - sceneRect.left + rect.width / 2,
      rect.top - sceneRect.top + rect.height / 2,
      rect.width,
      rect.height,
      {
        isStatic: true,
        render: {
          visible: false,
        },
      },
    );

    Matter.World.add(engine.world, canBody);

    // CLEANUP
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);

      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div className="matter-wrapper">
      {/* BUTTON */}
      <button className="cannon-button" onClick={fireCannon}>
        Open can
      </button>

      {/* SCENE */}
      <div ref={sceneRef} className="matter-scene">
        {/* CAN */}
        <div ref={canRef} className="can-container">
          <img src="/can.png" className="can-image" />
        </div>
      </div>
    </div>
  );
};

export default MatterMarquee;
