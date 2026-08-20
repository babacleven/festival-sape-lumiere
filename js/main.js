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
      if (ms === 0) {
        countdownEl.innerHTML = '<p style="font-size:clamp(18px,4vw,28px);font-weight:700;color:var(--green);text-align:center">Le Festival est ouvert !</p>';
        return;
      }
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
        titre: "Cérémonie d'ouverture",
        scene: "Scene Congo",
        heure: "18:00",
        desc: "Discours, fanfare et parade d'ouverture avec les Sapeurs & Performeurs de Bacongo.",
        img: "assets/images/ceremonie_ouverture.webp",
      },
      {
        titre: "Grand concert inaugural",
        scene: "Scene Lumiere",
        heure: "20:30",
        desc: "Rumba contemporaine, afro-pop et création originale pour lancer les trois jours.",
        img: "assets/images/photo-congo-musique-2.jpg",
      },
      {
        titre: "Nuit electro Brazza",
        scene: "Scene Kintele",
        heure: "23:00",
        desc: "Concert live de Tidiane Mario pour clore cette première nuit du festival.",
        img: "assets/images/maxresdefault.jpg",
      },
    ],
    Samedi: [
      {
        titre: "Battle de danse urbaine",
        scene: "Scene Mbamou",
        heure: "14:00",
        desc: "Douze crews de Brazzaville et Pointe-Noire s'affrontent devant un jury d'artistes.",
        img: "assets/images/fespam_ouverture-2.jpeg",
      },
      {
        titre: "Défilé SAPE & Créateurs",
        scene: "Podium Elegance",
        heure: "17:30",
        desc: "Dix maisons congolaises présentent leurs collections en plein air.",
        img: "assets/images/fashion.jpg",
      },
      {
        titre: "Grande nuit des concerts",
        scene: "Scene Lumiere",
        heure: "21:00",
        desc: "Quatre têtes d'affiche, orchestre live et invités surprises.",
        img: "assets/images/Fespam_jour2_Mayanga6-1.jpg",
      },
    ],
    Dimanche: [
      {
        titre: "Panel : transmettre la SAPE",
        scene: "Espace Palabre",
        heure: "11:00",
        desc: "Rencontre entre Sapeurs & Performeurs historiques, jeunes créateurs et chercheurs.",
        img: "assets/images/crowd.jpeg",
      },
      {
        titre: "Ateliers art & artisanat",
        scene: "Village Culture",
        heure: "15:00",
        desc: "Sérigraphie, photographie de rue, percussions et couture ouverte à tous.",
        img: "assets/images/les_bancs_fileminimizer.webp",
      },
      {
        titre: "Concert de clôture",
        scene: "Scene Congo",
        heure: "19:00",
        desc: "Final collectif réunissant tous les artistes du festival sur scène.",
        img: "assets/images/Fespam_jour2_Mayanga7-1.jpg",
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
      nom: "Tété Ketch",
      cat: "Musique",
      jour: "Vendredi 20 Nov.",
      heure: "21h00 - 22h00",
      lieu: "Scène principale",
      bio: "Tété (prénom d'origine wolof signifiant « le guide »), né le 25 juillet 1975 à Dakar, Sénégal. Artiste de musique urbaine congolaise et afrobeat, il est une figure emblématique de la scène musicale de Brazzaville.",
      img: "assets/images/musicien.jpg",
    },
    {
      nom: "Tidiane Mario",
      cat: "Musique",
      jour: "Samedi 21 Nov.",
      heure: "22h00 - 23h30",
      lieu: "Scène principale",
      bio: "Jostie Tidiane Matsouma Mario, né le 16 février 1992 à Brazzaville. Artiste Afrobeat, Hip-Hop et Afro-pop. Débuts en 2013 au sein du groupe A6, d'abord comme danseur puis chanteur. Concert live pour clore cette première nuit du festival.",
      img: "assets/images/musique.jpg",
    },
    {
      nom: "Paterne Maestro",
      cat: "Musique",
      jour: "Vendredi 20 Nov.",
      heure: "19h00 - 20h00",
      lieu: "Scène secondaire",
      bio: "Auge Paterne Okonda Otou, né le 3 septembre 1996 à Brazzaville. Pionnier du « rap folklorique » - un mélange de rap et de folklore congolais avec des textes conscients enracinés dans la culture locale. Initié dès l'âge de 6 ans dans les églises et groupes de quartier.",
      img: "assets/images/channels4_profile.jpg",
    },
    {
      nom: "Michelle",
      cat: "Mode et Sape",
      jour: "Vendredi 20 Nov.",
      heure: "17h00 - 17h45",
      lieu: "Parcours défilé",
      bio: "32 ans, Sapeuse congolaise, employée au ministère de l'Agriculture. Sapeuse depuis 6 ans. Reconnue pour ses tenues élégantes et modernes.",
      img: "assets/images/Michelle.png",
    },
    {
      nom: "Edith",
      cat: "Mode et Sape",
      jour: "Vendredi 20 Nov.",
      heure: "17h00 - 17h45",
      lieu: "Parcours défilé",
      bio: "47 ans, Sapeuse congolaise, mère de 4 enfants. Sapeuse depuis 36 ans. Connue pour ses costumes Pierre Cardin et ses lunettes Versace. Figure respectée dans les défilés de Bacongo.",
      img: "assets/images/Edith.png",
    },
    {
      nom: "Judith, Ntsimba & Okili",
      cat: "Mode et Sape",
      jour: "Vendredi 20 Nov.",
      heure: "17h00 - 17h45",
      lieu: "Parcours défilé",
      bio: "Judith (39 ans, policière) - Sapeuse depuis 18 ans, mère de trois enfants. Style sobre mais affirmé, aime les costumes Yves Saint Laurent. Ntsimba Marie Jeanne (52 ans) - Sapeuse depuis 20 ans, préfère les costumes Jean Courcel et accessoires Chanel. Okili (10 ans, élève) - Fils de Judith, jeune sapeur déjà passionné par les costumes Yves Saint Laurent.",
      img: "assets/images/Judith,Okili,Ntsimba .png",
    },
    {
      nom: "Sapeurs de Bacongo",
      cat: "Mode et Sape",
      jour: "Vendredi 20 Nov.",
      heure: "17h00 - 17h45",
      lieu: "Parcours défilé",
      img: "assets/images/WhatsApp Image at 15.23.43.jpeg",
    },
    {
      nom: "Sapeurs & Performeurs",
      cat: "Art Lumiere",
      jour: "Samedi 21 Nov.",
      heure: "18h00 - 18h45",
      lieu: "Espace lumière",
      bio: "Spectacle immersif mêlant art de la sape et performance lumineuse. Les sapeurs défilent sous les effets de lumière, combinant élégance vestimentaire et expression artistique dans un parcours son et lumière.",
      img: "assets/images/artist-2.jpg",
    },
    {
      nom: "Défilé de mode",
      cat: "Art Lumiere",
      jour: "Dimanche 22 Nov.",
      heure: "16h00 - 17h00",
      lieu: "Piste principale",
      bio: "Créateurs : Stéphane Malonga (costumes sur mesure, Brazzaville), Claudine Mbemba (robes haute couture aux couleurs vives). Mannequins dans l'ordre de passage : Prisca Mvoula, Christelle Mabiala, Junior Mavoungou, Sandra Ngalou.",
      img: "assets/images/defiler.webp",
    },
    {
      nom: "Programme Artistique",
      cat: "Art Lumiere",
      jour: "Dimanche 22 Nov.",
      heure: "19h00 - 22h00",
      lieu: "Toutes les scènes",
      bio: "19h00 - Groupe de tambours « Ngoma Ya Kongo » : rythmes ancestraux. 20h00 - Danseurs « Les Lumières de Bacongo » : performance chorégraphique avec jeux de lumière. 21h00 - Performance lumineuse « Mapping Brazzaville » : projection vidéo sur scène.",
      img: "assets/images/fespam_ouverture-2.jpeg",
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
          <p class="artist-card_meta">${a.jour}${a.heure ? " &middot; " + a.heure : ""}</p>
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

  /* -- Artist Modal -- */
  const modal = document.getElementById("artist-modal");
  if (modal) {
    const overlay = modal.querySelector(".artist-modal_overlay");
    const closeBtn = modal.querySelector(".artist-modal_close");
    const modalImg = modal.querySelector(".artist-modal_img");
    const modalName = modal.querySelector(".artist-modal_name");
    const modalCat = modal.querySelector(".artist-modal_cat");
    const modalJour = modal.querySelector(".artist-modal_jour");
    const modalHeure = modal.querySelector(".artist-modal_heure");
    const modalLieu = modal.querySelector(".artist-modal_lieu");
    const modalBio = modal.querySelector(".artist-modal_bio");
    const modalSapeurs = modal.querySelector(".artist-modal_sapeurs");
    const modalSapeursList = modal.querySelector(".artist-modal_sapeurs-list");

    function openModal(artist) {
      modalImg.src = artist.img;
      modalImg.alt = artist.nom + ", " + artist.cat;
      modalName.textContent = artist.nom;
      modalCat.textContent = artist.cat;
      modalJour.textContent = artist.jour || "";
      modalHeure.textContent = artist.heure || "A confirmer";
      modalLieu.textContent = artist.lieu || "A confirmer";
      if (artist.bio) {
        modalBio.textContent = artist.bio;
        modalBio.style.display = "block";
      } else {
        modalBio.style.display = "none";
      }
      if (artist.sapeurs && artist.sapeurs.length > 0) {
        modalSapeursList.innerHTML = artist.sapeurs
          .map((s) => `<li>${s.prenom} - ${s.nationalite}</li>`)
          .join("");
        modalSapeurs.style.display = "block";
      } else {
        modalSapeurs.style.display = "none";
      }
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    document.addEventListener("click", (e) => {
      const card = e.target.closest(".artist-card");
      if (!card) return;
      const name = card.querySelector(".artist-card_name");
      if (!name) return;
      const artist = artists.find((a) => a.nom === name.textContent);
      if (artist) openModal(artist);
    });

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* -- Line-up Preview (index) -- */
  const previewGrid = document.getElementById("lineup-preview");
  if (previewGrid) {
    const preview = artists.slice(0, 3);
    previewGrid.innerHTML = preview
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
      const email = contactForm.querySelector('[name="email"]');
      const msg = contactForm.querySelector('[name="message"]');
      if (!nom.value.trim()) errors.nom = "Le nom est obligatoire.";
      if (!email.value.trim()) errors.email = "L'e-mail est obligatoire.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))
        errors.email = "Adresse e-mail invalide.";
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
      const formData = new FormData(contactForm);
      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then(() => {
          contactForm.style.display = "none";
          const success =
            contactForm.parentElement.querySelector(".contact_success");
          if (success) success.style.display = "block";
        })
        .catch(() => {
          contactForm.style.display = "none";
          const success =
            contactForm.parentElement.querySelector(".contact_success");
          if (success) success.style.display = "block";
        });
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
      else if (fields.nom.length > 60) errors.nom = "60 caractères maximum.";
      if (!fields.prenom) errors.prenom = "Le prénom est obligatoire.";
      else if (fields.prenom.length > 60)
        errors.prenom = "60 caractères maximum.";
      if (!fields.email) errors.email = "L'email est obligatoire.";
      else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(fields.email))
        errors.email = "Adresse email invalide.";
      const digits = fields.telephone.replace(/\D/g, "");
      if (!digits) errors.telephone = "Le téléphone est obligatoire.";
      else if (digits.length < 8 || digits.length > 12)
        errors.telephone = "Numéro invalide (8 à 12 chiffres).";
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
