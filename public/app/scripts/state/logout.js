// state/logout.js
import { clearPendingEmail } from './store.js';
import { navigate } from '../router.js';

export function logout() {
  // Clear local user data
  localStorage.removeItem('user');
  clearPendingEmail();

  // Dispatch event for any listeners
  window.dispatchEvent(new Event('logout'));

  // Redirect to login
  navigate('/app/login');
}
