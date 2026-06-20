"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const initAnimations = () => {
      // Hero Animation
      gsap.from('.hero-img', {
        scale: 1.5,
        duration: 2,
        ease: 'power4.out',
        delay: 0.2
      });

      gsap.to('.hero-image-wrapper', {
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 100,
        opacity: 0.2
      });

      // Text Splitting & Reveals
      const splitTexts = document.querySelectorAll('.split-text');
      splitTexts.forEach(text => {
        text.setAttribute('aria-label', (text as HTMLElement).innerText);
        const split = new SplitType(text as HTMLElement, { types: 'words,chars' });
        split.chars?.forEach(char => char.setAttribute('aria-hidden', 'true'));
        
        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: text,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.02,
          ease: 'power4.out'
        });
      });

      const revealTexts = document.querySelectorAll('.reveal-text');
      revealTexts.forEach(text => {
        gsap.from(text, {
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out'
        });
      });

      // Image Parallax
      const parallaxContainers = document.querySelectorAll('.parallax-container');
      parallaxContainers.forEach(container => {
        const img = container.querySelector('.parallax-img');
        gsap.to(img, {
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          },
          y: '-20%',
          ease: 'none'
        });
      });

      // Marquee Animation
      const marqueeInner = document.querySelector('.marquee-inner');
      if (marqueeInner) {
        gsap.to(marqueeInner, {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: 'none'
        });
      }

      ScrollTrigger.refresh();
    };

    // Wait for fonts to be ready before splitting text
    document.fonts.ready.then(initAnimations);

  }, { scope: container });

  return (
    <main id="main-content" ref={container}>
        {/* Hero Section */}
        <section className="hero">
            <div className="hero-image-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop" className="hero-img" alt="Stunning A-frame cabin in a snowy landscape at twilight" fetchPriority="high" />
            </div>
            <div className="hero-content">
                <p className="hero-subtitle split-text">Quiet Luxury</p>
                <h1 className="hero-title split-text">Elevate Your<br/>Nature Escape</h1>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
            <div className="about-grid">
                <div className="about-left">
                    <h2 className="section-title split-text">A Symphony of<br/><em>Wood</em>, <em>Glass</em>,<br/>and <em>Silence</em>.</h2>
                </div>
                <div className="about-right">
                    <p className="body-text reveal-text">
                        Aura is not just a place to stay; it&apos;s a recalibration. Our architectural A-frame cabins are meticulously crafted to respect their environment while providing uncompromising comfort.
                    </p>
                    <div className="about-image-wrapper parallax-container">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1888&auto=format&fit=crop" className="parallax-img" alt="Interior design details" loading="lazy" />
                    </div>
                </div>
            </div>
        </section>

        {/* Cabins Section */}
        <section id="cabins" className="cabins">
            <div className="cabins-header">
                <h2 className="massive-title split-text">Sanctuary</h2>
            </div>
            
            <div className="cabins-list">
                <article className="cabin-row">
                    <div className="cabin-info">
                        <p className="cabin-meta">01 &mdash; Couples</p>
                        <h3 className="cabin-title split-text">The Canopy</h3>
                        <p className="cabin-desc reveal-text">An intimate retreat elevated among the trees, featuring a private stargazing deck.</p>
                        <button className="link-with-arrow magnetic" data-strength="20">Discover <span aria-hidden="true">→</span></button>
                    </div>
                    <div className="cabin-image parallax-container">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop" className="parallax-img" alt="The Canopy Cabin" loading="lazy" />
                    </div>
                </article>

                <article className="cabin-row reverse">
                    <div className="cabin-info">
                        <p className="cabin-meta">02 &mdash; Signature</p>
                        <h3 className="cabin-title split-text">The Grand</h3>
                        <p className="cabin-desc reveal-text">Our iconic structure with floor-to-ceiling glass walls and a cedar hot tub.</p>
                        <button className="link-with-arrow magnetic" data-strength="20">Discover <span aria-hidden="true">→</span></button>
                    </div>
                    <div className="cabin-image parallax-container">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop" className="parallax-img" alt="The Grand A-Frame" loading="lazy" />
                    </div>
                </article>
            </div>
        </section>

        {/* Marquee Section */}
        <section className="marquee-section">
            <div className="marquee">
                <div className="marquee-inner flex">
                    <span className="whitespace-nowrap pr-8">Disconnect to reconnect &mdash; Breathe &mdash; Wander &mdash; </span>
                    <span className="whitespace-nowrap pr-8">Disconnect to reconnect &mdash; Breathe &mdash; Wander &mdash; </span>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="footer">
            <div className="footer-content">
                <h2 className="footer-title split-text">Ready to escape?</h2>
                <button className="btn btn-primary btn-large magnetic" data-strength="50">Book Your Stay</button>
            </div>
            <div className="footer-bottom">
                <a href="#" className="logo text-white magnetic" data-strength="10">AURA</a>
                <p>&copy; 2026 Aura Resort.</p>
            </div>
        </footer>
    </main>
  );
}
