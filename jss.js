/* =========================================================
   ROEL REIBEN TAYAG - PORTFOLIO SCRIPT
   Plain JavaScript: no frameworks, no installation needed.
   ========================================================= */

/* =========================================================
   1. YOUR SETTINGS - EDIT THIS PART
   ========================================================= */
const CONFIG = {
  // Your profile picture. Put the photo inside an "images" folder
  // next to index.html, then write its name here, for example:
  //   profileImage: "images/profile.jpg",
  // Leave it empty ("") to show your initials instead.
  profileImage: "",

  // Words that are "typed" in the hero section
  typingWords: [
    "Video Editor",
    "IT Student",
    "Creative Storyteller",
    "Web Developer in Training"
  ],

  // YOUR VIDEO EDITING PROJECTS
  // Copy one { ... } block, paste it below the last one, and change the details.
  //
  // category  -> must match a filter button: "short-film", "music-video", "social" or "motion"
  // thumbnail -> picture for the card, e.g. "images/project1.jpg" (leave "" for a color card)
  // video     -> a YouTube link (e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX"),
  //              a local file (e.g. "videos/project1.mp4"), or "" if not ready yet
  projects: [
    {
      title: "Echoes of Home",
      category: "short-film",
      description: "A 5-minute short film about a student returning to his hometown. Edited for emotional pacing with a warm, cinematic color grade.",
      tools: ["Premiere Pro", "DaVinci Resolve"],
      duration: "5:12",
      thumbnail: "",
      video: ""
    },
    {
      title: "Midnight Drive - Music Video",
      category: "music-video",
      description: "Beat-synced music video for a local artist, with fast cuts, light leaks and neon color grading.",
      tools: ["Premiere Pro", "After Effects"],
      duration: "3:45",
      thumbnail: "",
      video: ""
    },
    {
      title: "Campus Life Reels",
      category: "social",
      description: "A series of vertical reels for a school organization: captions, transitions and trending audio.",
      tools: ["CapCut"],
      duration: "0:45",
      thumbnail: "",
      video: ""
    },
    {
      title: "Animated Logo Intro",
      category: "motion",
      description: "A 10-second animated logo intro with sound design for a YouTube channel.",
      tools: ["After Effects"],
      duration: "0:10",
      thumbnail: "",
      video: ""
    },
    {
      title: "Event Highlights: IT Week",
      category: "short-film",
      description: "Same-day edit of our school's IT Week, from opening ceremony to awards night.",
      tools: ["Premiere Pro"],
      duration: "2:30",
      thumbnail: "",
      video: ""
    },
    {
      title: "Product Promo Ad",
      category: "social",
      description: "A 30-second promotional video for a small online shop, with kinetic text and upbeat music.",
      tools: ["CapCut", "Photoshop"],
      duration: "0:30",
      thumbnail: "",
      video: ""
    }
  ]
};

/* Readable names for each category (shown on the cards) */
const CATEGORY_NAMES = {
  "short-film": "Short Film",
  "music-video": "Music Video",
  "social": "Social Media",
  "motion": "Motion Graphics"
};

/* Colors used for cards that have no thumbnail yet */
const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #7c5cff, #00d4ff)",
  "linear-gradient(135deg, #ff4d8d, #7c5cff)",
  "linear-gradient(135deg, #00d4ff, #22c55e)",
  "linear-gradient(135deg, #f59e0b, #ff4d8d)",
  "linear-gradient(135deg, #6366f1, #ec4899)",
  "linear-gradient(135deg, #14b8a6, #7c5cff)"
];

/* =========================================================
   2. START EVERYTHING WHEN THE PAGE IS READY
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  setupLoader();
  setupProfileImage();
  setupTheme();
  setupMobileMenu();
  setupScrollEffects();
  setupTyping();
  renderProjects();
  setupFilters();
  setupModal();
  setupRevealAnimations();
  setupContactForm();
  setupFooterYear();
});

/* =========================================================
   3. LOADING SCREEN
   ========================================================= */
function setupLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  function hideLoader() {
    loader.classList.add("hidden");
  }

  // Hide when everything is loaded, or after 2 seconds at most
  window.addEventListener("load", function () {
    setTimeout(hideLoader, 400);
  });
  setTimeout(hideLoader, 2000);
}

/* =========================================================
   4. PROFILE PICTURE
   ========================================================= */
function setupProfileImage() {
  const img = document.getElementById("profileImg");
  const initials = document.getElementById("profileInitials");
  if (!img || !initials || !CONFIG.profileImage) return;

  img.addEventListener("load", function () {
    img.hidden = false;
    initials.hidden = true;
  });
  img.addEventListener("error", function () {
    // If the file name is wrong, keep showing the initials
    img.hidden = true;
    initials.hidden = false;
  });
  img.src = CONFIG.profileImage;
}

/* =========================================================
   5. LIGHT / DARK MODE
   ========================================================= */
function setupTheme() {
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  if (!toggle || !icon) return;

  function applyTheme(theme) {
    const isLight = theme === "light";
    document.body.classList.toggle("light-mode", isLight);
    icon.innerHTML = isLight ? "&#9728;" : "&#9790;"; // sun or moon
  }

  // Remember the choice (localStorage may be blocked in some browsers, so use try/catch)
  let saved = "dark";
  try {
    saved = localStorage.getItem("theme") || "dark";
  } catch (e) {
    saved = "dark";
  }
  applyTheme(saved);

  toggle.addEventListener("click", function () {
    const newTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
    applyTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (e) {
      /* ignore */
    }
  });
}

/* =========================================================
   6. MOBILE MENU (HAMBURGER)
   ========================================================= */
function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  if (!hamburger || !navMenu) return;

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after clicking a link
  navMenu.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu when clicking outside of it
  document.addEventListener("click", function (event) {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
      closeMenu();
    }
  });

  // Close the menu if the screen becomes wide again
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) closeMenu();
  });
}

/* =========================================================
   7. SCROLL EFFECTS: navbar, progress bar, active link, back-to-top
   ========================================================= */
function setupScrollEffects() {
  const navbar = document.getElementById("navbar");
  const progress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function onScroll() {
    const scrollY = window.scrollY;

    // Navbar background after scrolling a bit
    if (navbar) navbar.classList.toggle("scrolled", scrollY > 50);

    // Progress bar at the top
    if (progress) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const percent = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      progress.style.width = percent + "%";
    }

    // Back-to-top button
    if (backToTop) backToTop.classList.toggle("show", scrollY > 500);

    // Highlight the menu link of the section on screen
    let currentId = "home";
    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop - 120) {
        currentId = section.id;
      }
    });
    // At the very bottom, highlight the last section
    if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 5 && sections.length) {
      currentId = sections[sections.length - 1].id;
    }
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* =========================================================
   8. TYPING ANIMATION
   ========================================================= */
function setupTyping() {
  const element = document.getElementById("typing");
  const words = CONFIG.typingWords;
  if (!element || !words || words.length === 0) return;

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const word = words[wordIndex];

    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }
    element.textContent = word.substring(0, charIndex);

    let delay = deleting ? 50 : 100;

    if (!deleting && charIndex === word.length) {
      delay = 1800;           // pause when the word is complete
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;            // short pause before the next word
    }

    setTimeout(type, delay);
  }

  type();
}

/* =========================================================
   9. PROJECT CARDS
   ========================================================= */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  CONFIG.projects.forEach(function (project, index) {
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.category = project.category;
    card.dataset.index = index;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "Open project: " + project.title);

    // Thumbnail (image or colored placeholder)
    const thumb = document.createElement("div");
    thumb.className = "project-thumb";

    if (project.thumbnail) {
      const img = document.createElement("img");
      img.src = project.thumbnail;
      img.alt = project.title;
      img.loading = "lazy";
      img.addEventListener("error", function () {
        // Wrong file name? Show the colored placeholder instead
        thumb.replaceChild(createPlaceholder(project, index), img);
      });
      thumb.appendChild(img);
    } else {
      thumb.appendChild(createPlaceholder(project, index));
    }

    const overlay = document.createElement("div");
    overlay.className = "play-overlay";
    overlay.innerHTML = "<span>&#9654;</span>";
    thumb.appendChild(overlay);

    if (project.duration) {
      const duration = document.createElement("span");
      duration.className = "project-duration";
      duration.textContent = project.duration;
      thumb.appendChild(duration);
    }

    // Text
    const info = document.createElement("div");
    info.className = "project-info";

    const category = document.createElement("span");
    category.className = "project-category";
    category.textContent = CATEGORY_NAMES[project.category] || project.category;

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    info.appendChild(category);
    info.appendChild(title);
    info.appendChild(description);

    card.appendChild(thumb);
    card.appendChild(info);
    grid.appendChild(card);
  });
}

function createPlaceholder(project, index) {
  const placeholder = document.createElement("div");
  placeholder.className = "thumb-placeholder";
  placeholder.style.background = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];
  placeholder.textContent = project.title;
  return placeholder;
}

/* =========================================================
   10. PROJECT FILTER BUTTONS
   ========================================================= */
function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const noProjects = document.getElementById("noProjects");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;

      buttons.forEach(function (b) { b.classList.remove("active"); });
      button.classList.add("active");

      let visibleCount = 0;
      document.querySelectorAll(".project-card").forEach(function (card) {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hide", !show);
        if (show) {
          visibleCount++;
          // Restart the entrance animation
          card.style.animation = "none";
          void card.offsetWidth;
          card.style.animation = "";
        }
      });

      if (noProjects) noProjects.hidden = visibleCount > 0;
    });
  });
}

/* =========================================================
   11. VIDEO POPUP (MODAL)
   ========================================================= */
function setupModal() {
  const modal = document.getElementById("videoModal");
  const grid = document.getElementById("projectsGrid");
  if (!modal || !grid) return;

  const videoBox = document.getElementById("modalVideo");
  const titleEl = document.getElementById("modalTitle");
  const categoryEl = document.getElementById("modalCategory");
  const descriptionEl = document.getElementById("modalDescription");
  const toolsEl = document.getElementById("modalTools");
  let lastFocused = null;

  function openModal(project) {
    lastFocused = document.activeElement;
    titleEl.textContent = project.title;
    categoryEl.textContent = CATEGORY_NAMES[project.category] || project.category;
    descriptionEl.textContent = project.description;

    toolsEl.innerHTML = "";
    (project.tools || []).forEach(function (tool) {
      const tag = document.createElement("span");
      tag.textContent = tool;
      toolsEl.appendChild(tag);
    });

    // Remove an old "Watch on YouTube" link, if any
    const oldLink = modal.querySelector(".modal-link");
    if (oldLink) oldLink.remove();

    videoBox.innerHTML = "";
    const youtubeId = getYouTubeId(project.video);

    if (youtubeId) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/" + youtubeId + "?autoplay=1&rel=0";
      iframe.title = project.title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      videoBox.appendChild(iframe);

      // Backup link (useful if the video can't play inside the page)
      const link = document.createElement("a");
      link.className = "modal-link";
      link.href = "https://www.youtube.com/watch?v=" + youtubeId;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Watch on YouTube \u2197";
      toolsEl.insertAdjacentElement("afterend", link);
    } else if (project.video) {
      const video = document.createElement("video");
      video.src = project.video;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      videoBox.appendChild(video);
    } else {
      const empty = document.createElement("div");
      empty.className = "modal-video-empty";
      empty.style.background = PLACEHOLDER_GRADIENTS[CONFIG.projects.indexOf(project) % PLACEHOLDER_GRADIENTS.length];
      empty.textContent = "\uD83C\uDFAC Video coming soon";
      videoBox.appendChild(empty);
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    if (!modal.classList.contains("open")) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    // Stop the video by removing it
    setTimeout(function () { videoBox.innerHTML = ""; }, 300);
    if (lastFocused) lastFocused.focus();
  }

  // Open when a card is clicked (or Enter/Space is pressed on it)
  grid.addEventListener("click", function (event) {
    const card = event.target.closest(".project-card");
    if (card) openModal(CONFIG.projects[Number(card.dataset.index)]);
  });
  grid.addEventListener("keydown", function (event) {
    const card = event.target.closest(".project-card");
    if (card && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openModal(CONFIG.projects[Number(card.dataset.index)]);
    }
  });

  // Close with the X button, by clicking outside, or with the Escape key
  modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeModal();
  });
}

/* Gets the video ID from any normal YouTube link */
function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

/* =========================================================
   12. SCROLL REVEAL, COUNTERS AND SKILL BARS
   ========================================================= */
function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll(".counter");
  const skillBars = document.querySelectorAll(".skill-fill");

  // Very old browsers: just show everything
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("visible"); });
    counters.forEach(function (c) { c.textContent = c.dataset.target; });
    skillBars.forEach(fillSkillBar);
    return;
  }

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealItems.forEach(function (el) { revealObserver.observe(el); });

  const counterObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(function (c) { counterObserver.observe(c); });

  const skillObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        fillSkillBar(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(function (bar) { skillObserver.observe(bar); });
}

function animateCounter(counter) {
  const target = Number(counter.dataset.target) || 0;
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // slows down at the end
    counter.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function fillSkillBar(bar) {
  const level = Number(bar.dataset.level) || 0;
  bar.style.width = level + "%";

  const percentLabel = bar.closest(".skill").querySelector(".skill-percent");
  if (!percentLabel) return;

  const duration = 1500;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    percentLabel.textContent = Math.round(level * progress) + "%";
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* =========================================================
   13. CONTACT FORM (no server needed)
   Checks the fields, then opens the visitor's email app
   with your address, the subject and the message filled in.
   ========================================================= */
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form) return;

  // EDIT: the email address that receives the messages
  const MY_EMAIL = "tayag.roelreiben@epcst.edu.ph";

  function setError(input, message) {
    const group = input.closest(".form-group");
    group.classList.toggle("error", Boolean(message));
    group.querySelector(".error-message").textContent = message;
  }

  function validate() {
    let valid = true;
    const name = form.elements["name"];
    const email = form.elements["email"];
    const subject = form.elements["subject"];
    const message = form.elements["message"];

    if (name.value.trim().length < 2) {
      setError(name, "Please enter your name.");
      valid = false;
    } else {
      setError(name, "");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      setError(email, "Please enter a valid email address.");
      valid = false;
    } else {
      setError(email, "");
    }

    if (subject.value.trim().length < 2) {
      setError(subject, "Please enter a subject.");
      valid = false;
    } else {
      setError(subject, "");
    }

    if (message.value.trim().length < 10) {
      setError(message, "Your message should be at least 10 characters.");
      valid = false;
    } else {
      setError(message, "");
    }

    return valid;
  }

  // Clear an error as soon as the user types
  form.querySelectorAll("input, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      setError(field, "");
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    if (!validate()) return;

    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const subject = form.elements["subject"].value.trim();
    const message = form.elements["message"].value.trim();

    const body = "Hi Roel,\n\n" + message + "\n\nFrom: " + name + " (" + email + ")";
    const mailtoLink = "mailto:" + MY_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailtoLink;

    status.textContent = "Thank you, " + name + "! Your email app is opening so you can send the message.";
    status.classList.add("success");
    form.reset();
  });
}

/* =========================================================
   14. FOOTER YEAR (updates automatically)
   ========================================================= */
function setupFooterYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}
