// ========================================
// CORSO RUST LINUX DESKTOP - SCRIPT GLOBALE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // ACTIVE LINK DETECTION
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // ========================================
    // COPY BUTTON MANAGEMENT
    // ========================================
    const preBlocks = document.querySelectorAll('pre');
    preBlocks.forEach(pre => {
        // Crea wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        // Crea bottone con icona copia
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '📋'; // Icona copia
        button.setAttribute('title', 'Copia al clipboard');
        button.setAttribute('aria-label', 'Copia codice');
        wrapper.appendChild(button);

        // Event listener per copia
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const code = pre.querySelector('code') 
                ? pre.querySelector('code').textContent 
                : pre.textContent;

            navigator.clipboard.writeText(code).then(function() {
                // Feedback visivo
                button.innerHTML = '✓'; // Check
                button.classList.add('copied');

                setTimeout(function() {
                    button.innerHTML = '📋';
                    button.classList.remove('copied');
                }, 2000);
            }).catch(function(err) {
                console.error('Errore copia:', err);
                button.innerHTML = '✗';
            });
        });
    });

    // ========================================
    // MENU MOBILE
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        // Toggle menu click
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });

        // Chiudi menu quando clicchi link
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 900) {
                    sidebar.classList.remove('open');
                }
            });
        });

        // Chiudi menu click esterno
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });

        // Chiudi menu su resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 900) {
                sidebar.classList.remove('open');
            }
        });
    }

    // ========================================
    // SMOOTH SCROLL ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // KEYBOARD SHORTCUTS
    // ========================================
    document.addEventListener('keydown', function(e) {
        // Alt+M: Toggle menu (mobile)
        if (e.altKey && e.key === 'm') {
            if (menuToggle) {
                menuToggle.click();
            }
        }

        // Esc: Chiudi menu
        if (e.key === 'Escape' && sidebar && window.innerWidth <= 900) {
            sidebar.classList.remove('open');
        }
    });
});
