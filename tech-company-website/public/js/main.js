(function() {
    'use strict';

    // ======================== LOADING SCREEN ========================
    window.addEventListener('load', function() {
        var loader = document.getElementById('loader');
        if (loader) {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 600);
        }
    });

    // ======================== CUSTOM CURSOR ========================
    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    var ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    document.addEventListener('mousemove', function(e) {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .btn, .card, input, textarea').forEach(function(el) {
        el.addEventListener('mouseenter', function() { ring.classList.add('hover'); });
        el.addEventListener('mouseleave', function() { ring.classList.remove('hover'); });
    });

    // ======================== SCROLL NAVBAR ========================
    var navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.pageYOffset > 50);
    });

    // ======================== MOBILE MENU ========================
    var mobileToggle = document.getElementById('mobileToggle');
    var navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ======================== DARK / LIGHT MODE ========================
    var themeToggle = document.getElementById('themeToggle');
    var themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        }
    }

    var saved = localStorage.getItem('theme');
    if (saved) {
        setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            var current = document.documentElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // ======================== SEARCH ========================
    var searchToggle = document.getElementById('searchToggle');
    var searchOverlay = document.getElementById('searchOverlay');
    var searchInput = document.getElementById('searchInput');
    var searchResults = document.getElementById('searchResults');
    var searchClose = document.getElementById('searchClose');

    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', function() {
            searchOverlay.classList.add('open');
            setTimeout(function() { searchInput.focus(); }, 100);
            document.body.style.overflow = 'hidden';
        });

        function closeSearch() {
            searchOverlay.classList.remove('open');
            document.body.style.overflow = '';
            searchInput.value = '';
            if (searchResults) searchResults.innerHTML = '';
        }

        if (searchClose) searchClose.addEventListener('click', closeSearch);

        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) closeSearch();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeSearch();
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                searchToggle.click();
            }
        });

        // Search data
        var searchData = [];
        var searchItems = document.querySelectorAll('[data-search]');
        searchItems.forEach(function(el) {
            var text = el.getAttribute('data-search');
            var title = el.getAttribute('data-search-title') || '';
            var link = el.getAttribute('data-search-link') || '#';
            searchData.push({ title: title, text: text, link: link });
        });

        if (searchInput && searchResults) {
            searchInput.addEventListener('input', function() {
                var q = this.value.toLowerCase().trim();
                if (!q) { searchResults.innerHTML = ''; return; }

                var matches = searchData.filter(function(item) {
                    return item.title.toLowerCase().includes(q) || item.text.toLowerCase().includes(q);
                }).slice(0, 8);

                if (matches.length === 0) {
                    searchResults.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text-muted);">No results found</div>';
                    return;
                }

                searchResults.innerHTML = matches.map(function(m) {
                    return '<div class="search-result-item" onclick="window.location.href=\'' + m.link + '\'">' +
                        '<h4>' + m.title + '</h4>' +
                        '<p>' + m.text.substring(0, 120) + '</p></div>';
                }).join('');
            });
        }
    }

    // ======================== SCROLL REVEAL ========================
    var revealElements = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function(el) { revealObserver.observe(el); });

    // ======================== COUNTER ANIMATION ========================
    function animateCounter(el) {
        var target = parseFloat(el.getAttribute('data-target'));
        if (isNaN(target)) return;
        var isDecimal = target % 1 !== 0;
        var duration = 2000;
        var start = performance.now();

        function update(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var val = eased * target;
            el.textContent = isDecimal ? val.toFixed(1) : Math.floor(val).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target.toLocaleString() + (el.getAttribute('data-suffix') || '');
        }
        requestAnimationFrame(update);
    }

    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(function(c) {
                    var raw = c.textContent.replace(/[^0-9.]/g, '');
                    var suffix = c.textContent.replace(/[0-9.]/g, '');
                    c.setAttribute('data-target', raw);
                    c.setAttribute('data-suffix', suffix);
                    c.textContent = '0';
                    animateCounter(c);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    var statsSection = document.querySelector('.stats-section');
    if (statsSection) counterObserver.observe(statsSection);

    // ======================== 3D TILT EFFECT ========================
    document.querySelectorAll('.tilt').forEach(function(el) {
        el.addEventListener('mousemove', function(e) {
            var rect = el.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var rotateX = ((y - rect.height / 2) / rect.height) * -8;
            var rotateY = ((x - rect.width / 2) / rect.width) * 8;
            el.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
        });

        el.addEventListener('mouseleave', function() {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // ======================== FILTER BUTTONS ========================
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var filter = btn.getAttribute('data-filter');

            document.querySelectorAll('.filter-item').forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(function() { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(function() { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // ======================== FAQ ACCORDION ========================
    document.querySelectorAll('.faq-question').forEach(function(q) {
        q.addEventListener('click', function() {
            var item = this.parentElement;
            var isOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item.open').forEach(function(i) {
                i.classList.remove('open');
            });

            if (!isOpen) item.classList.add('open');
        });
    });

    // ======================== NEWSLETTER FORM ========================
    document.querySelectorAll('.newsletter-form').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var email = form.querySelector('input[type="email"]');
            if (!email || !email.value) return;
            var btn = form.querySelector('button');
            var original = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
            btn.disabled = true;

            fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.value })
            })
            .then(function(r) { return r.json(); })
            .then(function() {
                btn.innerHTML = '<i class="fa-solid fa-check"></i>';
                email.value = '';
                setTimeout(function() {
                    btn.innerHTML = original;
                    btn.disabled = false;
                }, 3000);
            })
            .catch(function() {
                btn.innerHTML = original;
                btn.disabled = false;
            });
        });
    });

    // ======================== BACK TO TOP ========================
    var backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            backToTop.classList.toggle('visible', window.pageYOffset > 400);
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ======================== COOKIE CONSENT ========================
    var cookieConsent = document.getElementById('cookieConsent');
    var cookieAccept = document.getElementById('cookieAccept');
    var cookieDecline = document.getElementById('cookieDecline');

    if (cookieConsent && !localStorage.getItem('cookieConsent')) {
        setTimeout(function() { cookieConsent.classList.add('show'); }, 1500);

        if (cookieAccept) {
            cookieAccept.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieConsent.classList.remove('show');
            });
        }

        if (cookieDecline) {
            cookieDecline.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'declined');
                cookieConsent.classList.remove('show');
            });
        }
    }

    // ======================== SMOOTH SCROLL FOR ANCHORS ========================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ======================== THREE.JS 3D BACKGROUND ========================
    function initThreeBackground() {
        var canvas = document.getElementById('hero-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        var scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x020617, 0.0008);

        var camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 30;

        var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        canvas.appendChild(renderer.domElement);

        // Particles
        var count = 2000;
        var positions = new Float32Array(count * 3);
        var colors = new Float32Array(count * 3);
        var palette = [
            new THREE.Color(0x22d3ee), new THREE.Color(0x8b5cf6),
            new THREE.Color(0xf472b6), new THREE.Color(0x10b981)
        ];

        for (var i = 0; i < count; i++) {
            var r = 50, theta = Math.random() * Math.PI * 2;
            var phi = Math.acos((Math.random() * 2) - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
            var c = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
        }

        var geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        var mat = new THREE.PointsMaterial({
            size: 0.15, vertexColors: true, transparent: true,
            opacity: 0.8, blending: THREE.AdditiveBlending, sizeAttenuation: true
        });

        var particles = new THREE.Points(geo, mat);
        scene.add(particles);

        // Floating shapes
        var shapesGroup = new THREE.Group();
        var shapeGeo = new THREE.IcosahedronGeometry(0.6, 0);

        for (var j = 0; j < 15; j++) {
            var shape = new THREE.Mesh(shapeGeo, new THREE.MeshBasicMaterial({
                color: 0x22d3ee, transparent: true, opacity: 0.15, wireframe: true
            }));
            var sr = 15 + Math.random() * 20, st = Math.random() * Math.PI * 2, sp = Math.acos((Math.random() * 2) - 1);
            shape.position.set(sr * Math.sin(sp) * Math.cos(st), sr * Math.sin(sp) * Math.sin(st), sr * Math.cos(sp));
            shape.scale.setScalar(Math.random() * 2 + 0.5);
            shape.material.color.setHSL(Math.random() * 0.6 + 0.5, 0.8, 0.5);
            shape.material.opacity = Math.random() * 0.15 + 0.05;
            shapesGroup.add(shape);
        }
        scene.add(shapesGroup);

        var mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', function(e) {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        var clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            var elapsed = clock.getElapsedTime();
            particles.rotation.x = elapsed * 0.015 + mouseY * 0.005;
            particles.rotation.y = elapsed * 0.01 + mouseX * 0.005;
            shapesGroup.rotation.x = elapsed * 0.02;
            shapesGroup.rotation.y = elapsed * 0.025;
            shapesGroup.children.forEach(function(child, idx) {
                child.rotation.x = elapsed * (0.01 + idx * 0.001);
                child.rotation.y = elapsed * (0.015 + idx * 0.001);
            });
            renderer.render(scene, camera);
        }
        animate();

        function onResize() {
            var w = canvas.clientWidth, h = canvas.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
        window.addEventListener('resize', onResize);
    }

    if (typeof THREE === 'undefined') {
        var s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        s.onload = initThreeBackground;
        document.head.appendChild(s);
    } else {
        initThreeBackground();
    }

})();
