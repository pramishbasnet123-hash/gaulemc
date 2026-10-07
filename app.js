const DISCORD_URL = 'https://discord.gg/gTKaa9RB7';

const RANKS = [
  {
    id: 'mukhiya', name: 'MUKHIYA', price: 199, accent: '#f59e0b',
    tagline: 'Begin your journey', img: 'assets/rank-mukhiya.png',
    perks: ['12 Homes', '20 Auction House Slots', 'Mukhiya Kit'],
    commands: ['/recipe', '/craft'],
  },
  {
    id: 'raja', name: 'RAJA', price: 299, accent: '#eab308',
    tagline: 'Rule your world', img: 'assets/rank-raja.png',
    perks: ['20 Homes', '40 Auction House Slots', 'Raja Kit'],
    commands: ['/craft', '/recipe', '/ec'],
  },
  {
    id: 'yatri', name: 'YATRI', price: 399, accent: '#0ea5e9',
    tagline: 'Travel without limits', img: 'assets/rank-yatri.png',
    perks: ['30 Homes', '50 Auction House Slots', 'Yatri Kit'],
    commands: ['/craft', '/recipe', '/hat', '/ec', '/feed'],
  },
  {
    id: 'gorkhali', name: 'GORKHALI', price: 599, accent: '#ef4444',
    tagline: 'Born for battle', img: 'assets/rank-gorkhali.png',
    badge: 'MOST POPULAR', featured: true,
    perks: ['44 Homes', '69 Auction House Slots', 'Gorkhali Kit'],
    commands: ['/craft', '/recipe', '/ec', '/hat', '/feed', '/disposal', '/heal'],
  },
  {
    id: 'mahadev', name: 'MAHADEV', price: 699, accent: '#a78bfa',
    tagline: 'Ascend to godhood', img: 'assets/rank-mahadev.png',
    badge: 'ULTIMATE',
    perks: ['Up to 99 Homes', 'Up to 99 Auction House Slots', 'Mahadev Kit'],
    commands: ['/craft', '/recipe', '/ec', '/hat', '/feed', '/disposal', '/heal', '/repair'],
  },
];

const CRATES = [
  { id: 'crimson', name: 'CRIMSON', price: 25, accent: '#ef4444', tag: 'Starter loot', img: 'assets/crate-crimson.png' },
  { id: 'prime', name: 'PRIME', price: 50, accent: '#22d3ee', tag: 'Rare rewards', img: 'assets/crate-prime.png' },
  { id: 'gold', name: 'GOLD', price: 75, accent: '#fbbf24', tag: 'Epic rewards', img: 'assets/crate-gold.png' },
  { id: 'amethyst', name: 'AMETHYST', price: 100, accent: '#a78bfa', tag: 'Legendary loot', img: 'assets/crate-amethyst.png' },
];

const CHECK_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
  <path d="M2.5 8.5L6 12L13.5 4.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const ranksGrid = document.getElementById('ranksGrid');
const cratesGrid = document.getElementById('cratesGrid');

ranksGrid.innerHTML = RANKS.map((r) => `
  <article class="rank-card reveal${r.featured ? ' featured' : ''}" style="--accent:${r.accent}">
    ${r.badge ? `<div class="rank-badge">${r.badge}</div>` : ''}
    <div class="rank-art">
      <img src="${r.img}" alt="${r.name} rank emblem" loading="lazy">
    </div>
    <h3 class="rank-name">${r.name}</h3>
    <p class="rank-tag">${r.tagline}</p>
    <div class="rank-price"><span>Rs</span>${r.price}</div>
    <div class="rank-feats">
      ${r.perks.map((p) => `<div class="feat">${CHECK_ICON}<span>${p}</span></div>`).join('')}
    </div>
    <div class="cmds">
      ${r.commands.map((c) => `<span class="cmd">${c}</span>`).join('')}
    </div>
    <button class="btn btn-buy" data-buy="rank" data-id="${r.id}">Buy Now</button>
  </article>
`).join('');

cratesGrid.innerHTML = CRATES.map((c) => `
  <article class="crate-card reveal" style="--accent:${c.accent}">
    <div class="crate-art">
      <img src="${c.img}" alt="${c.name} crate" loading="lazy">
    </div>
    <h3 class="crate-name">${c.name}</h3>
    <p class="crate-tag">${c.tag}</p>
    <div class="crate-price"><span>Rs</span>${c.price}</div>
    <button class="btn btn-buy" data-buy="crate" data-id="${c.id}">Buy Keys</button>
  </article>
`).join('');

const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalKind = document.getElementById('modalKind');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
let lastFocus = null;

function openModal(kind, id) {
  const item = (kind === 'rank' ? RANKS : CRATES).find((x) => x.id === id);
  if (!item) return;
  modalImg.src = item.img;
  modalImg.alt = item.name;
  modalKind.textContent = kind === 'rank' ? 'SERVER RANK' : 'CRATE KEYS';
  modalTitle.textContent = item.name;
  modalPrice.textContent = `Rs ${item.price}`;
  lastFocus = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close').focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}

document.addEventListener('click', (e) => {
  const buyBtn = e.target.closest('[data-buy]');
  if (buyBtn) {
    openModal(buyBtn.dataset.buy, buyBtn.dataset.id);
    return;
  }
  if (e.target.closest('[data-close]')) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.setProperty('--d', `${(i % 6) * 0.08}s`);
  revealObserver.observe(el);
});

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (finePointer) {
  document.querySelectorAll('.rank-card, .crate-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'border-color .3s ease, box-shadow .3s ease';
    });
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .45s ease, border-color .3s ease, box-shadow .3s ease';
      card.style.transform = '';
    });
  });
}
