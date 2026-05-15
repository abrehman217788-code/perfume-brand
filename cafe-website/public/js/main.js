document.addEventListener('DOMContentLoaded', function () {

  /* ====== MOBILE NAV TOGGLE ====== */
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      this.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });
    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
    });
  }

  /* ====== NAV SCROLL EFFECT ====== */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ====== REVEAL ON SCROLL (Intersection Observer) ====== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ====== 3D TILT EFFECT ON CARDS ====== */
  document.querySelectorAll('.tilt-3d').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.setProperty('--rotX', rotateX + 'deg');
      card.style.setProperty('--rotY', rotateY + 'deg');
    });
    card.addEventListener('mouseleave', function () {
      card.style.setProperty('--rotX', '0deg');
      card.style.setProperty('--rotY', '0deg');
    });
  });

  /* ====== COUNTUP STATS ====== */
  function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'));
      var current = 0;
      var increment = Math.ceil(target / 60);
      var timer = setInterval(function () {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + '+';
      }, 25);
    });
  }
  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  var statsSection = document.querySelector('.stats-grid');
  if (statsSection) statsObserver.observe(statsSection);

  /* ====== NEWSLETTER FORM ====== */
  var newsForm = document.getElementById('newsletterForm');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = this.querySelector('input[type="email"]').value;
      var btn = this.querySelector('button');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      fetch('/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          btn.textContent = 'Subscribed!';
          btn.style.background = '#2e7d32';
          setTimeout(function () {
            btn.textContent = 'Subscribe';
            btn.style.background = '';
            btn.disabled = false;
            newsForm.querySelector('input[type="email"]').value = '';
          }, 3000);
          showToast(data.message || 'Welcome to the cafe family!');
        })
        .catch(function () {
          btn.textContent = 'Subscribe';
          btn.disabled = false;
          showToast('Something went wrong. Please try again.');
        });
    });
  }

  /* ====== TOAST NOTIFICATIONS ====== */
  function showToast(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText =
      'position:fixed;bottom:100px;right:24px;background:#2c1810;color:#fff;padding:16px 24px;border-radius:12px;font-size:0.9rem;z-index:10000;box-shadow:0 8px 32px rgba(0,0,0,0.2);animation:msg-in 0.3s ease;max-width:360px;';
    document.body.appendChild(t);
    setTimeout(function () {
      t.style.opacity = '0';
      t.style.transition = 'opacity 0.3s';
      setTimeout(function () { t.remove(); }, 300);
    }, 4000);
  }

  /* ====== CHATBOT ====== */
  var chatToggle = document.getElementById('chatToggle');
  var chatWindow = document.getElementById('chatWindow');
  var chatInput = document.getElementById('chatInput');
  var chatSend = document.getElementById('chatSend');
  var chatMessages = document.getElementById('chatMessages');

  if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', function () {
      chatWindow.classList.toggle('open');
      chatToggle.classList.toggle('active');
      if (chatWindow.classList.contains('open') && chatMessages && chatMessages.children.length === 0) {
        addChatMessage('bot', 'Hi there! Welcome to Cafe Serenity! How can I help you today?');
      }
    });
  }

  if (chatSend && chatInput) {
    function sendChatMessage() {
      var msg = chatInput.value.trim();
      if (!msg) return;
      addChatMessage('user', msg);
      chatInput.value = '';
      chatSend.disabled = true;
      chatSend.textContent = '...';
      fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          setTimeout(function () {
            addChatMessage('bot', data.reply);
            chatSend.disabled = false;
            chatSend.textContent = 'Send';
          }, 500);
        })
        .catch(function () {
          addChatMessage('bot', 'Sorry, I had a glitch. Please try again!');
          chatSend.disabled = false;
          chatSend.textContent = 'Send';
        });
    }
    chatSend.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  function addChatMessage(type, text) {
    if (!chatMessages) return;
    var div = document.createElement('div');
    div.className = 'chat-msg ' + type;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /* ====== ALERT AUTO-DISMISS ====== */
  document.querySelectorAll('.alert').forEach(function (alert) {
    setTimeout(function () {
      alert.style.transition = 'opacity 0.5s';
      alert.style.opacity = '0';
      setTimeout(function () { alert.remove(); }, 500);
    }, 5000);
  });

  /* ====== ACTIVE NAV LINK HIGHLIGHT ====== */
  var currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/')) {
      link.classList.add('active');
    }
  });

  /* ====== SMOOTH ANCHOR SCROLL ====== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ====== PARALLAX ON SCROLL ====== */
  var parallaxBgs = document.querySelectorAll('.parallax-bg');
  if (parallaxBgs.length > 0) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      parallaxBgs.forEach(function (bg) {
        bg.style.setProperty('--parallax-offset', scrollY * 0.3 + 'px');
      });
    });
  }

  /* ====== MENU FILTER BUTTONS ====== */
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var parent = this.closest('.filter-bar');
      if (parent) {
        parent.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      }
      this.classList.add('active');
    });
  });

  /* ====== GALLERY LIGHTBOX ====== */
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var img = this.querySelector('img');
      if (!img) return;
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:fadeIn 0.3s ease;';
      var imgClone = document.createElement('img');
      imgClone.src = img.src.replace('w=600&h=600', 'w=1200&h=1200').replace('w=300&h=300', 'w=800&h=800');
      imgClone.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 8px 48px rgba(0,0,0,0.5);';
      overlay.appendChild(imgClone);
      overlay.addEventListener('click', function () { overlay.remove(); });
      document.body.appendChild(overlay);
    });
  });

  /* ====== 3D HERO PARTICLES (Three.js) ====== */
  var heroContainer = document.getElementById('hero-3d-container');
  if (heroContainer && typeof THREE !== 'undefined') {
    try {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(75, heroContainer.clientWidth / heroContainer.clientHeight, 0.1, 1000);
      var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      heroContainer.appendChild(renderer.domElement);

      var particlesGeo = new THREE.BufferGeometry();
      var count = 120;
      var positions = new Float32Array(count * 3);
      var sizes = new Float32Array(count);
      for (var i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
        sizes[i] = Math.random() * 3 + 1;
      }
      particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      var textureCanvas = document.createElement('canvas');
      textureCanvas.width = 32;
      textureCanvas.height = 32;
      var ctx = textureCanvas.getContext('2d');
      var gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(212, 168, 83, 1)');
      gradient.addColorStop(0.3, 'rgba(212, 168, 83, 0.6)');
      gradient.addColorStop(1, 'rgba(212, 168, 83, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
      var particleTexture = new THREE.CanvasTexture(textureCanvas);

      var particlesMat = new THREE.PointsMaterial({
        size: 0.25,
        map: particleTexture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
      });
      var particles = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particles);

      camera.position.z = 6;

      var mouseX = 0, mouseY = 0;
      document.addEventListener('mousemove', function (e) {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      });

      function animateParticles() {
        requestAnimationFrame(animateParticles);
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;
        particles.rotation.x += (mouseY * 0.02 - particles.rotation.x) * 0.01;
        particles.rotation.y += (mouseX * 0.02 - particles.rotation.y) * 0.01;
        renderer.render(scene, camera);
      }
      animateParticles();

      window.addEventListener('resize', function () {
        var w = heroContainer.clientWidth;
        var h = heroContainer.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
    } catch (e) {
      console.log('3D particles unavailable:', e);
    }
  }
});
