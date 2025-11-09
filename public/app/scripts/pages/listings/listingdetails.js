// app/scripts/pages/listings/listingdetails.js
import { API_BASE } from '../../config/config.js';
import { createSlider } from '../../components/slider.js';
import { PageHeader } from '../../components/pageheader.js';


export function ListingDetailsPage(listingId) {
  const el = document.createElement('section');
  el.className = 'page listing-details';

  // --- HEADER ---
  const editButtonHtml = `<button id="edit-listing-btn">Editar</button>`;
  const header = PageHeader({
    title: 'Detalles de la Propiedad',
    actions: editButtonHtml
  });

  // --- MAIN CONTAINER ---
  const container = document.createElement('div');
  container.className = 'listing-details-container';
  container.innerHTML = `<p class="loading">Cargando detalles...</p>`;

  // --- Assemble structure ---
  el.appendChild(header);
  el.appendChild(container);

  // ✅ Now nothing gets overwritten later
  async function loadListing() {
    try {
      const res = await fetch(`${API_BASE}/app/api/listingdetails.php?id=${listingId}`);
      const data = await res.json();
      console.log('API response:', data);

      if (!data.ok) {
        container.innerHTML = `<p class="error">❌ Error: ${data.error || 'No se pudo obtener la información.'}</p>`;
        return;
      }

      const p = data?.data?.listing;
      const images = data?.data?.images || [];

      if (!p) {
        container.innerHTML = `<p class="empty">No se encontró la propiedad.</p>`;
        return;
      }

      const { el: sliderEl } = createSlider(images.map(img => img.img_url));

      container.innerHTML = `
        <div id="listing-slider"></div>
        <div id="listing-details-container">
          <div id="listing-details-characteristics">
              <p><strong>Nombre:</strong> ${p.nombre || ''}</p>
              <p><strong>Tipo:</strong> ${p.tipo || ''}</p>
              <p><strong>Zona:</strong> ${p.zona || ''}</p>
              <p><strong>Colonia:</strong> ${p.colonia || ''}</p>
              <p><strong>Precio:</strong> ${p.precio || ''}</p>
              <p><strong>Detalles:</strong> ${p.areas || ''}</p>
          </div>
        </div>
      `;
      container.querySelector('#listing-slider').appendChild(sliderEl);
    } catch (err) {
      console.error(err);
      container.innerHTML = `<p class="error">❌ Error de conexión. Verifica tu red o intenta más tarde.</p>`;
    }
  }

  loadListing();

  // ✅ Attach listener after header is appended (and preserved)
  el.addEventListener('click', (e) => {
    if (e.target.id === 'edit-listing-btn') {
      window.dispatchEvent(
        new CustomEvent('module-navigate', {
          detail: { page: 'editlisting', id: listingId }
        })
      );
    }
  });

  return el;
}

