import { API_BASE } from '../../config/config.js';

export function EditListingPage(listingId) {
  const id = listingId || window.location.pathname.split('/').pop();
  const el = document.createElement('section');
  el.className = 'page propiedades';
  el.innerHTML = `
    <h1>Edit ${id}</h1>
    <div class="propiedades-container">
      <p class="loading">Cargando propiedades...</p>
    </div>
  `;

  const container = el.querySelector('.propiedades-container');

  async function loadPropiedades() {
    try {
      const res = await fetch(`${API_BASE}/app/api/propiedades.php`);
      const data = await res.json();

      if (!data.ok) {
        container.innerHTML = `<p class="error">❌ Error: ${data.error || 'No se pudo obtener la información.'}</p>`;
        return;
      }

      if (!data.propiedades || data.propiedades.length === 0) {
        container.innerHTML = `<p class="empty">No hay propiedades registradas.</p>`;
        return;
      }

      // ✅ Build HTML table
      const table = document.createElement('table');
      table.className = 'propiedades-table';
      table.innerHTML = `
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Zona</th>
            <th>Colonia</th>
          </tr>
        </thead>
        <tbody>
          ${data.propiedades
            .map(
              (p) => `
            <tr>
              <td>${p.nombre || ''}</td>
              <td>${p.tipo || ''}</td>
              <td>${p.zona || ''}</td>
              <td>${p.colonia || ''}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      `;

      container.innerHTML = '';
      container.appendChild(table);
    } catch (err) {
      console.error(err);
      container.innerHTML = `<p class="error">❌ Error de conexión. Verifica tu red o intenta más tarde.</p>`;
    }
  }

  loadPropiedades();

  return el;
}
