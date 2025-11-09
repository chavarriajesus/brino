// app/scripts/components/pageheader.js
export function PageHeader({ title = '', actions = '' }) {
  const header = document.createElement('header');
  header.className = 'page-header';
  header.innerHTML = `
    <h1>${title}</h1>
    <div class="actions">${actions}</div>
  `;
  return header;
}
