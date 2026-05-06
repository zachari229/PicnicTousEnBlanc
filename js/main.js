// ─── Chargement dynamique header / footer ─────────────────
async function loadComponent(id, path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Erreur chargement ${path} : ${res.status}`);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

loadComponent("header-placeholder", "/pages/header.html");
loadComponent("footer-placeholder", "/pages/footer.html");


// ─── Compte à rebours ─────────────────
  
      const cible = new Date("2027-04-04T13:00:00").getTime();

      function pad(n) {
        return String(n).padStart(2, "0");
      }

      function animerFlip(el, newVal) {
        if (el.textContent !== newVal) {
          el.classList.remove("flip");
          void el.offsetWidth; // reflow
          el.classList.add("flip");
          el.textContent = newVal;
        }
      }

      function mettreAJour() {
        const maintenant = Date.now();
        const diff = cible - maintenant;

        if (diff <= 0) {
          document.getElementById("cd-jours").textContent = "00";
          document.getElementById("cd-heures").textContent = "00";
          document.getElementById("cd-minutes").textContent = "00";
          document.getElementById("cd-secondes").textContent = "00";
          return;
        }

        const jours = Math.floor(diff / (1000 * 60 * 60 * 24));
        const heures = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secondes = Math.floor((diff % (1000 * 60)) / 1000);

        animerFlip(document.getElementById("cd-jours"), pad(jours));
        animerFlip(document.getElementById("cd-heures"), pad(heures));
        animerFlip(document.getElementById("cd-minutes"), pad(minutes));
        animerFlip(document.getElementById("cd-secondes"), pad(secondes));
      }

      mettreAJour();
      setInterval(mettreAJour, 1000);

   

// ── FAQ accordion ──
        function toggleFaq(el) {
            const item = el.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        }


