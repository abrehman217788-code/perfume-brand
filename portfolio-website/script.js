// Initialize EmailJS
emailjs.init('YOUR_PUBLIC_KEY'); // We'll set this up in deployment

// PDF Download Function
function downloadPDF() {
    window.print();
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Contact Form Handling with EmailJS
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const formStatus = document.getElementById('form-status');
        
        // For now, use fallback email method
        // In production, you'll add EmailJS public key for direct API integration
        const mailtoLink = `mailto:ab.rehman217788@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Show success message
        formStatus.classList.add('success');
        formStatus.classList.remove('error');
        formStatus.textContent = 'Message prepared! Your email client will open to send the message.';
        formStatus.style.display = 'block';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            formStatus.style.display = 'none';
            window.location.href = mailtoLink;
        }, 2000);
    });
    
    // Cancel button functionality
    const cancelButton = contactForm.querySelector('button[type="reset"]');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            const formStatus = document.getElementById('form-status');
            formStatus.style.display = 'none';
            formStatus.classList.remove('success', 'error');
            contactForm.reset();
        });
    }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .about-content, .stat-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Scroll to top button
window.addEventListener('scroll', () => {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.scrollY > 300) {
        if (scrollButton) scrollButton.style.display = 'block';
    } else {
        if (scrollButton) scrollButton.style.display = 'none';
    }
});

console.log('Portfolio website loaded successfully!');
console.log('Contact: ab.rehman217788@gmail.com | Phone: +923331940971');
