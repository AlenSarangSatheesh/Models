"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cursorRef.current || !followerRef.current) return;
    
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    let mouseX = 0, mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const ticker = () => {
      cursorX += (mouseX - cursorX) * 0.5;
      cursorY += (mouseY - cursorY) * 0.5;
      gsap.set(cursorRef.current, { x: cursorX, y: cursorY });

      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      gsap.set(followerRef.current, { x: followerX, y: followerY });
    };

    gsap.ticker.add(ticker);

    // Setup magnetic buttons and hoverables
    const addInteractions = () => {
      const magnetics = document.querySelectorAll('.magnetic');
      const hoverables = document.querySelectorAll('a, button:not(.magnetic)');

      magnetics.forEach(el => {
        const h = el as HTMLElement;
        h.addEventListener('mousemove', (e) => {
          followerRef.current?.classList.add('active');
          const rect = h.getBoundingClientRect();
          const strength = parseFloat(h.getAttribute('data-strength') || '20');
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);
          
          gsap.to(h, {
            x: x / rect.width * strength,
            y: y / rect.height * strength,
            duration: 0.5,
            ease: 'power2.out'
          });
        });

        h.addEventListener('mouseleave', () => {
          followerRef.current?.classList.remove('active');
          gsap.to(h, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
      });

      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => followerRef.current?.classList.add('active'));
        el.addEventListener('mouseleave', () => followerRef.current?.classList.remove('active'));
      });
    };

    // Small delay to ensure DOM is ready for querySelectors
    setTimeout(addInteractions, 500);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(ticker);
    };
  });

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}
