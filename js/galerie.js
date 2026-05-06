/* ===========================
   GALERIE — galerie.js
   Carrousel + Filtres + Grille
=========================== */

document.addEventListener("DOMContentLoaded", () => {
  // ── Données slides ─────────────────────────────
  const allSlides = Array.from(document.querySelectorAll(".carrousel-slide"));
  const track = document.getElementById("carrouselTrack");
  const dotsWrap = document.getElementById("carrouselDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const currentEl = document.getElementById("currentSlide");
  const totalEl = document.getElementById("totalSlides");

  let visibleSlides = [...allSlides];
  let current = 0;
  let autoTimer = null;

  // ── Génération des dots ─────────────────────────
  function buildDots() {
    dotsWrap.innerHTML = "";
    visibleSlides.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", `Slide ${i + 1}`);
      d.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(d);
    });
  }

  // ── Mise à jour affichage ───────────────────────
  function update() {
    // Repositionner la piste sur les slides visibles
    const offset = current * 100;
    track.style.transform = `translateX(-${offset}%)`;

    // Dots
    document.querySelectorAll(".dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });

    // Compteur
    currentEl.textContent = current + 1;
    totalEl.textContent = visibleSlides.length;
  }

  function goTo(index) {
    current = (index + visibleSlides.length) % visibleSlides.length;
    update();
  }

  function next() {
    goTo(current + 1);
  }
  function prev() {
    goTo(current - 1);
  }

  // ── Contrôles ───────────────────────────────────
  nextBtn.addEventListener("click", () => {
    next();
    resetAuto();
  });
  prevBtn.addEventListener("click", () => {
    prev();
    resetAuto();
  });

  // Swipe tactile
  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    resetAuto();
  });

  // Clavier
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      next();
      resetAuto();
    }
    if (e.key === "ArrowLeft") {
      prev();
      resetAuto();
    }
  });

  // ── Auto-play ───────────────────────────────────
  function startAuto() {
    autoTimer = setInterval(next, 4500);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // ── Filtres ─────────────────────────────────────
  const filtresBtns = document.querySelectorAll(".filtre-btn");
  const gridItems = document.querySelectorAll(".galerie-item");

  function applyFiltre(filtre) {
    // Filtrer les slides du carrousel
    allSlides.forEach((s) => (s.style.display = "none"));

    visibleSlides = allSlides.filter((s) => {
      if (filtre === "tout") return true;
      return s.dataset.type === filtre;
    });

    visibleSlides.forEach((s) => (s.style.display = ""));

    // Reconstruire les dots et réinitialiser
    current = 0;
    buildDots();
    update();

    // Filtrer la grille
    gridItems.forEach((item) => {
      if (filtre === "tout" || item.dataset.type === filtre) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  }

  filtresBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filtresBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFiltre(btn.dataset.filtre);
      resetAuto();
    });
  });

  // ── Miniatures → ouvrir dans le carrousel ───────
  gridItems.forEach((item) => {
    item.addEventListener("click", () => {
      const index = parseInt(item.dataset.index, 10);

      // Activer le filtre correspondant si besoin
      const type = item.dataset.type;
      filtresBtns.forEach((b) => b.classList.remove("active"));
      document.querySelector('[data-filtre="tout"]').classList.add("active");
      applyFiltre("tout");

      // Trouver la position de la slide dans visibleSlides
      const pos = visibleSlides.findIndex((_, i) => i === index);
      goTo(index < visibleSlides.length ? index : 0);

      // Scroll vers le carrousel
      document
        .querySelector(".galerie-section")
        .scrollIntoView({ behavior: "smooth", block: "center" });
      resetAuto();
    });
  });

  // ── Init ────────────────────────────────────────
  buildDots();
  update();
  startAuto();
});
