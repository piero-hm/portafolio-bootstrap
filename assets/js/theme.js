(function () {
  const THEME_KEY = 'site-theme';
  const root = document.documentElement;
  const body = document.body;
  const toggle = document.getElementById('themeToggle');

  // Leer guardado o preferencia del sistema
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = saved || (prefersDark ? 'dark' : 'light');

  function applyTheme(t) {
    root.setAttribute('data-theme', t);     // para CSS: :root[data-theme="dark"]
    body.setAttribute('data-bs-theme', t);  // compatibilidad con Bootstrap 5.3
    if (toggle) toggle.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
  }

  // Inicializar
  applyTheme(theme);

  // Listener del botón toggle
  if (toggle) {
    toggle.addEventListener('click', function () {
      theme = (theme === 'dark') ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);
      // feedback visual
      try {
        toggle.animate([{ transform: 'scale(0.96)' }, { transform: 'scale(1)' }], { duration: 160 });
      } catch (e) { /* animación fallida -> ignorar */ }
    });
  }

  // Si el usuario cambia la preferencia del sistema y no hay valor guardado, actualizamos
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        theme = e.matches ? 'dark' : 'light';
        applyTheme(theme);
      }
    });
  }
})();
