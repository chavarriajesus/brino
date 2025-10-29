export function getUser() {
  return JSON.parse(localStorage.getItem('user') || 'null');
}
export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}