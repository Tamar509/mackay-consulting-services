/* =============================================================================
   MACKAY CONSULTING SERVICES - site.js
   Minimal vanilla JavaScript. Roughly 2 KB unminified. No dependencies.

   Everything on this site works with JavaScript switched off:
     - the mobile menu falls back to a permanently visible nav
     - the contact form falls back to a normal HTML POST + redirect
   This file only improves the experience, it never provides it.
   ============================================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------------
     1. Mobile navigation toggle
     ------------------------------------------------------------------------ */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.hidden = false;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close the menu on Escape and return focus to the button.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------------------
     2. Contact form
     Posts to Web3Forms in the background so the visitor stays on the page.
     If fetch fails for any reason the form is submitted normally, which sends
     the visitor to the redirect URL declared in the form markup.
     ------------------------------------------------------------------------ */
  var form = document.getElementById("contact-form");

  if (form) {
    var status = document.getElementById("form-status");
    var submit = form.querySelector("button[type='submit']");

    var say = function (message) {
      if (!status) { return; }
      status.textContent = message;
      status.hidden = false;
    };

    form.addEventListener("submit", function (event) {
      // Let the browser handle it if the endpoint has not been configured yet.
      var key = form.querySelector("input[name='access_key']");
      if (!key || key.value.indexOf("REPLACE") === 0) { return; }

      event.preventDefault();
      var data = new FormData(form);
      var original = submit ? submit.textContent : "";

      if (submit) { submit.disabled = true; submit.textContent = "Sending..."; }
      say("Sending your message...");

      fetch(form.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: data
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (result && result.success) {
            form.reset();
            say("Thank you. Your message has been sent and we will respond within two working days.");
          } else {
            say("Your message could not be sent. Please email us directly at info@mackayconsulting.com.");
          }
        })
        .catch(function () {
          // Network failure - fall back to a full page form post.
          form.submit();
        })
        .finally(function () {
          if (submit) { submit.disabled = false; submit.textContent = original; }
        });
    });
  }

  /* ---------------------------------------------------------------------------
     3. Subtle fade-in for sections (the only motion on the site)
     Skipped entirely for visitors who prefer reduced motion.
     ------------------------------------------------------------------------ */
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".fade-in");

  if (!targets.length) { return; }

  if (reduced || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px" });

  Array.prototype.forEach.call(targets, function (el) { observer.observe(el); });
})();
