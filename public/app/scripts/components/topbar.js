import { logout } from '../state/logout.js';

export function TopBar({ username }) {
  const el = document.createElement('header');
  el.className = 'top-bar';
  el.innerHTML = `
    <button class="menu-toggle" aria-label="Toggle menu">☰</button>
    <div class="logo"><img src="/app/assets/logo_brino.png" alt="Brino Logo" class="topbar-logo" style="width: 120px;"/></div>
    <div class="user-info">
        <span>${username || ''}</span>
        <button id="logout-btn">Logout</button>
    </div>
  `;

  el.querySelector('.menu-toggle').addEventListener('click', () => {
    document.body.classList.toggle('sidebar-open');
  });

  el.querySelector('#logout-btn').addEventListener('click', () => {
  logout();
});

  return el;
}

