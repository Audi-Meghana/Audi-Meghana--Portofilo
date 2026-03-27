

// ---- CUSTOM CURSOR ----
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', e => {
  cursorDot.style.left  = e.clientX + 'px';
  cursorDot.style.top   = e.clientY + 'px';
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .glass-card, .project-card, .skill-chip').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
});

// ---- CANVAS ANIMATED BG ----
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');
let W, H, nodes = [], RAF;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Node {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.r  = Math.random() * 2 + 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
}

for (let i = 0; i < 80; i++) nodes.push(new Node());

function drawConnections() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx   = nodes[i].x - nodes[j].x;
      const dy   = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(0,245,212,${0.06 * (1 - dist/120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function drawNodes() {
  nodes.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,245,212,0.3)';
    ctx.fill();
  });
}

function drawBlobs() {
  const time = Date.now() * 0.0005;
  const blobs = [
    { x: W*0.2 + Math.sin(time)*80,  y: H*0.3 + Math.cos(time)*60,  r: 350, c: '0,245,212',  a: 0.04 },
    { x: W*0.8 + Math.cos(time)*100, y: H*0.7 + Math.sin(time)*80,  r: 400, c: '124,58,237', a: 0.04 },
    { x: W*0.5 + Math.sin(time*1.3)*120, y: H*0.5, r: 300, c: '245,158,11', a: 0.025 },
  ];
  blobs.forEach(b => {
    const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
    g.addColorStop(0, `rgba(${b.c},${b.a})`);
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  });
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  drawBlobs();
  nodes.forEach(n => n.update());
  drawConnections();
  drawNodes();
  RAF = requestAnimationFrame(animate);
}
animate();

// ---- PARTICLES ----
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay    = (Math.random() * 10) + 's';
    p.style.width  = (Math.random() * 3 + 1) + 'px';
    p.style.height = p.style.width;
    container.appendChild(p);
  }
}
createParticles();

// ---- TYPEWRITER ----
const roles = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'AI Enthusiast',
  'Problem Solver',
  'React Developer'
];
let rIdx = 0, cIdx = 0, isDeleting = false;
const el = document.getElementById('typewriter');

function typeWrite() {
  const current = roles[rIdx];
  if (isDeleting) {
    el.textContent = current.slice(0, cIdx--);
    if (cIdx < 0) { isDeleting = false; rIdx = (rIdx + 1) % roles.length; }
    setTimeout(typeWrite, 60);
  } else {
    el.textContent = current.slice(0, cIdx++);
    if (cIdx > current.length) { isDeleting = true; setTimeout(typeWrite, 1800); return; }
    setTimeout(typeWrite, 100);
  }
}
typeWrite();

// ---- NAV ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  revealOnScroll();
  animateStats();
  animateBars();
});

// ---- NAV TOGGLE ----
document.getElementById('navToggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.remove('open');
}));

// ---- SCROLL REVEAL ----
function revealOnScroll() {
  document.querySelectorAll('.glass-card, .section-header, .timeline-item, .project-card').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) el.classList.add('visible');
  });
}
document.querySelectorAll('.glass-card, .section-header, .timeline-item, .project-card').forEach(el => {
  el.classList.add('reveal');
});
revealOnScroll();

// ---- STATS ----
let statsAnimated = false;
function animateStats() {
  if (statsAnimated) return;
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;
  const r = statsSection.getBoundingClientRect();
  if (r.top < window.innerHeight) {
    statsAnimated = true;
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.target);
      let curr = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        curr = Math.min(curr + step, target);
        el.textContent = curr;
        if (curr >= target) clearInterval(timer);
      }, 40);
    });
  }
}
animateStats();

// ---- SKILLS ----
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const r = skillsSection.getBoundingClientRect();
  if (r.top < window.innerHeight * 0.9) {
    barsAnimated = true;
    document.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.w + '%';
    });
  }
}

// ---- TILT ----
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- EMAILJS ----
const EMAILJS_PUBLIC_KEY  = 'Hvqed-1mtaxUb1mWj';
const EMAILJS_SERVICE_ID  = 'service_oeam3df';
const EMAILJS_TEMPLATE_ID = 'template_ngkq9dc';

(function() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = () => emailjs.init(EMAILJS_PUBLIC_KEY);
  document.head.appendChild(script);
})();

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = this.querySelector('button');
    const name    = this.querySelector('input[name="from_name"]');
    const email   = this.querySelector('input[name="from_email"]');
    const subject = this.querySelector('input[name="subject"]');
    const message = this.querySelector('textarea[name="message"]');

    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    const templateParams = {
      from_name: name.value,
      from_email: email.value,
      subject: subject ? subject.value : 'Portfolio Enquiry',
      message: message.value,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        btn.innerHTML = '<span>Message Sent! ✓</span>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        btn.style.opacity = '1';
        showToast('✅ Message sent! Meghana will get back to you soon.');
        contactForm.reset();

        setTimeout(() => {
          btn.innerHTML = '<span>Send Message</span><div class="btn-glow"></div>';
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        btn.innerHTML = '<span>Failed — Try Again</span>';
        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        btn.disabled = false;
        showToast('❌ Failed. Contact: audimeghana@gmail.com');
      });
  });
}

// ---- TOAST ----
function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  Object.assign(toast.style, {
    position:'fixed',bottom:'2rem',right:'2rem',
    background:'rgba(10,15,30,0.95)',
    border:'1px solid rgba(0,245,212,0.3)',
    color:'#e2e8f0',padding:'1rem 1.5rem',
    borderRadius:'12px',zIndex:'9999'
  });
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),4000);
}

// ---- ACTIVE NAV ----
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));