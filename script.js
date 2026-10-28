// Scroll-driven reveal for each greeting card.
const cards = document.querySelectorAll('.greeting-card');
const farewell = document.querySelector('.farewell');
const progress = document.querySelector('.scroll-progress');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-hidden');
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

cards.forEach((card) => {
  card.classList.add('is-hidden');
  observer.observe(card);
});

// Fade in the farewell when it enters view.
const farewellObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.3 }
);

farewell.style.opacity = '0';
farewell.style.transform = 'translateY(30px)';
farewell.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
farewellObserver.observe(farewell);

// Scroll progress bar.
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (scrolled / total) * 100 : 0;
  progress.style.width = pct + '%';
}, { passive: true });