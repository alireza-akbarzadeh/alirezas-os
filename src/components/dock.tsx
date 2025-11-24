import { Draggable } from "gsap/Draggable";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DockIcon } from "./dock-icon";
import { dockApps } from "@/constants";

// Register GSAP plugin
gsap.registerPlugin(Draggable);

export default function Dock() {
  const dockRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");
    if (icons.length === 0) return;

    const BASE_SIZE = 56; // Base icon size in pixels
    const MAX_SIZE = 80; // Maximum icon size in pixels
    const INFLUENCE_RANGE = 150; // Range of influence in pixels

    const animateIcons = (mouseX: number) => {
      const dockRect = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const iconRect = icon.getBoundingClientRect();
        const iconCenterX = iconRect.left + iconRect.width / 2 - dockRect.left;
        const distance = Math.abs(mouseX - iconCenterX);

        // Calculate scale based on distance (closer = bigger)
        let scale = 1;
        if (distance < INFLUENCE_RANGE) {
          const influence = 1 - distance / INFLUENCE_RANGE;
          scale = 1 + (influence * (MAX_SIZE - BASE_SIZE)) / BASE_SIZE;
        }

        gsap.to(icon, {
          scale: scale,
          y:
            distance < INFLUENCE_RANGE
              ? -10 * (1 - distance / INFLUENCE_RANGE)
              : 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dockRect = dock.getBoundingClientRect();
      const mouseX = e.clientX - dockRect.left;
      animateIcons(mouseX);
    };

    const handleMouseLeave = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
      });
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map((app) => (
          <DockIcon key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}
