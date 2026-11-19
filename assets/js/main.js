(function () {
  'use strict';
  var APTS = window.NEMERE_APTS, I18N = window.NEMERE_I18N;
  var LANGS = ['hu', 'en', 'de'];
  var lang = 'hu', prices = {};

  /* ---------------- Nyelv ---------------- */
  function pickLang() {
    var q = (location.search.match(/[?&]lang=(\w\w)/) || [])[1];
    var saved; try { saved = localStorage.getItem('nemere-lang'); } catch (e) {}
    var nav = (navigator.language || 'hu').slice(0, 2);
    return [q, saved, LANGS.indexOf(nav) > -1 ? nav : null, 'hu'].filter(function (l) { return l && I18N[l]; })[0];
  }
  function t(k) { return (I18N[lang] && I18N[lang][k]) || I18N.hu[k] || ''; }

  function applyLang(l) {
    lang = l;
    try { localStorage.setItem('nemere-lang', l); } catch (e) {}
    document.documentElement.lang = l;
    document.title = t('meta_title');
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === l)); });
    renderCards();
    var k = document.getElementById('nemere-kereso');
    if (k && window.NemereKereso) { k.setAttribute('data-lang', l); window.NemereKereso.mount(k); }
  }

  /* ---------------- Kártyák ---------------- */
  function photo(a, i, size) { return 'assets/img/' + a.letter.toLowerCase() + '-' + (i < 9 ? '0' : '') + (i + 1) + '-' + size + '.jpg'; }

  function specsHtml(a) {
    return '<dl class="specs">' +
      '<div><dt>' + t('spec_floor') + '</dt><dd>' + t('floor_' + a.floor) + '</dd></div>' +
      '<div><dt>' + t('spec_entrance') + '</dt><dd>' + t('entrance_' + a.entrance) + '</dd></div>' +
      '<div><dt>' + t('spec_kitchen') + '</dt><dd>' + t('kitchen_' + a.kitchen) + '</dd></div></dl>';
  }

  function renderCards() {
    var box = document.getElementById('cards');
    box.innerHTML = APTS.map(function (a, i) {
      return '<button class="card" type="button" data-apt="' + i + '">' +
        '<div class="card-photo"><img src="' + photo(a, 0, 's') + '" alt="' + a.name[lang] + '" loading="lazy"></div>' +
        '<div class="card-body"><h3>' + a.name[lang] + '</h3><span class="card-guests">' + a.guests + ' ' + t('guests') + '</span>' +
        specsHtml(a) + '<span class="card-more">' + t('card_more') + '</span></div></button>';
    }).join('');
    box.querySelectorAll('[data-apt]').forEach(function (b) {
      b.addEventListener('click', function () { openApt(Number(b.getAttribute('data-apt'))); });
    });
  }

  /* ---------------- Részletek ablak ---------------- */
  var dlg = document.getElementById('aptDlg');
  function openApt(i) {
    var a = APTS[i];
    var g = document.getElementById('dlgGallery');
    var imgs = '';
    for (var n = 0; n < a.photos; n++) imgs += '<img src="' + photo(a, n, 'l') + '" alt="' + a.name[lang] + ' – ' + (n + 1) + '" loading="' + (n ? 'lazy' : 'eager') + '">';
    g.innerHTML = imgs;
    var media = g.parentNode.querySelector('.dlg-media');
    if (!media) {
      media = document.createElement('div'); media.className = 'dlg-media';
      g.parentNode.insertBefore(media, g); media.appendChild(g);
      media.insertAdjacentHTML('beforeend', '<button class="dlg-nav" data-d="-1" style="left:12px" aria-label="‹">‹</button>' +
        '<button class="dlg-nav" data-d="1" style="right:12px" aria-label="›">›</button><span class="dlg-count"></span>');
      media.querySelectorAll('.dlg-nav').forEach(function (b) {
        b.onclick = function () { g.scrollBy({ left: Number(b.getAttribute('data-d')) * g.clientWidth, behavior: 'smooth' }); };
      });
      g.addEventListener('scroll', function () { updateCount(g, media); }, { passive: true });
    }
    g.scrollLeft = 0; updateCount(g, media);

    document.getElementById('dlgLetter').textContent = a.guests + ' ' + t('guests');
    document.getElementById('dlgTitle').textContent = a.name[lang];
    document.getElementById('dlgText').textContent = a.text[lang];
    var welcome = [a.baby && t('tag_baby'), a.dog && t('tag_dog'), a.cat && t('tag_cat')].filter(Boolean).join(', ') || t('tag_none');
    var price = prices[a.priceKey];
    document.getElementById('dlgSpecs').innerHTML =
      '<div><dt>' + t('dlg_bedrooms') + '</dt><dd>' + a.bedrooms + '</dd></div>' +
      '<div><dt>' + t('dlg_beds') + '</dt><dd>' + a.beds[lang] + '</dd></div>' +
      '<div><dt>' + t('spec_floor') + '</dt><dd>' + t('floor_' + a.floor) + '</dd></div>' +
      '<div><dt>' + t('spec_entrance') + '</dt><dd>' + t('entrance_' + a.entrance) + '</dd></div>' +
      '<div><dt>' + t('spec_kitchen') + '</dt><dd>' + t('kitchen_' + a.kitchen) + '</dd></div>' +
      '<div><dt>' + t('dlg_welcome') + '</dt><dd>' + welcome + '</dd></div>' +
      (price ? '<div><dt>' + t('dlg_from') + '</dt><dd>' + price.toLocaleString(lang === 'hu' ? 'hu-HU' : lang === 'de' ? 'de-DE' : 'en-GB') + ' Ft ' + t('per_night') + '</dd></div>' : '');
    document.getElementById('dlgCta').textContent = t('dlg_cta');
    dlg.querySelector('.dlg-close').setAttribute('aria-label', t('dlg_close'));
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }
  function updateCount(g, media) {
    var n = g.children.length, i = Math.round(g.scrollLeft / (g.clientWidth || 1)) + 1;
    media.querySelector('.dlg-count').textContent = i + ' / ' + n;
  }
  function closeDlg() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }
  dlg.addEventListener('close', function () { document.body.style.overflow = ''; });
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg || e.target.closest('[data-close]')) closeDlg();
  });

  /* ---------------- Árak a táblázatból („-tól” ár) ---------------- */
  function loadPrices() {
    if (!window.NEMERE_PRICES || !window.fetch) return;
    fetch(window.NEMERE_PRICES).then(function (r) { return r.text(); }).then(function (txt) {
      txt.split(/\r?\n/).slice(1).forEach(function (line) {
        var c = line.split(','), name = (c[0] || '').trim();
        var vals = c.slice(3, 8).map(function (v) { return parseInt(String(v).replace(/\D/g, ''), 10) || 0; }).filter(Boolean);
        if (name && vals.length) prices[name] = Math.min.apply(null, vals);
      });
    }).catch(function () {});
  }

  /* ---------------- Fejléc, menü ---------------- */
  var top = document.getElementById('top'), burger = document.querySelector('.burger'), nav = document.getElementById('nav');
  function onScrollHeader() { top.classList.toggle('solid', window.scrollY > 40); }
  burger.addEventListener('click', function () {
    var open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { burger.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); document.body.style.overflow = ''; }
  });
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });

  /* ---------------- Panoráma: görgetésre jobbról balra ---------------- */
  var pano = document.getElementById('pano'), track = document.getElementById('panoTrack'),
    pimg = document.getElementById('panoImg'), bar = document.getElementById('panoBar');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pan = 0, run = 0;

  function layoutPano() {
    if (!pimg.naturalWidth) return;
    var vw = window.innerWidth, vh = window.innerHeight, ratio = pimg.naturalWidth / pimg.naturalHeight;
    var h = Math.max(vh, (vw * 1.4) / ratio);          // legalább 40%-kal szélesebb legyen a képernyőnél
    var w = h * ratio;
    pimg.style.height = h + 'px'; pimg.style.width = w + 'px';
    pimg.style.marginTop = ((vh - h) / 2) + 'px';
    pan = w - vw;
    run = Math.max(pan * 1.15, vh * 1.4);                // ennyi görgetés alatt fordul végig
    pano.style.height = reduce ? '' : (vh + run) + 'px';
    if (reduce) { track.style.overflowX = 'auto'; }
    onScrollPano();
  }
  function onScrollPano() {
    if (reduce || !pan) return;
    var r = pano.getBoundingClientRect();
    var p = Math.min(1, Math.max(0, -r.top / run));
    track.style.transform = 'translate3d(' + (-pan * (1 - p)) + 'px,0,0)';   // jobb széléről indul, balra fordul
    bar.style.width = (p * 100) + '%';
    pano.classList.toggle('moving', p > 0.04 && p < 0.97);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { onScrollHeader(); onScrollPano(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', layoutPano);
  if (pimg.complete) layoutPano(); else pimg.addEventListener('load', layoutPano);

  /* ---------------- Indítás ---------------- */
  document.getElementById('year').textContent = new Date().getFullYear();
  applyLang(pickLang());
  onScrollHeader();
  loadPrices();
})();
