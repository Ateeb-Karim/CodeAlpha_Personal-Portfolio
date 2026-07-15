document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD

    // cursor hover state for interactive elements
    const hoverEls = document.querySelectorAll("a, button, .project-card, .social-card, .skill-tag, .filter-btn");
    hoverEls.forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("hovering"));
    });

    // navbar bg on scroll
    const nav = document.getElementById("mainNav");
    window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 60);
    });

    // mobile menu toggle
    const navLinks = document.getElementById("navLinks");
    document.getElementById("hamburger").addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => navLinks.classList.remove("open"));
    });

    // typing effect for hero role text
    const roles = ["Frontend Developer", "React Developer", "UI Builder", "JavaScript Dev", "Problem Solver"];
    let roleIdx = 0, charIdx = 0, deleting = false;
    const typeTarget = document.getElementById("typeTarget");

    function typeLoop() {
        const word = roles[roleIdx];
        if (!deleting) {
            charIdx++;
            typeTarget.textContent = word.slice(0, charIdx);
            if (charIdx === word.length) {
                deleting = true;
                setTimeout(typeLoop, 1500);
                return;
            }
        } else {
            charIdx--;
            typeTarget.textContent = word.slice(0, charIdx);
            if (charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
            }
        }
        setTimeout(typeLoop, deleting ? 50 : 80);
    }
    setTimeout(typeLoop, 700);

    // simple count-up animation, used by [data-count] elements if any
    function countUp(el) {
        const target = Number(el.dataset.count);
        if (!target) return;
        let cur = 0;
        const step = Math.ceil(target / 40);
        const iv = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = cur;
            if (cur >= target) clearInterval(iv);
        }, 35);
    }

    // scroll reveal for .reveal / .reveal-left / .reveal-right blocks
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const siblings = [...el.parentElement.querySelectorAll(".reveal, .reveal-left, .reveal-right")];
            const idx = siblings.indexOf(el);
            el.style.transitionDelay = `${idx * 0.08}s`;
            el.classList.add("visible");

            el.querySelectorAll(".sb-fill").forEach(bar => {
                bar.style.width = bar.dataset.w + "%";
            });
            el.querySelectorAll("[data-count]").forEach(countUp);
            el.querySelectorAll(".tl-item").forEach((item, i) => {
                setTimeout(() => item.classList.add("visible"), i * 150);
            });

            revealObserver.unobserve(el);
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => revealObserver.observe(el));

    // skill bar fill on scroll into view
    document.querySelectorAll(".sb-fill").forEach(bar => {
        const section = bar.closest("section");
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                bar.style.width = bar.dataset.w + "%";
                obs.disconnect();
            }
        }, { threshold: 0.15 });
        obs.observe(section);
    });

    // timeline items fade in one by one
    document.querySelectorAll(".tl-item").forEach((item, i) => {
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => item.classList.add("visible"), i * 150);
                obs.disconnect();
            }
        }, { threshold: 0.2 });
        obs.observe(item);
    });

    // project filter buttons
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            document.querySelectorAll(".project-card").forEach(card => {
                const tags = card.dataset.tags || "";
                const match = filter === "all" || tags.includes(filter);

                card.style.opacity = match ? "1" : "0";
                card.style.transform = match ? "" : "scale(0.95)";
                card.style.pointerEvents = match ? "" : "none";
                setTimeout(() => card.classList.toggle("hidden", !match), 300);
            });
        });
    });

    // highlight active nav link based on section in view
    const sections = document.querySelectorAll("section[id]");
    const navAnchors = document.querySelectorAll(".nav-links a:not(.nav-cta)");
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(a => {
                    a.style.color = a.getAttribute("href") === "#" + entry.target.id ? "var(--text)" : "";
                });
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => sectionObserver.observe(s));

    // ripple click effect on the "Launch Project" buttons
    document.querySelectorAll("[data-launch]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.2;

            const ripple = document.createElement("span");
            ripple.className = "ripple";
            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
            ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 650);
        });
    });

});
=======
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
>>>>>>> 3bb55ec55a2bb8c0c9193c2ac2b171f9fbd6520d
