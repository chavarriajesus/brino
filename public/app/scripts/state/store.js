export function getUser() {
  return JSON.parse(localStorage.getItem('user') || 'null');
}
export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function setPendingEmail(e){ localStorage.setItem('pending_email', e); }
export function getPendingEmail(){ return localStorage.getItem('pending_email'); }
export function clearPendingEmail(){ localStorage.removeItem('pending_email'); }
