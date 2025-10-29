import { mountRoute, navigate } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app') || (() => {
    const el = document.createElement('main'); el.id = 'app'; document.body.appendChild(el); return el;
  })();
  mountRoute(app);

  // Example: make any <a data-nav> use SPA nav
  document.body.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-nav]');
    if (a && a.getAttribute('href')?.startsWith('/app')) {
      e.preventDefault(); navigate(a.getAttribute('href'));
    }
  });
});