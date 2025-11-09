/**
 * A lightweight, dependency-free image slider.
 * Supports buttons, dots, keyboard arrows, and swipe.
 *
 * Usage:
 *   import { createSlider } from '../../components/slider.js';
 *   const { el, destroy } = createSlider(imageUrls);
 *   container.appendChild(el);
 */

export function createSlider(imageUrls = []) {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    const fallback = document.createElement("div");
    fallback.className = "slider-empty";
    fallback.textContent = "No hay imágenes disponibles.";
    return { el: fallback, destroy: () => {} };
  }

  // --- Create DOM ---
  const el = document.createElement("div");
  el.className = "slider relative overflow-hidden rounded-xl shadow-md";

  el.innerHTML = `
    <div class="slides flex transition-transform duration-500 ease-in-out"></div>
    <button class="prev absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full w-8 h-8 flex items-center justify-center shadow-md">&#10094;</button>
    <button class="next absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full w-8 h-8 flex items-center justify-center shadow-md">&#10095;</button>
    <div class="dots absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2"></div>
  `;

  const slidesEl = el.querySelector(".slides");
  const dotsEl = el.querySelector(".dots");
  const prevBtn = el.querySelector(".prev");
  const nextBtn = el.querySelector(".next");

  let current = 0;
  let touchStartX = 0;

  // --- Build slides ---
  imageUrls.forEach((url, idx) => {
    const slide = document.createElement("div");
    slide.className = "slide flex-none w-full";
    slide.innerHTML = `<img src="${url}" alt="Imagen ${idx + 1}" class="w-full h-auto object-cover" />`;
    slidesEl.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "dot w-3 h-3 rounded-full bg-white/60 hover:bg-white transition";
    dot.dataset.index = idx;
    dotsEl.appendChild(dot);
  });

  const dots = dotsEl.querySelectorAll(".dot");

  // --- Helpers ---
  const updateSlider = () => {
    slidesEl.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) =>
      d.classList.toggle("bg-white", i === current)
    );
  };

  const next = () => {
    current = (current + 1) % imageUrls.length;
    updateSlider();
  };

  const prev = () => {
    current = (current - 1 + imageUrls.length) % imageUrls.length;
    updateSlider();
  };

  const goTo = (index) => {
    current = index;
    updateSlider();
  };

  // --- Event listeners ---
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  dots.forEach((dot) =>
    dot.addEventListener("click", (e) => goTo(Number(e.target.dataset.index)))
  );

  // Keyboard navigation
  const handleKey = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };
  document.addEventListener("keydown", handleKey);

  // Swipe support (touch)
  slidesEl.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  slidesEl.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? prev() : next();
    }
  });

  // --- Init ---
  updateSlider();

  // --- Cleanup for SPA ---
  const destroy = () => {
    nextBtn.removeEventListener("click", next);
    prevBtn.removeEventListener("click", prev);
    dots.forEach((dot) =>
      dot.removeEventListener("click", (e) =>
        goTo(Number(e.target.dataset.index))
      )
    );
    document.removeEventListener("keydown", handleKey);
  };

  return { el, destroy };
}
