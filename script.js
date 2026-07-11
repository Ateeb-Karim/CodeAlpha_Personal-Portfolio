document.addEventListener('DOMContentLoaded', () => {
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
    const mainNavigation = document.getElementById("mainNav");
    window.addEventListener("scroll", () => {
        mainNavigation.classList.toggle("scrolled", window.scrollY > 60);
    });
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
                setTimeout(runTypingAnimation, 1500);
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
    setTimeout(runTypingAnimation, 700);
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
    const scrollRevealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const visibleElement = entry.target;
                const parentContainer = visibleElement.parentElement;
                const transitionSiblings = [
                    ...parentContainer.querySelectorAll(".reveal, .reveal-left, .reveal-right"),
                ];
                const elementIndex = transitionSiblings.indexOf(visibleElement);
                visibleElement.style.transitionDelay = `${elementIndex * 0.08}s`;
                visibleElement.classList.add("visible");
                visibleElement.querySelectorAll(".sb-fill").forEach((skillBar) => {
                    skillBar.style.width = skillBar.dataset.w + "%";
                });
                visibleElement.querySelectorAll("[data-count]").forEach(animateCounter);
                visibleElement.querySelectorAll(".tl-item").forEach((timelineItem, index) => {
                    setTimeout(() => {
                        timelineItem.classList.add("visible");
                    }, index * 150);
                });
                scrollRevealObserver.unobserve(visibleElement);
            });
        },
        { threshold: 0.12 }
    );
    const animatedSections = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    animatedSections.forEach((element) => scrollRevealObserver.observe(element));
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
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((clickedButton) => {
        clickedButton.addEventListener("click", () => {
            filterButtons.forEach((button) => button.classList.remove("active"));
            clickedButton.classList.add("active");

            const selectedFilter = clickedButton.dataset.filter;

            document.querySelectorAll(".project-card").forEach((projectCard) => {
                const projectTags = projectCard.dataset.tags || "";
                const isMatchingFilter = selectedFilter === "all" || projectTags.includes(selectedFilter);

                projectCard.style.opacity = isMatchingFilter ? "1" : "0";
                projectCard.style.transform = isMatchingFilter ? "" : "scale(0.95)";
                projectCard.style.pointerEvents = isMatchingFilter ? "" : "none";

                setTimeout(() => {
                    projectCard.classList.toggle("hidden", !isMatchingFilter);
                }, 300);
            });
        });
    });
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
})
