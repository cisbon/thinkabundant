/* ==========================================================================
   Think Abundant — progressive enhancement only.
   Everything on the page is readable and navigable with this file absent.
   1. Mobile navigation toggle
   2. Smooth scrolling for in-page anchors (with a reduced-motion fallback)
   3. Contact form validation + submission PLACEHOLDER
   4. Footer copyright year
   ========================================================================== */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Mobile navigation ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primary-nav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close after choosing a destination, and when leaving the mobile layout.
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });

    window.matchMedia('(min-width: 860px)').addEventListener('change', closeNav);
  }

  /* ---------- 2. Smooth scrolling ----------
     CSS `scroll-behavior: smooth` already covers modern browsers; this handler
     adds the same behaviour where it is missing and, more importantly, moves
     keyboard focus to the target so the two navigations stay in sync. */
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;

    var hash = link.getAttribute('href');
    if (!hash || hash === '#') return; // placeholder links stay inert

    var target = document.getElementById(hash.slice(1));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });

    // Focus without a second scroll jump.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });

    if (history.pushState) history.pushState(null, '', hash);
  });

  /* ---------- 3. Contact form ----------
     PLACEHOLDER: there is no backend. Validation runs client-side and the
     success message is cosmetic — nothing is sent anywhere. To go live, wire
     the form to a form service (Formspree, Netlify Forms, Basin…) or your own
     endpoint; GitHub Pages serves static files only and cannot receive a POST. */
  var form = document.getElementById('contactForm');

  if (form) {
    var status = document.getElementById('formStatus');
    var fields = [
      { input: document.getElementById('name'),    error: document.getElementById('name-error'),    label: 'name' },
      { input: document.getElementById('email'),   error: document.getElementById('email-error'),   label: 'email' },
      { input: document.getElementById('message'), error: document.getElementById('message-error'), label: 'message' }
    ];

    function setError(field, message) {
      if (!field.input || !field.error) return;
      if (message) {
        field.error.textContent = message;
        field.error.hidden = false;
        field.input.setAttribute('aria-invalid', 'true');
      } else {
        field.error.textContent = '';
        field.error.hidden = true;
        field.input.removeAttribute('aria-invalid');
      }
    }

    function validate(field) {
      if (!field.input) return true;
      var value = field.input.value.trim();

      if (!value) {
        setError(field, 'Please enter your ' + field.label + '.');
        return false;
      }
      if (field.label === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        setError(field, 'Please enter a valid email address.');
        return false;
      }
      if (field.label === 'message' && value.length < 10) {
        setError(field, 'Please write at least 10 characters so I know what you need.');
        return false;
      }
      setError(field, null);
      return true;
    }

    // Re-validate a field only once it has already failed, so typing is quiet.
    fields.forEach(function (field) {
      if (!field.input) return;
      field.input.addEventListener('blur', function () { validate(field); });
      field.input.addEventListener('input', function () {
        if (field.input.getAttribute('aria-invalid') === 'true') validate(field);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault(); // PLACEHOLDER: remove once a real action/endpoint is set.

      var firstInvalid = null;
      fields.forEach(function (field) {
        if (!validate(field) && !firstInvalid) firstInvalid = field.input;
      });

      if (firstInvalid) {
        if (status) {
          status.textContent = 'Please fix the highlighted fields and try again.';
          status.className = 'form-status is-error';
        }
        firstInvalid.focus();
        return;
      }

      if (status) {
        status.textContent = 'Thank you — your message has been noted. (Demo only: this form is ' +
          'not connected to a backend yet, so nothing was sent.)';
        status.className = 'form-status is-success';
      }
      form.reset();
    });
  }

  /* ---------- 4. Copyright year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
