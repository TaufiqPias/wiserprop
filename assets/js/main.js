(function () {
  "use strict";

  // Mobile nav toggle //
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  //Service Menu Toggle //

  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      mainNav &&
      mainNav.classList.contains("is-open")
    ) {
      mainNav.classList.remove("is-open");
      if (navToggle) {
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  //Form submission handling for local forms (not Google Forms)//
  var forms = document.querySelectorAll("form[data-local-form]");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var honeypot = form.querySelector(".hp-field input");
      if (honeypot && honeypot.value) {
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var note = form.querySelector(".form-note");
      if (note) {
        note.textContent =
          form.getAttribute("data-success-message") ||
          "Thanks — your message has been received.";
        note.classList.add("is-visible", "is-success");
      }
      form.reset();
    });
  });
})();

// This code is for google form submission,

const form = document.getElementById("vendorForm");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", function (event) {
  event.preventDefault();

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  const iframe = document.getElementById("hidden_iframe");

  // Submit the form normally to the Apps Script web app
  form.submit();

  // Give Google Apps Script time to process the submission
  setTimeout(function () {
    form.reset();

    submitButton.textContent = "Submitted!";

    alert("Thank you! Your vendor application has been submitted.");

    setTimeout(function () {
      submitButton.disabled = false;
      submitButton.textContent = "Submit application";
    }, 3000);
  }, 1500);
});
