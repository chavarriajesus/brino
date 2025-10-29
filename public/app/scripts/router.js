import { LoginPage } from './pages/login.js';
import { DashboardPage } from './pages/dashboard.js';
import { getUser } from './state/store.js';

export function mountRoute(outlet) {
  const path = location.pathname.replace(/^\/+|\/+$/g, '');
  const sub = path.split('/').slice(1).join('/'); // after "app"
  const user = getUser(); // null if not logged in

  outlet.innerHTML = '';



  if (!user && sub !== 'login') {
    // redirect to login
    history.replaceState({}, '', '/app/login');
    outlet.appendChild(LoginPage());
    return;
  }

  if (sub === 'login') {
    outlet.appendChild(LoginPage());
    return;
  }

  // default authenticated route
  outlet.appendChild(DashboardPage());
}

// client-side nav helper (optional)
export function navigate(to) {
  history.pushState({}, '', to);
  const outlet = document.querySelector('#app');
    if (outlet) mountRoute(outlet);
}

window.addEventListener('popstate', () => {
    const outlet = document.querySelector('#app');
    if (outlet) mountRoute(outlet);
});