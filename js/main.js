/* ========================================
   SAPE & LUMIERE Festival â€” JavaScript
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* -- Countdown -- */
  const countdownEl = document.getElementById("countdown-timer");
  if (countdownEl) {
    const target = new Date("2026-11-20T18:00:00+01:00").getTime();
    function update() {
      const now = Date.now();
      const ms = Math.max(0, target - now);
      const d = Math.floor(ms / 86400000);
      const h = Math.floor((ms / 3600000) % 24);
      const m = Math.floor((ms / 60000) % 60);
      const s = Math.floor((ms / 1000) % 60);
      const nums = countdownEl.querySelectorAll(".countdown_number");
      if (nums.length >= 4) {
        nums[0].textContent = String(d).padStart(2, "0");
        nums[1].textContent = String(h).padStart(2, "0");
        nums[2].textContent = String(m).padStart(2, "0");
        nums[3].textContent = String(s).padStart(2, "0");
      }
    }
    update();
    setInterval(update, 1000);
  }

  /* -- Header scroll -- */
  const header = document.querySelector(".header");
  if (header && !header.classList.contains("header-scrolled")) {
    const onScroll = () => {
      header.classList.toggle("header-scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -- Mobile menu -- */
  const hamburger = document.querySelector(".header_hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuClose = document.querySelector(".mobile-menu_close");
  const mobileMenuOverlay = document.querySelector(".mobile-menu_overlay");
  const mobileMenuLinks = document.querySelectorAll(
    ".mobile-menu_link, .mobile-menu_cta",
  );

  function openMenu() {
    if (mobileMenu) mobileMenu.classList.add("open");
    if (hamburger) hamburger.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }
  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove("open");
    if (hamburger) hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (hamburger)
    hamburger.addEventListener("click", () => {
      if (mobileMenu && mobileMenu.classList.contains("open")) closeMenu();
      else openMenu();
    });
  if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMenu);
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener("click", closeMenu);
  mobileMenuLinks.forEach((link) => link.addEventListener("click", closeMenu));

  /* -- Scroll Reveal (IntersectionObserver) -- */
  const revealSelectors =
    ".section-header, .program-card, .artist-card, .billetterie_card, .faq-item, .partenaire-card, .media-card, .inscription_inner, .contact_form, .countdown_inner";
  const reveals = document.querySelectorAll(revealSelectors);
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("revealed"));
  }

  /* -- Scroll To Top -- */
  const scrollTopBtn = document.querySelector(".scroll-top");
  if (scrollTopBtn) {
    window.addEventListener(
      "scroll",
      () => {
        scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true },
    );
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -- Programmation Tabs -- */
  const programData = {
    Vendredi: [
      {
        titre: "Ceremonie d'ouverture",
        scene: "Scene Congo",
        heure: "18:00",
        desc: "Discours, fanfare et parade d'ouverture avec les sapeurs de Bacongo.",
        img: "assets/images/sapeur-hero.jpg",
      },
      {
        titre: "Grand concert inaugural",
        scene: "Scene Lumiere",
        heure: "20:30",
        desc: "Rumba contemporaine, afro-pop et creation originale pour lancer les trois jours.",
        img: "assets/images/stage-night.jpg",
      },
      {
        titre: "Nuit electro Brazza",
        scene: "Scene Kintele",
        heure: "23:00",
        desc: "DJ set jusqu'au bout de la nuit, mapping video et jeux de lumiere.",
        img: "assets/images/crowd.jpg",
      },
    ],
    Samedi: [
      {
        titre: "Battle de danse urbaine",
        scene: "Scene Mbamou",
        heure: "14:00",
        desc: "Douze crews de Brazzaville et Pointe-Noire s'affrontent devant un jury d'artistes.",
        img: "assets/images/dance.jpg",
      },
      {
        titre: "Defile SAPE & Createurs",
        scene: "Podium Elegance",
        heure: "17:30",
        desc: "Dix maisons congolaises presentent leurs collections en plein air.",
        img: "assets/images/fashion.jpg",
      },
      {
        titre: "Grande nuit des concerts",
        scene: "Scene Lumiere",
        heure: "21:00",
        desc: "Quatre tetes d'affiche, orchestre live et invites surprises.",
        img: "assets/images/stage-night.jpg",
      },
    ],
    Dimanche: [
      {
        titre: "Panel : transmettre la SAPE",
        scene: "Espace Palabre",
        heure: "11:00",
        desc: "Rencontre entre sapeurs historiques, jeunes createurs et chercheurs.",
        img: "assets/images/sape-street.jpg",
      },
      {
        titre: "Ateliers art & artisanat",
        scene: "Village Culture",
        heure: "15:00",
        desc: "Serigraphie, photographie de rue, percussions et couture ouverte a tous.",
        img: "assets/images/brazzaville.jpg",
      },
      {
        titre: "Concert de cloture",
        scene: "Scene Congo",
        heure: "19:00",
        desc: "Final collectif reunissant tous les artistes du festival sur scene.",
        img: "assets/images/crowd.jpg",
      },
    ],
  };

  const tabsContainer = document.querySelector(".programmation_tabs");
  const programList = document.getElementById("program-list");

  function renderProgram(day) {
    const entries = programData[day];
    if (!programList || !entries) return;
    programList.innerHTML = entries
      .map(
        (e) => `
      <article class="program-card">
        <div class="program-card_img">
          <img src="${e.img}" alt="${e.titre}" loading="lazy">
          <span class="program-card_badge">${e.heure}</span>
        </div>
        <div class="program-card_body">
          <h3>${e.titre}</h3>
          <p class="program-card_desc">${e.desc}</p>
          <span class="program-card_scene">${e.scene}</span>
        </div>
      </article>
    `,
      )
      .join("");
  }

  if (tabsContainer) {
    const tabs = tabsContainer.querySelectorAll(".programmation_tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        renderProgram(tab.dataset.day);
      });
    });
    const activeTab = tabsContainer.querySelector(".programmation_tab.active");
    if (activeTab) renderProgram(activeTab.dataset.day);
  }

  /* -- Line-up Filters -- */
  const artists = [
    {
      nom: "Kevin Malonga",
      cat: "Musique",
      jour: "Vendredi",
      img: "assets/images/artist-1.jpg",
    },
    {
      nom: "Nzinga",
      cat: "Musique",
      jour: "Samedi",
      img: "assets/images/artist-2.jpg",
    },
    {
      nom: "DJ Loufoulakari",
      cat: "Musique",
      jour: "Vendredi",
      img: "assets/images/artist-3.jpg",
    },
    {
      nom: "Collectif Ngoma",
      cat: "Art Lumiere",
      jour: "Samedi",
      img: "assets/images/dance.jpg",
    },
    {
      nom: "Maison Ndouna",
      cat: "Mode et Sape",
      jour: "Samedi",
      img: "assets/images/fashion.jpg",
    },
    {
      nom: "Les Sapeurs de Bacongo",
      cat: "Mode et Sape",
      jour: "Vendredi",
      img: "assets/images/sape-street.jpg",
    },
    {
      nom: "Atelier Poto-Poto",
      cat: "Art Lumiere",
      jour: "Dimanche",
      img: "assets/images/brazzaville.jpg",
    },
    {
      nom: "Studio Lumiere",
      cat: "Art Lumiere",
      jour: "Dimanche",
      img: "assets/images/crowd.jpg",
    },
  ];

  const filtersContainer = document.querySelector(".lineup_filters");
  const lineupGrid = document.getElementById("lineup-grid");

  function renderArtists(filter) {
    if (!lineupGrid) return;
    const list =
      filter === "Tous" ? artists : artists.filter((a) => a.cat === filter);
    lineupGrid.innerHTML = list
      .map(
        (a) => `
      <article class="artist-card">
        <div class="artist-card_img-wrap">
          <img class="artist-card_img" src="${a.img}" alt="${a.nom}, ${a.cat}" loading="lazy">
          <span class="artist-card_cat">${a.cat}</span>
        </div>
        <div class="artist-card_body">
          <h3 class="artist-card_name">${a.nom}</h3>
          <p class="artist-card_meta">${a.jour}</p>
        </div>
      </article>
    `,
      )
      .join("");
  }

  if (filtersContainer) {
    const filterBtns = filtersContainer.querySelectorAll(".lineup_filter");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderArtists(btn.dataset.filter);
      });
    });
    renderArtists("Tous");
  }

  /* -- FAQ Accordion -- */
  const faqItems = document.querySelectorAll(".faq-item_q");
  faqItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const answer = btn.nextElementSibling;
      btn.setAttribute("aria-expanded", !expanded);
      if (answer) answer.style.display = expanded ? "none" : "block";
    });
  });

  /* -- Contact Form -- */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const errors = {};
      const nom = contactForm.querySelector('[name="nom"]');
      const tel = contactForm.querySelector('[name="telephone"]');
      const msg = contactForm.querySelector('[name="message"]');
      if (!nom.value.trim()) errors.nom = "Le nom est obligatoire.";
      if (!tel.value.trim()) errors.telephone = "Le telephone est obligatoire.";
      else if (tel.value.replace(/\D/g, "").length < 8)
        errors.telephone = "Numero invalide.";
      if (!msg.value.trim()) errors.message = "Un message est requis.";
      contactForm
        .querySelectorAll(".contact_error")
        .forEach((el) => (el.textContent = ""));
      if (Object.keys(errors).length > 0) {
        Object.keys(errors).forEach((k) => {
          const errEl = contactForm.querySelector(
            `.contact_error[data-for="${k}"]`,
          );
          if (errEl) errEl.textContent = errors[k];
        });
        return;
      }
      contactForm.style.display = "none";
      const success =
        contactForm.parentElement.querySelector(".contact_success");
      if (success) success.style.display = "block";
    });
  }

  /* -- Inscription Form -- */
  const inscrForm = document.getElementById("inscription-form");
  if (inscrForm) {
    const typeBtns = inscrForm.querySelectorAll(".type-select");
    const typeInput = inscrForm.querySelector('[name="type"]');
    typeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        typeBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        typeInput.value = btn.dataset.type;
      });
    });
    inscrForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fields = {};
      ["nom", "prenom", "email", "telephone"].forEach((k) => {
        const el = inscrForm.querySelector(`[name="${k}"]`);
        fields[k] = el ? el.value.trim() : "";
      });
      fields.type = typeInput ? typeInput.value : "";
      const errors = {};
      if (!fields.nom) errors.nom = "Le nom est obligatoire.";
      else if (fields.nom.length > 60) errors.nom = "60 caracteres maximum.";
      if (!fields.prenom) errors.prenom = "Le prenom est obligatoire.";
      else if (fields.prenom.length > 60)
        errors.prenom = "60 caracteres maximum.";
      if (!fields.email) errors.email = "L'email est obligatoire.";
      else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(fields.email))
        errors.email = "Adresse email invalide.";
      const digits = fields.telephone.replace(/\D/g, "");
      if (!digits) errors.telephone = "Le telephone est obligatoire.";
      else if (digits.length < 8 || digits.length > 12)
        errors.telephone = "Numero invalide (8 a 12 chiffres).";
      if (!fields.type) errors.type = "Choisissez un type de participant.";
      inscrForm
        .querySelectorAll(".contact_error")
        .forEach((el) => (el.textContent = ""));
      if (Object.keys(errors).length > 0) {
        Object.keys(errors).forEach((k) => {
          const errEl = inscrForm.querySelector(
            `.contact_error[data-for="${k}"]`,
          );
          if (errEl) errEl.textContent = errors[k];
        });
        return;
      }
      inscrForm.style.display = "none";
      const success = inscrForm.parentElement.querySelector(".contact_success");
      if (success) success.style.display = "block";
    });
  }
});
