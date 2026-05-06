// ─── Détection du chemin de base selon la page courante ───
// index.html est à la racine, les autres pages sont dans /pages/
const isRoot =
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname.endsWith("/") ||
  window.location.pathname.split("/").filter(Boolean).length <= 1;

const base = isRoot ? "" : "../";

// ─── Chargement dynamique header / footer ─────────────────
async function loadComponent(id, path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Erreur chargement ${path} : ${res.status}`);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
    if (id === "header-placeholder") {
      initHamburger();
      setActiveLink();
    }
  } catch (err) {
    console.error(err);
  }
}

loadComponent("header-placeholder", `${base}pages/header.html`);
loadComponent("footer-placeholder", `${base}pages/footer.html`);

// ─── Menu Hamburger ─────────────────────────────────────────
function initHamburger() {
  const hamburger = document.querySelector(".nav-hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (!hamburger || !navLinks) {
    console.warn("initHamburger : éléments introuvables.");
    return;
  }

  let overlay = document.querySelector(".nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.classList.add("nav-overlay");
    document.body.appendChild(overlay);
  }

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
    navLinks.classList.contains("open") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
}

// ─── Lien actif dans la navbar ────────────────────────────
function setActiveLink() {
  const currentPath = window.location.pathname;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href &&
      currentPath.endsWith(href.replace(/^\//, "").replace(/^\.\.\//, ""))
    ) {
      link.classList.add("active");
    }
  });
}

// ─── Compte à rebours ─────────────────────────────────────
const cible = new Date("2027-04-04T13:00:00").getTime();

function pad(n) {
  return String(n).padStart(2, "0");
}

function animerFlip(el, newVal) {
  if (el && el.textContent !== newVal) {
    el.classList.remove("flip");
    void el.offsetWidth;
    el.classList.add("flip");
    el.textContent = newVal;
  }
}

function mettreAJour() {
  const diff = cible - Date.now();

  const jours = document.getElementById("cd-jours");
  const heures = document.getElementById("cd-heures");
  const minutes = document.getElementById("cd-minutes");
  const secondes = document.getElementById("cd-secondes");

  if (!jours) return;

  if (diff <= 0) {
    [jours, heures, minutes, secondes].forEach((el) => {
      if (el) el.textContent = "00";
    });
    return;
  }

  animerFlip(jours, pad(Math.floor(diff / 86400000)));
  animerFlip(heures, pad(Math.floor((diff % 86400000) / 3600000)));
  animerFlip(minutes, pad(Math.floor((diff % 3600000) / 60000)));
  animerFlip(secondes, pad(Math.floor((diff % 60000) / 1000)));
}

mettreAJour();
setInterval(mettreAJour, 1000);

// ─── FAQ accordion ────────────────────────────────────────
function toggleFaq(el) {
  const item = el.closest(".faq-item");
  const isOpen = item.classList.contains("open");
  document
    .querySelectorAll(".faq-item")
    .forEach((i) => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}
