// appshell.js
import { TopBar } from "./topbar.js";
import { Sidebar } from "./sidebar.js";
import { getUser } from "../state/store.js";

export function createAppShell(defaultModule) {
  const appShell = document.createElement("div");
  appShell.className = "app-shell";

  const user = getUser();

  const topBar = TopBar({
    username: user?.nombre || user?.email || "Guest",
  });

  const sidebar = Sidebar();

  const main = document.createElement("main");
  main.className = "module-container";
  main.appendChild(defaultModule);

  appShell.append(topBar, sidebar, main);

  return { appShell, main, sidebar };
}
