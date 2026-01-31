/* v20260131-17 */
(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile menu
  const toggle = document.querySelector('.menu__toggle');
  const panel = document.getElementById('menuPanel');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (!panel.classList.contains('open')) return;
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (panel.contains(t) || toggle.contains(t)) return;
      panel.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Cookie
  const cookie = document.getElementById('cookie');
  const ok = document.getElementById('cookieOk');
  try {
    const key = 'vr_cookie_ok';
    if (localStorage.getItem(key) !== '1' && cookie) cookie.style.display = 'flex';
    ok?.addEventListener('click', () => {
      localStorage.setItem(key, '1');
      if (cookie) cookie.style.display = 'none';
    });
  } catch {}

  // Masters (edit here)
  const masters = [
    { name: 'Артемий', role: 'ТВ и техника', tags: ['платы', 'диагностика', 'ремонт'], photo: 'assets/master-artemiy.webp' },
    { name: 'Василий', role: 'Пайка и электроника', tags: ['микросхемы', 'восстановление', 'сложный ремонт'], photo: 'assets/master-vasiliy.webp' },
    { name: 'Владислав', role: 'Телефоны и ноутбуки', tags: ['дисплеи', 'аккумуляторы', 'Windows'], photo: 'assets/master-vladislav.webp' },
  ];
  const team = document.getElementById('teamGrid');
  if (team) {
    team.innerHTML = masters.map(m => {
      const initials = (m.name||'Мастер').split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
      const tags = (m.tags||[]).slice(0,4).map(t => `<span class="tag">${esc(t)}</span>`).join('');
      return `<article class="member">
        <div class="member__photo" aria-hidden="true">${m.photo ? `<img src="${esc(m.photo)}" alt="">` : initials}</div>
        <div class="member__body">
          <div class="member__name">${esc(m.name||'')}</div>
          <div class="member__role">${esc(m.role||'')}</div>
          <div class="member__tags">${tags}</div>
        </div>
      </article>`;
    }).join('');
  }

  const form = document.querySelector('form.form');
  const buttons = document.querySelectorAll('[data-send]');
  const LINKS = {
    telegram: 'https://t.me/vremonte161',
    whatsapp: 'https://wa.me/79255156161',
    max: 'https://max.ru/u/f9LHodD0cOIcyLKszOi0I1wOwGuyOltplh3obPyqkL7_jwUK6DRgug2lKI8'
  };

  function collect() {
    if (!form) return '';
    const d = new FormData(form);
    const category = String(d.get('category')||'').trim();
    const model = String(d.get('model')||'').trim();
    const problem = String(d.get('problem')||'').trim();
    const phone = String(d.get('phone')||'').trim();
    return [
      'Заявка с сайта «В ремонте»',
      category ? `Категория: ${category}` : '',
      model ? `Модель: ${model}` : '',
      problem ? `Проблема: ${problem}` : '',
      phone ? `Телефон: ${phone}` : '',
      '',
      'Адрес приёма: Ткачёва 22'
    ].filter(Boolean).join('\n');
  }

  function open(kind) {
    if (kind === 'whatsapp') {
      window.open(LINKS.whatsapp + '?text=' + encodeURIComponent(collect()), '_blank', 'noopener');
      return;
    }
    window.open(LINKS[kind], '_blank', 'noopener');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (form && !form.checkValidity()) { form.reportValidity(); return; }
      const kind = btn.getAttribute('data-send');
      if (kind && LINKS[kind]) open(kind);
    });
  });

  function esc(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');}
})();
