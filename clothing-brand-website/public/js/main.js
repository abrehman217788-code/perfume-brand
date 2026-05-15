// STREET_ARCHIVE — Main Application

document.addEventListener('DOMContentLoaded', function() {

  // Loader
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('hidden'), 800);

  // Mobile Menu
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
    if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // Search
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', () => { searchOverlay.classList.add('open'); setTimeout(() => searchInput?.focus(), 200); });
    if (searchClose) searchClose.addEventListener('click', () => searchOverlay.classList.remove('open'));
    searchOverlay.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('open'); });
    // Search with product data
    if (searchInput && searchResults) {
      let searchData = [];
      // Collect product data from the page
      document.querySelectorAll('.product-card').forEach(card => {
        const title = card.querySelector('.product-card-title')?.textContent || '';
        const sku = card.querySelector('.product-card-sku')?.textContent || '';
        const link = card.getAttribute('href') || '';
        searchData.push({ title, sku, link, text: title + ' ' + sku });
      });
      searchInput.addEventListener('input', function() {
        const q = this.value.toLowerCase().trim();
        if (!q) { searchResults.innerHTML = ''; return; }
        const matches = searchData.filter(d => d.text.toLowerCase().includes(q));
        searchResults.innerHTML = matches.length 
          ? matches.slice(0, 6).map(m => `<a href="${m.link}" class="search-result-item" style="display:flex;justify-content:space-between;padding:12px 16px;background:var(--surface);border:1px solid var(--border);border-radius:8px;transition:var(--transition);font-size:.85rem;"><span>${m.title}</span><span style="color:var(--text-muted);font-size:.7rem;text-transform:uppercase;">${m.sku}</span></a>`).join('')
          : '<div style="padding:16px;color:var(--text-muted);font-size:.85rem;">No results found. Try "cargo", "hoodie", "black"...</div>';
      });
    }
  }

  // Newsletter forms
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]')?.value;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Please enter a valid email.');
      fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email}) })
        .then(r => r.json()).then(d => { if(d.success) alert('Subscribed! Welcome to the Archive.'); });
    });
  });

  // Intersection Observer for reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // 3D Hero Animation (Three.js)
  const canvas = document.getElementById('heroCanvas');
  if (canvas && typeof THREE !== 'undefined') {
    initHero3D(canvas);
  }
});

// ===== 3D Hero with Three.js =====
function initHero3D(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Floating geometric shapes
  const shapes = [];
  const geometries = [
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.IcosahedronGeometry(0.6, 0),
    new THREE.TorusGeometry(0.5, 0.2, 16, 32),
    new THREE.OctahedronGeometry(0.6, 0)
  ];

  const colors = [0xabd600, 0xffffff, 0x8b5cf6, 0x22c55e, 0x3b82f6];

  for (let i = 0; i < 50; i++) {
    const geom = geometries[Math.floor(Math.random() * geometries.length)];
    const mat = new THREE.MeshStandardMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      wireframe: Math.random() > 0.5,
      transparent: true,
      opacity: 0.3 + Math.random() * 0.4,
      roughness: 0.3,
      metalness: 0.7
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15,
      -10 + Math.random() * 15
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    mesh.userData = {
      rotSpeed: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01 },
      floatSpeed: 0.002 + Math.random() * 0.005,
      floatOffset: Math.random() * Math.PI * 2
    };
    scene.add(mesh);
    shapes.push(mesh);
  }

  // Ambient particles
  const particleCount = 2000;
  const particleGeom = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) positions[i] = (Math.random() - 0.5) * 40;
  particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.03,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
  });
  const particles = new THREE.Points(particleGeom, particleMat);
  scene.add(particles);

  // Lighting
  const ambient = new THREE.AmbientLight(0x404060);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(2, 5, 3);
  scene.add(dirLight);
  const pointLight = new THREE.PointLight(0xabd600, 0.5, 20);
  pointLight.position.set(-2, 1, 4);
  scene.add(pointLight);

  camera.position.z = 5;

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let time = 0;

  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Rotate shapes
    shapes.forEach((mesh, i) => {
      mesh.rotation.x += mesh.userData.rotSpeed.x;
      mesh.rotation.y += mesh.userData.rotSpeed.y;
      mesh.position.y += Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.003;
    });

    // Rotate particles
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;

    // Camera follows mouse
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, -2);

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
}

// ===== Search results hover effect via CSS-in-JS fallback =====
document.addEventListener('click', function(e) {
  const target = e.target.closest('.search-result-item');
  if (target) {
    document.getElementById('searchOverlay')?.classList.remove('open');
  }
});

// Expose for inline templates
window.adjQty = function(d) {
  const inp = document.getElementById('productQty');
  if (inp) inp.value = Math.max(1, Math.min(10, +inp.value + d));
};
window.predictFit = function() {
  const h = +document.getElementById('fitHeight')?.value;
  const w = +document.getElementById('fitWeight')?.value;
  const p = document.getElementById('fitPreference')?.value;
  const r = document.getElementById('fitResult');
  if (!h || !w) { if(r) r.innerHTML = '<span style="color:var(--error)">Please enter height and weight.</span>'; return; }
  const bmi = w / ((h/100) * (h/100));
  let size = 'M';
  if (bmi < 20) size = 'S';
  else if (bmi < 25) size = 'M';
  else if (bmi < 30) size = 'L';
  else size = 'XL';
  if (p === 'oversized') size = { S:'M', M:'L', L:'XL', XL:'XL' }[size] || 'XL';
  else if (p === 'slim') size = { S:'S', M:'S', L:'M', XL:'L' }[size] || 'M';
  if (r) r.innerHTML = '<span style="color:var(--tertiary);font-weight:700;font-size:1.2rem;">We recommend size <strong>' + size + '</strong></span>';
  document.querySelectorAll('.size-btn:not(.disabled)').forEach(s => s.classList.remove('active'));
  const btn = document.querySelector('.size-btn[data-size="' + size + '"]:not(.disabled)');
  if (btn) { btn.classList.add('active'); if (window.selectSize) window.selectSize(size, btn); }
};

// Log console greeting
console.log('%c STREET_ARCHIVE ', 'background:#abd600;color:#000;font-size:20px;font-weight:900;padding:8px 16px;');
console.log('%c Brutalist streetwear engineered for the concrete.', 'color:#888;font-size:12px;');