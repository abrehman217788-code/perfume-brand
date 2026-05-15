// CV Studio - Shared JavaScript

const API_BASE = '/api';

// ── API Functions ──

async function fetchCvs() {
  try {
    const response = await fetch(`${API_BASE}/cvs`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching CVs:', error);
    return [];
  }
}

async function fetchCv(id) {
  try {
    const response = await fetch(`${API_BASE}/cvs/${id}`);
    if (!response.ok) throw new Error('CV not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching CV:', error);
    return null;
  }
}

async function saveCv(cv) {
  try {
    const response = await fetch(`${API_BASE}/cvs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cv)
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving CV:', error);
    return null;
  }
}

async function deleteCv(id) {
  try {
    const response = await fetch(`${API_BASE}/cvs/${id}`, {
      method: 'DELETE'
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting CV:', error);
    return false;
  }
}

// ── Helper Functions ──

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

// ── Notification System ──

function showNotification(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Mobile Nav Toggle ──

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Intersection Observer for fade-in animations
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in, .animate-up, .animate-left, .animate-right, .animate-scale').forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });

    window.projectObserver = observer;
  }
});

// ── LocalStorage Autosave Recovery ──

function recoverAutosave() {
  const draft = localStorage.getItem('cv_autosave_draft');
  if (draft) {
    try {
      return JSON.parse(draft);
    } catch (e) {
      return null;
    }
  }
  return null;
}

function clearAutosave() {
  localStorage.removeItem('cv_autosave_draft');
}
