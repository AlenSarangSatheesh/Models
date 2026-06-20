import React, { useRef } from 'react';
import { useScroll, Scroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Overlay() {
  const scroll = useScroll();
  
  // Refs for each text section to animate them
  const text1 = useRef();
  const text2 = useRef();
  const text3 = useRef();
  const text4 = useRef();
  const text5 = useRef();
  const text6 = useRef();

  useFrame(() => {
    // scroll.range(start, distance) returns 0-1 within that range
    // scroll.curve(start, distance) returns 0-1-0 (fades in then out)
    
    if (text1.current) {
      text1.current.style.opacity = scroll.curve(0, 0.2);
      text1.current.style.transform = `translateY(${100 - scroll.curve(0, 0.2) * 100}px)`;
    }
    if (text2.current) {
      text2.current.style.opacity = scroll.curve(0.2, 0.2);
      text2.current.style.transform = `translateY(${100 - scroll.curve(0.2, 0.2) * 100}px)`;
    }
    if (text3.current) {
      text3.current.style.opacity = scroll.curve(0.4, 0.2);
      text3.current.style.transform = `translateY(${100 - scroll.curve(0.4, 0.2) * 100}px)`;
    }
    if (text4.current) {
      text4.current.style.opacity = scroll.curve(0.6, 0.2);
      text4.current.style.transform = `translateY(${100 - scroll.curve(0.6, 0.2) * 100}px)`;
    }
    if (text5.current) {
      text5.current.style.opacity = scroll.curve(0.8, 0.15);
      text5.current.style.transform = `translateY(${100 - scroll.curve(0.8, 0.15) * 100}px)`;
    }
    if (text6.current) {
      // The final product reveal stays visible until the end
      const progress = scroll.range(0.9, 0.1);
      text6.current.style.opacity = progress;
      text6.current.style.transform = `translateY(${100 - progress * 100}px)`;
    }
  });

  return (
    <Scroll html style={{ width: '100%' }}>
      <div className="scroll-overlay">
        
        {/* Scene 1: Dawn */}
        <section className="scene-section">
          <div ref={text1} className="text-content" style={{ opacity: 0 }}>
            <h1>Every drop begins in nature.</h1>
          </div>
        </section>

        {/* Scene 2: Pollination */}
        <section className="scene-section">
          <div ref={text2} className="text-content" style={{ opacity: 0 }}>
            <h1>Bees collect nature's finest nectar.</h1>
          </div>
        </section>

        {/* Scene 3: The Hive */}
        <section className="scene-section">
          <div ref={text3} className="text-content" style={{ opacity: 0 }}>
            <h1>Inside the hive, nature performs its miracle.</h1>
          </div>
        </section>

        {/* Scene 4: The Golden River & Harvest */}
        <section className="scene-section">
          <div ref={text4} className="text-content" style={{ opacity: 0 }}>
            <h1>Harvested with care. Preserved with respect.</h1>
          </div>
        </section>

        {/* Scene 5: Extraction & Packaging */}
        <section className="scene-section">
          <div ref={text5} className="text-content" style={{ opacity: 0 }}>
            <h1>Pure honey. Nothing else.</h1>
          </div>
        </section>

        {/* Scene 6: Product Reveal */}
        <section className="scene-section" style={{ height: '200vh' }}>
          <div ref={text6} className="text-content" style={{ pointerEvents: 'auto', opacity: 0 }}>
            <h1 style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>Aurea</h1>
            <p style={{ marginBottom: '2rem' }}>100% Pure Organic Honey</p>
            <div>
              <a href="#" className="cta-button">Order Pure Honey</a>
              <a href="#" className="cta-button cta-secondary">Explore Our Story</a>
            </div>
          </div>
        </section>

      </div>
    </Scroll>
  );
}
