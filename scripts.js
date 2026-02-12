const initPage = () => {
    // 1. Smooth Fade-In on Load
    document.body.classList.add('page-visible');

    // 2. Link Transition Logic
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        // Only target internal links
        const href = link.getAttribute('href');
        if (href && href.endsWith('.html') && !href.startsWith('http')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // Matches the CSS transition duration
            });
        }
    });

    // 3. Navbar Scroll Effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 20) {
                nav.classList.add('glass-nav', 'shadow-sm', 'py-3');
                nav.classList.remove('py-6');
            } else {
                nav.classList.remove('glass-nav', 'shadow-sm', 'py-3');
                nav.classList.add('py-6');
            }
        }
    });

    // 4. Scroll-triggered animations for Service Icons
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icon = entry.target.querySelector('.service-icon');
                if (icon) {
                    icon.classList.add('animate-in');
                    // Once animated, stop observing this specific card
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => observer.observe(card));
};

// Start logic when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
