"use client";

import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices for 60fps mobile performance
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let hover = false;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let animId: number;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    function loop() {
      if (!hover && cursor) {
        cursorPos.x += (mousePos.x - cursorPos.x) * 0.2;
        cursorPos.y += (mousePos.y - cursorPos.y) * 0.2;
        cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`;
      }
      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);

    const interactiveItems = document.querySelectorAll("[data-cursor]");
    const mouseOverHandlers: Array<{ elem: HTMLElement; over: EventListener; out: EventListener }> = [];

    interactiveItems.forEach((item) => {
      const element = item as HTMLElement;

      const onMouseOver = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          cursor.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };

      const onMouseOut = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };

      element.addEventListener("mouseover", onMouseOver);
      element.addEventListener("mouseout", onMouseOut);
      mouseOverHandlers.push({ elem: element, over: onMouseOver, out: onMouseOut });
    });

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", handleMouseMove);
      mouseOverHandlers.forEach(({ elem, over, out }) => {
        elem.removeEventListener("mouseover", over);
        elem.removeEventListener("mouseout", out);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
