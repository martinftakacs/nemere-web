(function () {
  'use strict';
  var APTS = window.NEMERE_APTS, I18N = window.NEMERE_I18N;
  var LANGS = ['hu', 'en', 'de'];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    var gm = document.getElementById('grpMail');
    if (gm) gm.href = 'mailto:kenese@nemereapartmans.hu?subject=' + encodeURIComponent(t('grp_mail_subject')) + '&body=' + encodeURIComponent(t('grp_mail_body'));
    renderReviews();
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

  /* ---------------- Vélemények (carousel) ---------------- */
  var reviews = [], revIdx = 0, revTimer = null, revPaused = false;
  var revSec = document.getElementById('velemenyek'), revStage = document.getElementById('revStage'), revDots = document.getElementById('revDots');

  function loadReviews() {
    var demo = window.NEMERE_DEMO && window.NEMERE_DEMO.reviews;
    var p = demo ? Promise.resolve({ reviews: demo }) :
      (window.NEMERE_ENDPOINT && window.fetch ? fetch(window.NEMERE_ENDPOINT + '?format=reviews').then(function (r) { return r.json(); }) : Promise.reject());
    p.then(function (d) { reviews = (d && d.reviews) || []; renderReviews(); }).catch(function () {});
  }
  function esc(x) { return String(x || '').replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function scoreTxt(r) {
    if (!r.score) return '';
    var n = parseFloat(String(r.score).replace(',', '.'));
    return isNaN(n) ? r.score : r.score + ' / ' + (n <= 5 ? 5 : 10);
  }
  function orderedReviews() {   // az aktuális nyelvű vélemények előre
    return reviews.slice().sort(function (a, b) { return (b.lang === lang) - (a.lang === lang); });
  }
  function renderReviews() {
    if (!revSec) return;
    if (!reviews.length) { revSec.hidden = true; return; }
    revSec.hidden = false;
    var list = orderedReviews();
    revStage.innerHTML = list.map(function (r, i) {
      var meta = [r.source, scoreTxt(r), r.date].filter(Boolean).join(' · ');
      return '<figure class="rev-item' + (i === 0 ? ' on' : '') + '"><span class="rev-mark" aria-hidden="true">“</span>' +
        '<blockquote class="rev-text' + (r.text.length > 220 ? ' long' : '') + '">' + esc(r.text) + '</blockquote>' +
        '<figcaption><div class="rev-who">' + esc(r.name) + (r.from ? ', ' + esc(r.from) : '') + '</div>' +
        (meta ? '<div class="rev-meta">' + esc(meta) + '</div>' : '') + '</figcaption></figure>';
    }).join('');
    revDots.innerHTML = list.map(function (_, i) { return '<button type="button" aria-label="' + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : '') + ' data-i="' + i + '"></button>'; }).join('');
    revDots.querySelectorAll('button').forEach(function (b) { b.onclick = function () { showReview(Number(b.getAttribute('data-i'))); restartRev(); }; });
    document.querySelector('.rev-controls').style.display = list.length > 1 ? '' : 'none';
    revIdx = 0; restartRev();
  }
  function showReview(i) {
    var items = revStage.querySelectorAll('.rev-item'), n = items.length;
    if (!n) return;
    i = (i + n) % n;
    items.forEach(function (el, j) { el.classList.toggle('out', j === revIdx && j !== i); el.classList.toggle('on', j === i); });
    revDots.querySelectorAll('button').forEach(function (b, j) { b.setAttribute('aria-current', String(j === i)); });
    revIdx = i;
  }
  function restartRev() {
    clearInterval(revTimer);
    if (reduce || reviews.length < 2) return;
    revTimer = setInterval(function () { if (!revPaused && !document.hidden) showReview(revIdx + 1); }, 7000);
  }
  if (revSec) {
    document.querySelectorAll('[data-rev]').forEach(function (b) { b.onclick = function () { showReview(revIdx + Number(b.getAttribute('data-rev'))); restartRev(); }; });
    revSec.addEventListener('mouseenter', function () { revPaused = true; });
    revSec.addEventListener('mouseleave', function () { revPaused = false; });
    revSec.addEventListener('focusin', function () { revPaused = true; });
    revSec.addEventListener('focusout', function () { revPaused = false; });
    var tx = null;
    revStage.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; revPaused = true; }, { passive: true });
    revStage.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - tx; revPaused = false;
      if (Math.abs(dx) > 40) { showReview(revIdx + (dx < 0 ? 1 : -1)); restartRev(); }
    }, { passive: true });
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
  var pan = 0, run = 0, lastW = 0, stableH = 0;

  // A mobil böngészők címsora görgetéskor eltűnik/megjelenik, ami átméretezést okoz.
  // Csak szélességváltozásra számolunk újra, a magasságot pedig a "kis" (svh) képernyőmagasságból vesszük.
  function viewportH() {
    var probe = document.getElementById('vhProbe');
    if (!probe) {
      probe = document.createElement('div'); probe.id = 'vhProbe';
      probe.style.cssText = 'position:fixed;top:0;height:100svh;width:0;visibility:hidden;pointer-events:none';
      document.body.appendChild(probe);
    }
    return probe.offsetHeight || window.innerHeight;
  }

  function layoutPano(force) {
    if (!pimg.naturalWidth) return;
    var vw = document.documentElement.clientWidth;
    if (!force && vw === lastW && stableH) return;      // csak magasság változott (címsor) → nem nyúlunk hozzá
    lastW = vw; stableH = viewportH();
    var vh = stableH, ratio = pimg.naturalWidth / pimg.naturalHeight;
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
  window.addEventListener('resize', function () { layoutPano(false); });
  window.addEventListener('orientationchange', function () { setTimeout(function () { layoutPano(true); }, 300); });
  if (pimg.complete) layoutPano(true); else pimg.addEventListener('load', function () { layoutPano(true); });

  /* ---------------- Indítás ---------------- */
  document.getElementById('year').textContent = new Date().getFullYear();
  applyLang(pickLang());
  onScrollHeader();
  loadPrices();
  loadReviews();
})();
