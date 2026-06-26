/**
 * Custom Cursor Hover Effects
 * Adds a class to the body to animate custom cursor rings on interactive elements
 */
const interactiveElements = document.querySelectorAll(
    "a, button, .project-card, .social-card, .skill-tag, .filter-btn"
);

interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
        document.body.classList.add("hovering");
    });
    element.addEventListener("mouseleave", () => {
        document.body.classList.remove("hovering");
    });
});

/**
 * Navigation Bar Scroll Effect
 * Toggles a compact layout styling when the user scrolls past the hero section
 */
const mainNavigation = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
    mainNavigation.classList.toggle("scrolled", window.scrollY > 60);
});

/**
 * Mobile Mobile Navigation Menu
 * Handles opening, closing, and automatic closing when link anchors are clicked
 */
const hamburgerButton = document.getElementById("hamburger");
const navigationLinksContainer = document.getElementById("navLinks");

hamburgerButton.addEventListener("click", () => {
    navigationLinksContainer.classList.toggle("open");
});

const individualNavLinks = document.querySelectorAll(".nav-links a");

individualNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navigationLinksContainer.classList.remove("open");
    });
});

/**
 * Auto-Typing Hero Text Animation
 * Cycles through individual professional roles seamlessly
 */
const rolesList = [
    "Frontend Developer",
    "React Developer",
    "UI Builder",
    "JavaScript Dev",
    "Problem Solver",
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeletingText = false;

const typingTargetElement = document.getElementById("typeTarget");

function runTypingAnimation() {
    const currentWord = rolesList[currentRoleIndex];

    if (!isDeletingText) {
        currentCharIndex++;
        typingTargetElement.textContent = currentWord.slice(0, currentCharIndex);

        if (currentCharIndex === currentWord.length) {
            isDeletingText = true;
            setTimeout(runTypingAnimation, 1500); // Wait before starting to erase
            return;
        }
    } else {
        currentCharIndex--;
        typingTargetElement.textContent = currentWord.slice(0, currentCharIndex);

        if (currentCharIndex === 0) {
            isDeletingText = false;
            currentRoleIndex = (currentRoleIndex + 1) % rolesList.length;
        }
    }

    const typingSpeed = isDeletingText ? 50 : 80;
    setTimeout(runTypingAnimation, typingSpeed);
}

// Kick off typing effect after an initial delay
setTimeout(runTypingAnimation, 700);

/**
 * Animated Counter Utility
 * Incrementally counts upward to a specified metric value
 */
function animateCounter(element) {
    const targetValue = Number(element.dataset.count);
    if (!targetValue) return;

    let currentValue = 0;
    const incrementStep = Math.ceil(targetValue / 40);

    const counterInterval = setInterval(() => {
        currentValue = Math.min(currentValue + incrementStep, targetValue);
        element.textContent = currentValue;

        if (currentValue >= targetValue) {
            clearInterval(counterInterval);
        }
    }, 35);
}

/**
 * Global Scroll Reveal Framework
 * Coordinates multi-element entries (Skill Bars, Counters, Timelines)
 */
const scrollRevealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const visibleElement = entry.target;
            const parentContainer = visibleElement.parentElement;

            // Generate stagger delays natively based on the DOM child sequence
            const transitionSiblings = [
                ...parentContainer.querySelectorAll(".reveal, .reveal-left, .reveal-right"),
            ];
            const elementIndex = transitionSiblings.indexOf(visibleElement);

            visibleElement.style.transitionDelay = `${elementIndex * 0.08}s`;
            visibleElement.classList.add("visible");

            // Handle nested Skill Bars
            visibleElement.querySelectorAll(".sb-fill").forEach((skillBar) => {
                skillBar.style.width = skillBar.dataset.w + "%";
            });

            // Handle nested Statistics Counters
            visibleElement.querySelectorAll("[data-count]").forEach(animateCounter);

            // Handle nested Journey Timelines
            visibleElement.querySelectorAll(".tl-item").forEach((timelineItem, index) => {
                setTimeout(() => {
                    timelineItem.classList.add("visible");
                }, index * 150);
            });

            // Stop observing once animation has executed successfully
            scrollRevealObserver.unobserve(visibleElement);
        });
    },
    { threshold: 0.12 }
);

const animatedSections = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
animatedSections.forEach((element) => scrollRevealObserver.observe(element));

/**
 * Fallback Observers
 * Ensures specific child blocks animate accurately even if standard grids break container boundaries
 */
const skillBars = document.querySelectorAll(".sb-fill");
skillBars.forEach((skillBar) => {
    const parentSection = skillBar.closest("section");
    const skillObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                skillBar.style.width = skillBar.dataset.w + "%";
                skillObserver.disconnect();
            }
        },
        { threshold: 0.15 }
    );
    skillObserver.observe(parentSection);
});

const individualTimelineItems = document.querySelectorAll(".tl-item");
individualTimelineItems.forEach((timelineItem, index) => {
    const timelineObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    timelineItem.classList.add("visible");
                }, index * 150);
                timelineObserver.disconnect();
            }
        },
        { threshold: 0.2 }
    );
    timelineObserver.observe(timelineItem);
});

/**
 * Portfolio Project Filters
 * Handles animated shuffling, layout fading, and display hidden statuses
 */
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((clickedButton) => {
    clickedButton.addEventListener("click", () => {
        // Toggle Active Classes on Buttons
        filterButtons.forEach((button) => button.classList.remove("active"));
        clickedButton.add("active");

        const selectedFilter = clickedButton.dataset.filter;

        document.querySelectorAll(".project-card").forEach((projectCard) => {
            const projectTags = projectCard.dataset.tags || "";
            const isMatchingFilter = selectedFilter === "all" || projectTags.includes(selectedFilter);

            projectCard.style.opacity = isMatchingFilter ? "1" : "0";
            projectCard.style.transform = isMatchingFilter ? "" : "scale(0.95)";
            projectCard.style.pointerEvents = isMatchingFilter ? "" : "none";

            // Wait for css animations to wrap up before changing structural visibility
            setTimeout(() => {
                projectCard.classList.toggle("hidden", !isMatchingFilter);
            }, 300);
        });
    });
});

/**
 * Dynamic Scroll-Spy Links
 * Updates active states across headers based on user window position
 */
const pageContentSections = document.querySelectorAll("section[id]");
const localNavigationAnchors = document.querySelectorAll(".nav-links a:not(.nav-cta)");

const sectionIntersectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                localNavigationAnchors.forEach((anchor) => {
                    const isCurrentActiveSection = anchor.getAttribute("href") === "#" + entry.target.id;
                    anchor.style.color = isCurrentActiveSection ? "var(--text)" : "";
                });
            }
        });
    },
    { threshold: 0.4 }
);

pageContentSections.forEach((section) => sectionIntersectionObserver.observe(section));