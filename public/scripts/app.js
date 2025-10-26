
// public/scripts/app.js

// ---------- Helpers ----------
async function loadJSON(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`);
  return res.json();
}

const $ = (sel) => document.querySelector(sel);

// ---------- Renderers ----------
function renderHeader(global) {
  const header = $("#site-header");
  if (!header) return;

  header.innerHTML = `
    <div class="header-grid">
      <a href="/" class="brand"  aria-label="${global.siteTitle}">
        <img src="/assets/images/logo_brino.png" onerror="this.src='/assets/images/logo_brino.png'"
             alt="${global.siteTitle}" class="brand-logo">
      </a>
      <nav class="nav">
        ${(global.nav || [])
          .map((i) => `<a href="${i.href}" class="${i.class || ''}" >${i.label}</a>`)
          .join("")}
      </nav>
    </div>
  `;
}

function renderHero(page) {
  console.log("[renderHero] page:", page);
  if (!page?.showHero || !page?.hero) return;



  const { heading = "", subheading = "", ctaText = "", ctaHref = "#", bgImage = "" } =
    page.hero || {};

  const hero = document.createElement('section');

  hero.className = 'hero';
  hero.id = 'hero';
  if(bgImage) hero.style.backgroundImage = `url('${bgImage}')` ;

  hero.innerHTML = `
    
      <div class="hero-inner">
        ${heading ? `<h2>${heading}</h2>` : ""}
        ${subheading ? `<p>${subheading}</p>` : ""}
        ${
          ctaText
            ? `<a class="btn" href="${ctaHref || "#"}">${ctaText}</a>`
            : ""
        }
      </div>
  
  `;
   
  

    const main = document.querySelector('#main');
    if (main) {
    document.body.insertBefore(hero, main);
     } else if (header) {
    document.body.insertAdjacentElement('afterend', hero);
     } else {
    document.body.appendChild(hero);
     }

  //if (!main) return;
}
/*
function renderCards(page) {
  const main = $("#main");
  if (!main) return;

  const cards = page.cards || [];
  if (!cards.length) return;

  const minHeightStyle = page.cardMinHeight
  ? `min-height: ${page.cardMinHeight};` : '';

  const cardH3Color = page.cardH3Color
  ? `color: ${page.cardH3Color};` : '';
  

  const sectionHTML = `
    <section class="masonry" id="cards" >
      ${cards
        .map(
          (c) => { 
            const bgStyle = c.bgImage ? `background-image : url('${c.bgImage}');` : '';
            const spanClass = c.span ? ` span-${c.span}` : '';
           return `
        <article class="item${spanClass}" style="${minHeightStyle} ${bgStyle}" >
          ${c.title ? `<h3 style="${cardH3Color}">${c.title}</h3>` : ""}
          ${c.body ? `<p>${c.body}</p>` : ""}
          ${
            c.image
              ? `<img src="${c.image}" alt="${c.title || "Card image"}">`
              : ""
          }
        </article>
      `
        })
        .join("")}
    </section>
  `;

  main.insertAdjacentHTML("beforeend", sectionHTML);
}
*/

function renderCardsSection(sec, main) {
  const styleVars = [];
  if (sec.bgColor)   styleVars.push(`--section-bg:${sec.bgColor}`);
  if (sec.textColor) styleVars.push(`--section-fg:${sec.textColor}`);
  const sectionStyle = styleVars.length ? ` style="${styleVars.join(';')}"` : '';
  const idAttr = sec.id ? ` id="${sec.id}"` : '';
  const title = sec.title ? `<div style="text-align: center; max-width: 600px; margin:auto;"><h2>${sec.title}</h2></div>` : '';

  const cardsHTML = (sec.cards || []).map(c => {
    const styles = [
      c.bgImage   ? `background-image:url('${c.bgImage}')` : '',
       sec.cardMinHeight? `min-height:${sec.cardMinHeight}`             : ''
    ].filter(Boolean).join(';');
    const spanClass = c.span ? ` span-${c.span}` : '';
    return `<article class="item${spanClass}" ${styles ? `style="${styles}"` : ''}>
              ${c.image ? `<img src="${c.image}" style="width: 100%;">` : ''}
              ${c.title ? `<h3>${c.title}</h3>` : ''}
              ${c.body  ? `<p>${c.body}</p>`   : ''}
            </article>`;
  }).join('');

  main.insertAdjacentHTML('beforeend', `
    <section class="section cards-section"${idAttr}${sectionStyle}>
    ${title}
      <div class="masonry">${cardsHTML}</div>
    </section>
  `);
}

function renderContentSection(sec, main) {
  const styleVars = [];
  if (sec.bgColor)   styleVars.push(`--section-bg:${sec.bgColor}`);
  if (sec.textColor) styleVars.push(`--section-fg:${sec.textColor}`);
  if (sec.maxWidth)  styleVars.push(`--section-max:${sec.maxWidth}`);
  if (sec.align)     styleVars.push(`--section-align:${sec.align}`);
  if (sec.customStyle)     styleVars.push(`${sec.customStyle}`);
  const sectionStyle = styleVars.length ? ` style="${styleVars.join(';')}"` : '';
  const idAttr = sec.id ? ` id="${sec.id}"` : '';

  if (sec.align)     styleVars.push(`--section-align:${sec.align}`);
  const sectionSpanClass = sec.sectionSpan ? `span-${sec.sectionSpan}` : '';

 const blocks = (sec.content || []).map(b => {
  const tag = (b.tag || 'p').toLowerCase();

  // Allow only safe HTML tags
  const safeTags = ['h1','h2','h3','h4','h5','h6','p','ul','ol','li','blockquote','img'];
  if (!safeTags.includes(tag)) return '';

  const itemStyleVars = [];
  if (b.itemCustomStyle)     itemStyleVars.push(`${b.itemCustomStyle}`);
  if (b.width)     itemStyleVars.push(`width:${b.width};`);
  const itemStyle = itemStyleVars.length ? ` style="${itemStyleVars.join(';')}"` : '';

  // Handle images separately
  if (tag === 'img') {

    
    const src = b.src ? b.src : '';
    const alt = b.alt ? b.alt : '';
    //const width = b.width ? ` style="width:${b.width};"` : '';
    return `<img src="${src}" alt="${alt}" ${itemStyle}>`;
  }

  // Regular text tags
  return `<${tag} ${itemStyle}>${b.text || ''}</${tag}>`;
}).join('');

  main.insertAdjacentHTML('beforeend', `
    <section class="section ${sectionSpanClass} content-section"${idAttr}${sectionStyle}>
      <div class="content-container">${blocks}</div>
    </section>
  `);
}

function renderContainerSection(sec, main) {
  const styleVars = [];
  if (sec.bgColor) styleVars.push(`--section-bg:${sec.bgColor}`);
  if (sec.textColor) styleVars.push(`--section-fg:${sec.textColor}`);
  if (sec.maxWidth) styleVars.push(`--section-max:${sec.maxWidth}`);
  if (sec.align) styleVars.push(`--section-align:${sec.align}`);
  if (sec.customStyle) styleVars.push(`${sec.customStyle}`);
  const sectionStyle = styleVars.length ? ` style="${styleVars.join(';')}"` : '';
  const idAttr = sec.id ? ` id="${sec.id}"` : '';
  const sectionSpanClass = sec.sectionSpan ? `span-${sec.sectionSpan}` : '';

  // Build each column
  const columns = (sec.content || []).map(col => {
    const colStyleVars = [];
    if (col.align) colStyleVars.push(`text-align:${col.align};`);
    if (col.customStyle) colStyleVars.push(col.customStyle);
    const colStyle = colStyleVars.length ? ` style="${colStyleVars.join(';')}"` : '';
    const colId = col.id ? ` id="${col.id}"` : '';
    const itemSpanClass = col.itemSpan ? `span-${col.itemSpan}` : '';

    // Build items within the column
    const colItems = (col.items || []).map(b => {
      const tag = (b.tag || 'p').toLowerCase();
      const safeTags = ['h1','h2','h3','h4','h5','h6','p','ul','ol','li','blockquote','img'];
      if (!safeTags.includes(tag)) return '';

      const itemStyleVars = [];
      if (b.itemCustomStyle) itemStyleVars.push(b.itemCustomStyle);
      if (b.width) itemStyleVars.push(`width:${b.width};`);
      const itemStyle = itemStyleVars.length ? ` style="${itemStyleVars.join(';')}"` : '';

      if (tag === 'img') {
        const src = b.src || '';
        const alt = b.alt || '';
        return `<img src="${src}" alt="${alt}" ${itemStyle}>`;
      }

      return `<${tag} ${itemStyle}>${b.text || ''}</${tag}>`;
    }).join('');

    return `<div class="container-item ${itemSpanClass}" ${colId}${colStyle}>${colItems}</div>`;
  }).join('');

  const reverseClass = sec.reverse ? 'reverse' : '';
  main.insertAdjacentHTML('beforeend', `
    <section class="section ${sectionSpanClass} container-section"${idAttr}${sectionStyle}>
      <div class="container-grid ${reverseClass} ">${columns}</div>
    </section>
  `);
}


function renderSections(page){
  const main = document.querySelector('#main');
  if (!main) return;
  const sections = page.sections || [];

  sections.forEach(sec => {
    if (sec.type === 'cards') return renderCardsSection(sec, main);
    if (sec.type === 'content') return renderContentSection(sec, main);
    if (sec.type === 'container') return renderContainerSection(sec, main);

    
  });
}

/*
function renderSections(page){
  const main = document.querySelector('#main');
  if (!main) return;
  const sections = page.sections || [];
  sections.forEach(sec => {
    if (sec.type !== 'cards') return;

    const styleParts = [];
    if (sec.bgColor)   styleParts.push(`--section-bg:${sec.bgColor}`);
    if (sec.textColor) styleParts.push(`--section-fg:${sec.textColor}`);
    //if (sec.cardMinHeight) styleParts.push(`--min-height:${sec.cardMinHeight}`);
    const styleAttr = styleParts.length ? ` style="${styleParts.join(';')}"` : '';

    const cardsHTML = (sec.cards || []).map(c => {
      const styles = [
        c.bgImage  ? `background-image:url('${c.bgImage}')` : '',
        sec.cardMinHeight? `min-height:${sec.cardMinHeight}`             : ''
      ].filter(Boolean).join(';');
      const spanClass = c.span ? ` span-${c.span}` : '';
      return `<article class="item${spanClass}" ${styles ? `style="${styles}"` : ''}>
                ${c.title ? `<h3>${c.title}</h3>` : ''}
                ${c.body  ? `<p>${c.body}</p>`   : ''}
              </article>`;
    }).join('');

    const html = `
      <section class="section cards-section"${styleAttr} ${sec.id ? `id="${sec.id}"` : ''}>
        <div class="masonry">
          ${cardsHTML}
        </div>
      </section>
    `;
    main.insertAdjacentHTML('beforeend', html);
  });
}
*/
function renderFooter(global) {
  const footer = $("#site-footer");
  //if (footer) footer.textContent = global.footerText || "";

if (!footer) return;

  footer.innerHTML = `
    <div class="footer-grid">
    <div  class="footer-item span-2" style="justify-self: start; color: #fff;">Copyright BRINO 2025</div> 
    <div class="footer-item span-2" style="justify-self: end">
      <a href="/" class="brand" aria-label="${global.siteTitle}">
        <img src="/assets/images/logo_brino.png" onerror="this.src='/assets/images/logo_brino.png'"
             alt="${global.siteTitle}" class="brand-logo" style="height: 25px;">
      </a>
    </div>  
    </div>
  `;

}

function slugFromPath() {
  const raw = location.pathname.replace(/^\/+|\/+$/g,'');
  return raw || 'home';
}
// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("[boot] Starting app.js load…");
    const slug = slugFromPath();
    console.log("[slug] page:", slug);

    // Hardcode home.json while we debug slug logic
    const [global, page] = await Promise.all([
      loadJSON("/content/global.json"),
      loadJSON(`/content/pages/${slug}.json`),
    ]);

    console.log("[boot] global:", global);
    console.log("[boot] page:", page);

    renderHeader(global);
    renderHero(page);
    //renderCards(page);
    renderSections(page);
    renderFooter(global);
  } catch (err) {
    console.error("[boot] Error:", err);
    const main = $("#main");
    if (main)
      main.innerHTML = `<section class="error">
        <h2>Content failed to load</h2>
        <p>${err.message}</p>
      </section>`;
  }
});