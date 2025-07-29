gsap.registerPlugin(ScrollTrigger);

// All <p> elements
const paragraphs = gsap.utils.toArray("p");

paragraphs.forEach((p) => {
    // GSAP animation for "pop up" on scroll (initial appearance)
    gsap.from(p, {
        opacity: 0,
        y: 50,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: p,
            start: "top 90%",
            toggleActions: "play none none none",
        }
    });

    // GSAP animation for hover effect (existing logic)
    p.addEventListener('mouseenter', () => {
        gsap.to(p, {
            color: "#FF4500",
            fontSize: "calc(var(--original-font-size) * 1.7)",
            duration: 0.3,
            ease: "power2.out"
        });
    });

    p.addEventListener('mouseleave', () => {
        gsap.to(p, {
            color: "inherit",
            fontSize: "var(--original-font-size)",
            duration: 0.3,
            ease: "power1.out"
        });
    });

    // Store the original font size as a CSS variable for easy reversion
    p.style.setProperty('--original-font-size', getComputedStyle(p).fontSize);

    // --- Continuous Swinging Movement on Scroll (MADE FASTER) ---
    gsap.to(p, {
        rotation: 5,
        x: 10,
        duration: 0.2, // Significantly reduced duration for much faster swing (was 0.5)
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.02, // Reduced stagger further for a more unified, faster effect (was 0.05)
        scrollTrigger: {
            trigger: p,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5, // Slightly reduced scrub value can make it feel more reactive
                               // (true or 0 means no lag, higher values add lag)
        }
    });
});

// --- elements
const footer = document.querySelector('.footer-section');
const body = document.body; // Reference to the body element

if (footer && body) { // Ensure both elements exist
    // Create a GSAP timeline for the footer animation
    const footerTimeline = gsap.timeline({
        repeat: -1, // Repeat indefinitely
        yoyo: true,
        defaults: {
            duration: 0.5,
            ease: "power1.inOut"
        }
    });

    // Create a separate GSAP timeline for the body background animation
    const bodyTimeline = gsap.timeline({
        repeat: -1, // Repeat indefinitely

        defaults: {
            duration: 0.5, // Matches footer duration for synchronization
            ease: "power1.inOut"
        }
    });

    // Footer animation sequence (blink and color change)
    footerTimeline
        // Start black, fade out
        .to(footer, { backgroundColor: "black", opacity: 0.2 })
        // Fade in to blue
        .to(footer, { backgroundColor: "blue", opacity: 1 })
        // Fade out to red
        .to(footer, { backgroundColor: "red", opacity: 0.2 })
        // Fade in to black
        .to(footer, { backgroundColor: "black", opacity: 1 });

    bodyTimeline
        .to(body, { backgroundColor: "white" })     // Opposite of black
        .to(body, { backgroundColor: "#FFD700" })   // Gold/yellow, contrast to blue
        .to(body, { backgroundColor: "#5509e4ff" }) // A shade of purple/indigo, contrast to red
        .to(body, { backgroundColor: "white" });     // Back to white for black footer
        }