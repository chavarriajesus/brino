import { createAppShell } from "../components/appshell.js";
import { handleModuleNavigation } from "../services/navigation.js";

export function DashboardPage() {
  const dashboardContent = document.createElement('section');
  dashboardContent.className = 'page dashboard';
  dashboardContent.innerHTML = `
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard.</p>
    <button id="logout-btn">Logout</button>
  `;
  dashboardContent.querySelector('#logout-btn').addEventListener('click', () => {
    window.dispatchEvent(new Event('logout'));
  });

  const { appShell, main, sidebar } = createAppShell(dashboardContent);

  handleModuleNavigation(main, sidebar, dashboardContent);

  return appShell;
}
