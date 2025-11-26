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
    const MAX_SIZE = 90; // Maximum icon size in pixels
    const INFLUENCE_RANGE = 180; // Range of influence in pixels

    const animateIcons = (mouseX: number) => {
      const dockRect = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const iconRect = icon.getBoundingClientRect();
        const iconCenterX = iconRect.left + iconRect.width / 2 - dockRect.left;
        const distance = Math.abs(mouseX - iconCenterX);

        // Calculate scale using a Gaussian-like curve for smoother effect
        let scale = 1;
        let normalizedDistance = 0;
        if (distance < INFLUENCE_RANGE) {
          normalizedDistance = distance / (INFLUENCE_RANGE / 2);
          const influence = Math.exp(-(normalizedDistance ** 2));
          scale = 1 + influence * ((MAX_SIZE - BASE_SIZE) / BASE_SIZE);
        }

        gsap.to(icon, {
          scale: scale,
          y:
            distance < INFLUENCE_RANGE
              ? -5 * Math.exp((-normalizedDistance) ** 2)
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
          duration: 0.5,
          ease: "back.out(2)",
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
