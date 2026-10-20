const menuToggle = document.querySelector('.demos-page .hamburger');
const menu = document.querySelector('.demos-page .nav-menu');

function closeMenu() {
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('active');
}

menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(expanded));
    menuToggle.classList.toggle('active', expanded);
    menu.classList.toggle('active', expanded);
});

menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
    }
});
