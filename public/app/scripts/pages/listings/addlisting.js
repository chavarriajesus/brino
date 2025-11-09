// /pages/listings/addlisting.js

import { API_BASE } from '../../config/config.js';

export function AddListingPage() {
  const el = document.createElement('section');
  el.className = 'page add-listing';
  el.innerHTML = `<h2>Add Listing</h2><p>Hello world! The Add Listing page works.</p>`;
  return el;
}
