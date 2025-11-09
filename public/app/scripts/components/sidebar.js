// sidebar.js

// --- Define sidebar items (single source of truth) ---
export const navItems = [
  { page: "dashboard", label: "Dashboard", path: "/app/" },
  { page: "propiedades", label: "Propiedades", path: "/app/listings" },
  { page: "contactos", label: "Contactos", path: "/app/contactos" },
  { page: "usuarios", label: "Usuarios", path: "/app/usuarios" },
];

// --- Sidebar component ---
export function Sidebar() {
  const el = document.createElement("aside");
  el.className = "sidebar";

  el.innerHTML = `
    <button class="close-sidebar" aria-label="Close menu">×</button>
    <nav>
      <ul>
        ${navItems
          .map(
            (n) => `<li data-page="${n.page}" data-path="${n.path}">
                      ${n.label}
                    </li>`
          )
          .join("")}
      </ul>
    </nav>
  `;

  const listItems = el.querySelectorAll("li");

  // Handle clicks
  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      const page = item.dataset.page;
      const path = item.dataset.path;
      window.dispatchEvent(
        new CustomEvent("module-navigate", { detail: { page, path } })
      );
      document.body.classList.remove("sidebar-open");
    });
  });

  // Public method for highlighting
  el.setActive = function (page) {
    listItems.forEach((li) =>
      li.classList.toggle("active", li.dataset.page === page)
    );
  };

  // Close button
  el.querySelector(".close-sidebar").addEventListener("click", () => {
    document.body.classList.remove("sidebar-open");
  });

  return el;
}
