document.addEventListener('DOMContentLoaded', function () {
    console.log('[debug] DOMContentLoaded - initializing script.js');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const headerLogo = document.querySelector('.header-logo');
    console.log('[debug] elements:', { mobileMenuToggle: !!mobileMenuToggle, mobileMenuOverlay: !!mobileMenuOverlay, mobileMenuClose: !!mobileMenuClose, headerLogo: !!headerLogo });

    function closeMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    function openMobileMenu() {
        if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('hidden');
                // Force inline styles to ensure visibility (diagnostic)
                mobileMenuOverlay.style.display = 'flex';
                mobileMenuOverlay.style.opacity = '1';
                mobileMenuOverlay.style.zIndex = '9999';
                mobileMenuOverlay.style.pointerEvents = 'auto';
                document.body.style.overflow = 'hidden';
                console.log('[debug] overlay classList:', mobileMenuOverlay.className);
                const cs = window.getComputedStyle(mobileMenuOverlay);
                console.log('[debug] overlay computed style:', { display: cs.display, visibility: cs.visibility, opacity: cs.opacity, zIndex: cs.zIndex });
        }
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function (event) {
            if (event.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }

    if (headerLogo) {
        headerLogo.addEventListener('click', function (event) {
            console.log('[debug] headerLogo clicked');
            event.preventDefault();
            const homeSection = document.querySelector('#home');
            // On small screens, open the mobile menu instead of navigating
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            console.log('[debug] isMobile:', isMobile);
            if (isMobile && mobileMenuOverlay) {
                console.log('[debug] opening mobile menu from headerLogo');
                mobileMenuOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                return;
            }
                console.log('[debug] headerLogo clicked — opening overlay');
                // Prevent other handlers from interfering
                event.stopPropagation();
                event.preventDefault();
                if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                // Always open the mobile overlay when logo is clicked (reliable UX)
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                }
                return;
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            // Ignore the header logo anchor here — it has its own handler above
            if (this.classList && this.classList.contains('header-logo')) {
                return;
            }
            event.preventDefault();
            const href = this.getAttribute('href');
            if (!href || href === '#') {
                return;
            }
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            closeMobileMenu();
        });
    });
});
