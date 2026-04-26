/* Trident CloudNet Solutions — Main JS */

// ---- Mobile nav ----
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  const isOpen = links.getAttribute('data-open') === 'true';
  if (isOpen) {
    links.removeAttribute('style');
    links.setAttribute('data-open', 'false');
  } else {
    links.style.display = 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '68px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'white';
    links.style.padding = '20px 5%';
    links.style.borderBottom = '1px solid #eee';
    links.style.zIndex = '99';
    links.setAttribute('data-open', 'true');
  }
}

// ---- Chat widget ----
function toggleChat() {
  document.getElementById('chatPanel').classList.toggle('open');
}

const chatResponses = {
  services: 'We offer: Network Monitoring, Cloud Operations (AWS/Azure/GCP), AI-powered Helpdesk, Staff Augmentation (US & India), Incident Response, and DevOps automation. <a href="services.html">View all services →</a>',
  pricing: 'Plans start at $1,499/mo (Starter), $3,499/mo (Growth), and $7,999/mo (Enterprise). All include AI helpdesk + human support. <a href="pricing.html">See full pricing →</a>',
  audit: "Great! A free 30-minute network audit with a senior engineer. Email us at hello@tridentcloudnet.com or visit our contact page to book. <a href='contact.html'>Book now →</a>",
  staffing: 'Yes — we place engineers from India ($28–$38/hr) or the US ($65–$95/hr). L1 to L3, short or long-term. <a href="contact.html">Tell us what you need →</a>',
  default: "Thanks for reaching out! For detailed questions, visit <a href='contact.html'>our contact page</a> or email hello@tridentcloudnet.com."
};

function getResponse(msg) {
  msg = msg.toLowerCase();
  if (msg.includes('service') || msg.includes('offer') || msg.includes('what do')) return chatResponses.services;
  if (msg.includes('pric') || msg.includes('cost') || msg.includes('plan')) return chatResponses.pricing;
  if (msg.includes('audit') || msg.includes('book') || msg.includes('call') || msg.includes('free')) return chatResponses.audit;
  if (msg.includes('staff') || msg.includes('augment') || msg.includes('engineer') || msg.includes('hire')) return chatResponses.staffing;
  return chatResponses.default;
}

function addMsg(text, type) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg ' + type;
  div.innerHTML = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function quickMsg(text) {
  const qb = document.getElementById('quickBtns');
  if (qb) qb.style.display = 'none';
  addMsg(text, 'user');
  setTimeout(() => addMsg(getResponse(text), 'bot'), 600);
}

function sendMsg() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  const qb = document.getElementById('quickBtns');
  if (qb) qb.style.display = 'none';
  addMsg(text, 'user');
  input.value = '';
  setTimeout(() => addMsg(getResponse(text), 'bot'), 700);
}

function handleKey(e) { if (e.key === 'Enter') sendMsg(); }

// ---- FAQ accordion ----
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ---- Contact form ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.textContent = 'Send message';
        btn.disabled = false;
        const msg = document.getElementById('formSuccess');
        if (msg) { msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 6000); }
      }, 1200);
    });
  }

  // ---- Mark active nav link ----
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
});
