import { LoginPage } from './pages/login.js';
import { VerifyPage } from './pages/verify.js';
import { DashboardPage } from './pages/dashboard.js';
import { ListingsPage } from './pages/listings/propiedades.js';
//import { AddListingPage } from "../pages/listings/addlisting.js";
//import { EditListingPage } from "../pages/listings/editlisting.js";
import { getUser } from './state/store.js';

export function mountRoute(outlet) {
  const path = location.pathname.replace(/^\/+|\/+$/g, '');
  const sub = path.split('/').slice(1).join('/'); // after "app"
  const user = getUser(); // null if not logged in

  outlet.innerHTML = '';

if (!user) {
  if (sub === 'login')  {outlet.appendChild(LoginPage()); return;}
  if (sub === 'verify')  {outlet.appendChild(VerifyPage()); return;}

  history.replaceState({}, '', '/app/login');
  outlet.appendChild(LoginPage());
  return;
}

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