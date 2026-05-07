/* ========================
   script.js
   Comunidades Inclusivas — VIH/SIDA
   ======================== */

// ── Navbar scroll effect ──────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Hamburger menu ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  // Animate hamburger bars
  const bars = hamburger.querySelectorAll('span');
  if (isOpen) {
    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    bars[1].style.opacity   = '0';
    bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    bars[0].style.transform = '';
    bars[1].style.opacity   = '';
    bars[2].style.transform = '';
  }
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const bars = hamburger.querySelectorAll('span');
    bars[0].style.transform = '';
    bars[1].style.opacity   = '';
    bars[2].style.transform = '';
  });
});

// ── Scroll-reveal (IntersectionObserver) ─────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in the same parent
      const siblings = entry.target.parentElement
        ? [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')]
        : [];
      const delay = siblings.indexOf(entry.target) * 80;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ── Prevention card toggle ────────────────────────
function toggleInfo(btn) {
  const extra = btn.nextElementSibling;
  const isOpen = extra.classList.contains('open');

  // Close all others
  document.querySelectorAll('.prev-extra.open').forEach(el => {
    el.classList.remove('open');
    el.previousElementSibling.textContent = 'Saber más';
  });

  if (!isOpen) {
    extra.classList.add('open');
    btn.textContent = 'Cerrar';
  }
}

// ── Active nav link highlight on scroll ──────────
const sections = document.querySelectorAll('section[id], header[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinksAll.forEach(link => {
        link.classList.toggle(
          'active-link',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '-60px 0px -60px 0px'
});

sections.forEach(sec => sectionObserver.observe(sec));

// ── Add active-link style dynamically ────────────
const style = document.createElement('style');
style.textContent = `
  .nav-link.active-link {
    background: var(--red);
    color: #fff !important;
  }
`;
document.head.appendChild(style);

// ── Smooth ribbon pause on hover ─────────────────
document.querySelectorAll('.hero-ribbon, .footer-ribbon').forEach(ribbon => {
  ribbon.addEventListener('mouseenter', () => {
    ribbon.querySelectorAll('span').forEach(s => {
      s.style.animationPlayState = 'paused';
    });
  });
  ribbon.addEventListener('mouseleave', () => {
    ribbon.querySelectorAll('span').forEach(s => {
      s.style.animationPlayState = 'running';
    });
  });
});

// ── Puebla card click to expand ───────────────────
document.querySelectorAll('.puebla-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('puebla-expanded');
  });
});

// Inline style for expanded state
const pueblaStyle = document.createElement('style');
pueblaStyle.textContent = `
  .puebla-card {
    cursor: pointer;
  }
  .puebla-card.puebla-expanded {
    transform: scale(1.02);
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  }
`;
document.head.appendChild(pueblaStyle);

// ── Console greeting ──────────────────────────────
console.log(
  '%c Comunidades Inclusivas — VIH/SIDA\n%cProyecto Semana Tec con Sentido Humano\nLuis Enrique López Velázquez | A18020179',
  'color: #e63946; font-size: 1.2rem; font-weight: bold;',
  'color: #888; font-size: 0.9rem;'
);
