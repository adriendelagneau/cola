"use client";

import React, { useRef, useEffect } from "react";
import Matter from "matter-js";

const MatterMarquee: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<HTMLDivElement>(null);

  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  const sponsorImages = [
    "/sponsorts/music/t1.png",
    "/sponsorts/music/t2.png",
    "/sponsorts/music/t3.png",
    "/sponsorts/music/t4.png",
  ];
  const originalImageSize = 200;

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
    const spreadDeg = 20;
    const baseAngleDeg = -90;
    const speedFactor = Math.min(scene.offsetWidth, scene.offsetHeight) * 0.008;

    const radius = Math.min(scene.offsetWidth, scene.offsetHeight) * 0.055;

    for (let i = 0; i < total; i++) {
      setTimeout(() => {
        const angleDeg =
          baseAngleDeg + (Math.random() * spreadDeg * 2 - spreadDeg);
        const angleRad = (angleDeg * Math.PI) / 180;

        const velocity = {
          x: Math.cos(angleRad) * speedFactor,
          y: Math.sin(angleRad) * speedFactor,
        };

        const image =
          sponsorImages[Math.floor(Math.random() * sponsorImages.length)];

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
    const initMatter = () => {
      const scene = sceneRef.current;
      const can = canRef.current;
      if (!scene || !can) return;

      const width = scene.offsetWidth;
      const height = scene.offsetHeight;

      // CLEANUP old engine if exists
      if (engineRef.current) {
        Matter.Render.stop(renderRef.current!);
        Matter.Runner.stop(runnerRef.current!);
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
        renderRef.current?.canvas.remove();
      }

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

      // WALLS
      const walls = [
        Matter.Bodies.rectangle(width / 2, height + 25, width, 50, {
          isStatic: true,
        }),
        Matter.Bodies.rectangle(-25, height / 2, 50, height, {
          isStatic: true,
        }),
        Matter.Bodies.rectangle(width + 25, height / 2, 50, height, {
          isStatic: true,
        }),
        Matter.Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true }),
      ];
      Matter.World.add(engine.world, walls);

      // CAN COLLIDER
      const rectCan = can.getBoundingClientRect();
      const sceneRect = scene.getBoundingClientRect();
      const canBody = Matter.Bodies.rectangle(
        rectCan.left - sceneRect.left + rectCan.width / 2,
        rectCan.top - sceneRect.top + rectCan.height / 2,
        rectCan.width,
        rectCan.height,
        { isStatic: true, render: { visible: false } }
      );
      Matter.World.add(engine.world, canBody);
    };

    initMatter(); // initial load

    const resizeObserver = new ResizeObserver(() => {
      initMatter(); // re-init on resize
    });

    if (sceneRef.current) resizeObserver.observe(sceneRef.current);

    return () => {
      resizeObserver.disconnect();
      if (engineRef.current) {
        Matter.Render.stop(renderRef.current!);
        Matter.Runner.stop(runnerRef.current!);
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
        renderRef.current?.canvas.remove();
      }
    };
  }, []);

  return (
    <div className="relative flex h-full w-full justify-center">
      {/* BUTTON */}
      <button
        className="absolute top-4 z-10 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={fireCannon}
      >
        Open can
      </button>

      {/* SCENE */}
      <div ref={sceneRef} className="relative h-full w-full overflow-hidden">
        {/* CAN */}
        <div
          ref={canRef}
          className="pointer-events-none absolute bottom-0 left-1/2 z-20 -translate-x-1/2 transform"
        >
          <img src="/can.png" className="can-image block w-30 xl:w-60" />
        </div>
      </div>
    </div>
  );
};

export default MatterMarquee;
