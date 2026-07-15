document.addEventListener("DOMContentLoaded", () => {
  const hoverElements = document.querySelectorAll(
    "a, button, .project-card, .social-card, .skill-tag, .filter-btn",
  );
  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () =>
      document.body.classList.add("hovering"),
    );
    element.addEventListener("mouseleave", () =>
      document.body.classList.remove("hovering"),
    );
  });
  const nav = document.getElementById("mainNav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  });
  const navLinks = document.getElementById("navLinks");
  document.getElementById("hamburger").addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
  const roles = [
    "Frontend Developer",
    "React Developer",
    "UI Builder",
    "JavaScript Dev",
    "Problem Solver",
  ];
  let roleIdx = 0,
    charIdx = 0,
    deleting = false;
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
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = [
          ...el.parentElement.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right",
          ),
        ];
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = `${idx * 0.08}s`;
        el.classList.add("visible");

        el.querySelectorAll(".sb-fill").forEach((bar) => {
          bar.style.width = bar.dataset.w + "%";
        });
        el.querySelectorAll("[data-count]").forEach(countUp);
        el.querySelectorAll(".tl-item").forEach((item, i) => {
          setTimeout(() => item.classList.add("visible"), i * 150);
        });

        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el) => revealObserver.observe(el));
  document.querySelectorAll(".sb-fill").forEach((bar) => {
    const section = bar.closest("section");
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bar.style.width = bar.dataset.w + "%";
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(section);
  });
  document.querySelectorAll(".tl-item").forEach((item, i) => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => item.classList.add("visible"), i * 150);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(item);
  });
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      document.querySelectorAll(".project-card").forEach((card) => {
        const tags = card.dataset.tags || "";
        const match = filter === "all" || tags.includes(filter);

        card.style.opacity = match ? "1" : "0";
        card.style.transform = match ? "" : "scale(0.95)";
        card.style.pointerEvents = match ? "" : "none";
        setTimeout(() => card.classList.toggle("hidden", !match), 300);
      });
    });
  });
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a:not(.nav-cta)");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => {
            a.style.color =
              a.getAttribute("href") === "#" + entry.target.id
                ? "var(--text)"
                : "";
          });
        }
      });
    },
    { threshold: 0.4 },
  );
  sections.forEach((s) => sectionObserver.observe(s));
  document.querySelectorAll("[data-launch]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
});
