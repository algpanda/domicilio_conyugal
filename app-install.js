(() => {
  const isAndroid = /android/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true;
  if (!isAndroid || isStandalone) return;

  let installPrompt = null;
  const banner = document.createElement('aside');
  banner.className = 'install-banner';
  banner.setAttribute('aria-label', 'Instalar Chulapa y Chuleta');
  banner.innerHTML = `
    <div class="install-banner__copy">
      <strong>¿Quieres instalar Chulapa y Chuleta?</strong>
      <span>Añádela a tu pantalla de inicio como una aplicación.</span>
    </div>
    <button class="install-banner__button" type="button">Instalar</button>
    <button class="install-banner__close" type="button" aria-label="Cerrar aviso">×</button>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .install-banner{position:fixed;z-index:1000;left:16px;right:16px;bottom:16px;display:flex;align-items:center;gap:14px;padding:16px 48px 16px 18px;background:#fff;border:1px solid #e8e3d8;border-radius:16px;box-shadow:0 8px 32px #241d1230;color:#29251f;font: inherit}
    .install-banner__copy{display:grid;gap:4px;flex:1;font-size:14px;line-height:1.35}
    .install-banner__copy span{color:#69645b;font-size:12px}
    .install-banner__button{border:0;border-radius:999px;padding:10px 16px;background:#29251f;color:#fff;font:inherit;font-weight:600;white-space:nowrap;cursor:pointer}
    .install-banner__close{position:absolute;right:10px;top:8px;border:0;background:transparent;color:#69645b;font-size:22px;cursor:pointer}
    @media(max-width:420px){.install-banner{left:10px;right:10px;bottom:10px;gap:9px;padding-left:13px}.install-banner__copy{font-size:13px}.install-banner__button{padding:9px 12px}}
  `;
  document.head.append(style);
  document.body.append(banner);

  const installButton = banner.querySelector('.install-banner__button');
  banner.querySelector('.install-banner__close').addEventListener('click', () => banner.remove());

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
  });

  installButton.addEventListener('click', async () => {
    if (!installPrompt) {
      alert('Para instalarla, abre el menú ⋮ de Chrome y elige «Instalar aplicación» o «Añadir a pantalla de inicio».');
      return;
    }
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    banner.remove();
  });

  window.addEventListener('appinstalled', () => banner.remove());

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').catch((error) => {
        console.error('No se pudo registrar el service worker:', error);
      });
    });
  }
})();
