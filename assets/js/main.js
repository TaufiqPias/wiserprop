(function () {
  "use strict";

  /* Mobile nav toggle */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /*
   * Services menu: on desktop this unfolds on hover/focus via CSS alone
   * (see .has-dropdown:hover / :focus-within in the stylesheet) — no JS
   * needed. On mobile it's rendered as a plain always-open list, also
   * with no JS needed. This block only closes the mobile menu on Escape.
   */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mainNav && mainNav.classList.contains("is-open")) {
      mainNav.classList.remove("is-open");
      if (navToggle) {
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  /*
   * Form handling.
   * These forms do not have a live destination yet (see /privacy/).
   * We validate in the browser, block obvious bots with a honeypot
   * field, and show an on-page confirmation. Nothing is transmitted.
   */
  var forms = document.querySelectorAll("form[data-local-form]");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var honeypot = form.querySelector(".hp-field input");
      if (honeypot && honeypot.value) {
        return; /* silently drop likely bot submissions */
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var note = form.querySelector(".form-note");
      if (note) {
        note.textContent = form.getAttribute("data-success-message") ||
          "Thanks — your message has been received.";
        note.classList.add("is-visible", "is-success");
      }
      form.reset();
    });
  });
})();
