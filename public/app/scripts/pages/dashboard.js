export function DashboardPage() {
    const el = document.createElement('section');
    el.className = 'page dashboard';
    el.innerHTML = '<h1>Dashboard</h1><p>You are logged in.</p>';
    return el;
}