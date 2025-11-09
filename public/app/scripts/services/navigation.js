// navigation.js
import { ListingsPage } from "../pages/listings/propiedades.js";
import { AddListingPage } from "../pages/listings/addlisting.js";
import { EditListingPage } from "../pages/listings/editlisting.js";
import { ListingDetailsPage } from "../pages/listings/listingdetails.js";

/**
 * Handles dashboard module navigation.
 * Updates the main content, sidebar highlighting, and URL dynamically.
 */
export function handleModuleNavigation(main, sidebar, dashboardContent) {
  const moduleToPath = {
    dashboard: "/app/",
    propiedades: "/app/listings",
    addlisting: "/app/listings/add",
    editlisting: "/app/listings/edit/:id",
    listingdetails: "/app/listings/:id",
    contactos: "/app/contactos",
    contactdetails: "/app/contactos/:id",
    usuarios: "/app/usuarios",
    userdetails: "/app/usuarios/:id",
  };

  const pathToModule = Object.fromEntries(
    Object.entries(moduleToPath).map(([k, v]) => [v.replace(/^\/app/, ""), k])
  );

  function renderModule(page, id = null) {
    main.innerHTML = "";

    switch (page) {
      case "dashboard":
        main.appendChild(dashboardContent);
        break;

      case "propiedades":
        main.appendChild(ListingsPage());
        break;
      case "addlisting":
        main.appendChild(AddListingPage());
        break;
      case "editlisting":
        main.appendChild(EditListingPage());
        break;
      case "listingdetails":
        main.appendChild(ListingDetailsPage(id));
        break;

      case "contactos":
        main.innerHTML = "<h2>Contactos</h2><p>Coming soon...</p>";
        break;
      case "contactdetails":
        main.innerHTML = `<h2>Contacto ${id}</h2><p>Details coming soon...</p>`;
        break;

      case "usuarios":
        main.innerHTML = "<h2>Usuarios</h2><p>Coming soon...</p>";
        break;
      case "userdetails":
        main.innerHTML = `<h2>Usuario ${id}</h2><p>Details coming soon...</p>`;
        break;

      default:
        main.innerHTML = `<h2>${page}</h2><p>Coming soon...</p>`;
    }

    // Tell sidebar which main module to highlight
    const highlight =
      page.includes("listing") ? "propiedades" :
      page.includes("contact") ? "contactos" :
      page.includes("user") ? "usuarios" :
      page;

    sidebar.setActive(highlight);
  }

  // --- Handle navigation events ---
  window.addEventListener("module-navigate", (e) => {
    const { page, id, fromPopstate } = e.detail || {};
    if (!page) return;

    renderModule(page, id);

    if (!fromPopstate) {
      let newPath = moduleToPath[page] || "/app/";
      if (newPath.includes(":id") && id)
        newPath = newPath.replace(":id", id);

      const lastState = history.state;
      if (!lastState || lastState.page !== page || lastState.id !== id) {
        history.pushState({ page, id }, "", newPath);
      }
    }
  });

  // --- Handle browser back/forward ---
  window.addEventListener("popstate", (e) => {
    const page = e.state?.page || "dashboard";
    const id = e.state?.id || null;
    window.dispatchEvent(
      new CustomEvent("module-navigate", {
        detail: { page, id, fromPopstate: true },
      })
    );
  });

  // --- Initial load ---
  const path = location.pathname.replace(/^\/app/, "");
  let initialModule = "dashboard";
  let entityId = null;

  // Match any /something/:id pattern
  const match = path.match(/^\/(\w+)(?:\/(\w+))?(?:\/(\d+))?/);
if (match) {
  const [, resource, subroute, id] = match;
  if (["listings", "usuarios", "contactos"].includes(resource)) {
    if (subroute === "edit" && id) {
      initialModule =
        resource === "listings"
          ? "editlisting"
          : resource === "usuarios"
          ? "edituser"
          : "editcontact";
      entityId = id;
    } else if (id) {
      initialModule =
        resource === "listings"
          ? "listingdetails"
          : resource === "usuarios"
          ? "userdetails"
          : "contactdetails";
      entityId = id;
    } else {
      initialModule =
        resource === "listings"
          ? "propiedades"
          : resource === "usuarios"
          ? "usuarios"
          : "contactos";
    }
  }
}


  renderModule(initialModule, entityId);
}
