document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const magneticElements = document.querySelectorAll('.magnetic');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor
    gsap.ticker.add(() => {
        // Dot follows instantly
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        gsap.set(cursor, { x: cursorX, y: cursorY });

        // Circle follows with lag
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        gsap.set(cursorFollower, { x: followerX, y: followerY });
    });

    // Magnetic logic + hover states
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            cursorFollower.classList.add('active');
            
            const rect = el.getBoundingClientRect();
            const strength = el.getAttribute('data-strength') || 20;
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            
            gsap.to(el, {
                x: x / rect.width * strength,
                y: y / rect.height * strength,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('active');
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    });

    // Add cursor hover state to all standard links/buttons
    const hoverables = document.querySelectorAll('a, button:not(.magnetic)');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('active'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('active'));
    });

    // 3. Text Splitting & Reveals
    document.fonts.ready.then(() => {
        const splitTexts = document.querySelectorAll('.split-text');
        splitTexts.forEach(text => {
            // Accessibility fix: prevent screen readers from reading letter-by-letter
            text.setAttribute('aria-label', text.innerText);
            
            const split = new SplitType(text, { types: 'words, chars' });
            
            split.chars.forEach(char => char.setAttribute('aria-hidden', 'true'));
            
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
        ScrollTrigger.refresh();
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

    // 4. Hero Animation (onload)
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

    // 5. Image Parallax
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
            y: '-20%', // move up as we scroll down
            ease: 'none'
        });
    });

    // 6. Marquee Animation
    const marqueeInner = document.querySelector('.marquee-inner');
    if (marqueeInner) {
        // Clone for infinite loop
        const clone = marqueeInner.cloneNode(true);
        document.querySelector('.marquee').appendChild(clone);

        gsap.to('.marquee-inner', {
            xPercent: -100,
            repeat: -1,
            duration: 20,
            ease: 'none'
        });
    }

    // Ensure GSAP ScrollTrigger recalculates after all images are loaded
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
});
