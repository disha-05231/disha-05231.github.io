(() => {
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav-links');
  const links = [...nav.querySelectorAll('a')];
  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Close' : 'Menu';
  };
  btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  links.forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  // Active nav link follows the section in view.
  const sections = [...document.querySelectorAll('main section[id]')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((s) => spy.observe(s));

  // Gentle scroll reveal; skipped entirely if the browser lacks support.
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const rv = new IntersectionObserver((entries, o) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); o.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach((el, i) => { el.style.transitionDelay = (i % 3) * 80 + 'ms'; rv.observe(el); });
  } else items.forEach((el) => el.classList.add('in'));

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
