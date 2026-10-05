const navLinks = [...document.querySelectorAll(".site-nav__link")];
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const active = link.hash === `#${sectionId}`;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => setActiveNav(link.hash.slice(1)));
});

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveNav(visible.target.id);
    },
    { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.4, 0.7] },
  );
  navSections.forEach((section) => sectionObserver.observe(section));
}

if (window.location.hash) setActiveNav(window.location.hash.slice(1));

const dehydrationCarousel = document.querySelector("[data-dehydration-carousel]");
if (dehydrationCarousel) {
  const slides = [...dehydrationCarousel.querySelectorAll("[data-carousel-slide]")];
  const status = dehydrationCarousel.querySelector("[data-carousel-status]");
  let activeSlide = 0;

  function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== activeSlide;
    });
    status.textContent = `${activeSlide + 1} de ${slides.length}`;
  }

  dehydrationCarousel.querySelector("[data-carousel-previous]").addEventListener("click", () => {
    showSlide(activeSlide - 1);
  });
  dehydrationCarousel.querySelector("[data-carousel-next]").addEventListener("click", () => {
    showSlide(activeSlide + 1);
  });
}

