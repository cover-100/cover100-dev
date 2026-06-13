// cover100.dev — copy-to-clipboard for command chips + install tab switching.
(function () {
  'use strict';

  document.querySelectorAll('.copy-btn[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      function done() {
        var prev = btn.textContent;
        btn.textContent = 'Copied';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = prev;
          btn.classList.remove('copied');
        }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
        done();
      }
    });
  });
})();

// Install tab switching
(function () {
  'use strict';
  var tabs = document.querySelectorAll('.qs-tab');
  var panels = document.querySelectorAll('.qs-panel');
  if (!tabs.length) return;

  function activate(name, focus) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-tab') === name;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.setAttribute('tabindex', on ? '0' : '-1');
      if (on && focus) t.focus();
    });
    panels.forEach(function (p) {
      var on = p.getAttribute('data-panel') === name;
      p.classList.toggle('is-active', on);
      if (on) p.removeAttribute('hidden');
      else p.setAttribute('hidden', '');
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activate(tab.getAttribute('data-tab'), false);
    });
    tab.addEventListener('keydown', function (ev) {
      var key = ev.key;
      if (key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Home' && key !== 'End') return;
      ev.preventDefault();
      var i = Array.prototype.indexOf.call(tabs, ev.currentTarget);
      var next;
      if (key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (key === 'Home') next = 0;
      else next = tabs.length - 1;
      activate(tabs[next].getAttribute('data-tab'), true);
    });
  });
})();
