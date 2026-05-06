// ─── Chargement dynamique header / footer ─────────────────
async function loadComponent(id, path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Erreur chargement ${path} : ${res.status}`);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
    // Initialiser le menu hamburger après chargement du header
    if (id === "header-placeholder") initHamburger();
  } catch (err) {
    console.error(err);
  }
}
loadComponent("header-placeholder", "/pages/header.html");
loadComponent("footer-placeholder", "/pages/footer.html");

// ─── Menu Hamburger ─────────────────────────────────────────
function initHamburger() {
  const hamburger = document.querySelector(".nav-hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Créer l'overlay s'il n'existe pas
  let overlay = document.querySelector(".nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.classList.add("nav-overlay");
    document.body.appendChild(overlay);
  }

  if (!hamburger || !navLinks) return;

  function openMenu() {
    hamburger.classList.add("open");
    navLinks.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  // Fermer le menu au clic sur un lien
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fermer au redimensionnement si > 768px
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
}

// ─── Compte à rebours ─────────────────────────────────────────
const cible = new Date("2027-04-04T13:00:00").getTime();

function pad(n) {
  return String(n).padStart(2, "0");
}

function animerFlip(el, newVal) {
  if (el && el.textContent !== newVal) {
    el.classList.remove("flip");
    void el.offsetWidth; // reflow
    el.classList.add("flip");
    el.textContent = newVal;
  }
}

function mettreAJour() {
  const maintenant = Date.now();
  const diff = cible - maintenant;

  const jours = document.getElementById("cd-jours");
  const heures = document.getElementById("cd-heures");
  const minutes = document.getElementById("cd-minutes");
  const secondes = document.getElementById("cd-secondes");

  if (!jours) return; // section non présente sur cette page

  if (diff <= 0) {
    [jours, heures, minutes, secondes].forEach((el) => {
      if (el) el.textContent = "00";
    });
    return;
  }

  const j = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  animerFlip(jours, pad(j));
  animerFlip(heures, pad(h));
  animerFlip(minutes, pad(m));
  animerFlip(secondes, pad(s));
}

mettreAJour();
setInterval(mettreAJour, 1000);

// ── FAQ accordion ──────────────────────────────────────────────
function toggleFaq(el) {
  const item = el.closest(".faq-item");
  const isOpen = item.classList.contains("open");
  document
    .querySelectorAll(".faq-item")
    .forEach((i) => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}
