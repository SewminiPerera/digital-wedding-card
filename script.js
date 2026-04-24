// ============================
// NAVIGATION SCROLL EFFECT
// ============================
const nav = document.getElementById('nav');
const navLinks = document.getElementById('nav-links');
const burger = document.getElementById('burger');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Burger menu
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ============================
// SMOOTH SCROLL FOR NAV LINKS
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================
// REVEAL ON SCROLL (IntersectionObserver)
// ============================
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

// ============================
// LIVE COUNTDOWN TIMER
// ============================
function updateCountdown() {
  const weddingDate = new Date('2026-07-22T15:30:00');
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '000';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(3, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================
// RSVP FORM SUBMISSION
// ============================
const rsvpForm = document.getElementById('rsvp-form');
const rsvpSuccess = document.getElementById('rsvp-success');
const rsvpSubmit = document.getElementById('rsvp-submit');

rsvpForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('rsvp-name').value.trim();
  const email = document.getElementById('rsvp-email').value.trim();
  const attendance = document.getElementById('rsvp-attendance').value;

  if (!name || !email || !attendance) {
    shakeButton(rsvpSubmit);
    return;
  }

  // Animate button
  rsvpSubmit.textContent = 'Sending...';
  rsvpSubmit.disabled = true;
  rsvpSubmit.style.opacity = '0.7';

  setTimeout(() => {
    rsvpForm.style.transition = 'all 0.5s ease';
    rsvpForm.style.opacity = '0';
    rsvpForm.style.height = rsvpForm.offsetHeight + 'px';
    
    setTimeout(() => {
      rsvpForm.style.display = 'none';
      rsvpSuccess.style.display = 'block';
      rsvpSuccess.style.animation = 'fadeUp 0.8s forwards';
    }, 400);
  }, 1200);
});

function shakeButton(btn) {
  btn.classList.add('shake');
  setTimeout(() => btn.classList.remove('shake'), 600);
}

// Add shake animation CSS dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
  .shake { animation: shake 0.5s ease !important; }
`;
document.head.appendChild(shakeStyle);

// ============================
// PARALLAX ON HERO
// ============================
const heroImg = document.querySelector('.hero-couple');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight && heroImg) {
    heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.25}px)`;
  }
});

// ============================
// CURSOR GLOW EFFECT (Desktop)
// ============================
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: left 0.1s, top 0.1s;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
