/*
 * Nemere Apartmanház – szállás-kereső
 *
 * Beillesztés:
 *   <div id="nemere-kereso" data-lang="hu"></div>
 *   <script src="kereso.js"
 *     data-endpoint="(Channel Manager web app /exec címe)"
 *     data-prices="(árlista CSV publikált címe)"></script>
 *
 * Opcionális data-* a #nemere-kereso elemen: lang (hu|en|de), phone, email, ifa (Ft/felnőtt/éj)
 */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- *
   *  NYELVEK – újabb nyelv: másold le az "en" blokkot és fordítsd le
   * ---------------------------------------------------------------- */
  var I18N = {
    hu: {
      arrival: 'Érkezés', departure: 'Távozás', pickDates: 'Válaszd ki az érkezés és a távozás napját',
      pickDeparture: 'Most válaszd ki a távozás napját', nights: 'éj', adults: 'Felnőttek', children: 'Gyerekek',
      childrenHint: '18 év alatt', baby: 'Babával érkezünk', dog: 'Kutyával érkezünk', cat: 'Macskával / kisállattal érkezünk',
      search: 'Keresés', back: 'Új keresés', loading: 'Adatok betöltése…', loadError: 'Most nem sikerült betölteni az adatokat. Kérjük, hívj minket telefonon!',
      noDates: 'Előbb válaszd ki a dátumokat a naptárban.', fullDay: 'Ezen az éjszakán minden apartmanunk foglalt.',
      resultsFor: 'Ajánlataink', best: 'Legjobb ajánlat', option: 'Lehetőség', person: 'fő', perNight: '/ éj',
      accommodation: 'Szállásdíj', ifa: 'Idegenforgalmi adó', total: 'Összesen', wholeHouse: 'A teljes házat egyedi áron számoltuk.',
      none: 'A megadott időszakra és feltételekkel sajnos nincs elég szabad helyünk. Próbálj másik időpontot, vagy hívj minket – hátha találunk megoldást!',
      request: 'Ajánlatot kérek erre', requestTitle: 'Ajánlatkérés', directNote: 'Közvetlenül nálunk kedvezőbb áron foglalhatsz, mint a foglalási oldalakon!',
      copy: 'Szöveg másolása', copied: 'Kimásolva!', estimate: 'Az ár tájékoztató jellegű, a foglalást visszaigazolással véglegesítjük.',
      legendFull: 'Telt ház', legendFew: 'Kevés szabad hely', tagBaby: 'babás', tagDog: 'kutyás', tagCat: 'macskás', mailSubject: 'Ajánlatkérés', months: ['január','február','március','április','május','június','július','augusztus','szeptember','október','november','december'],
      dows: ['H','K','Sze','Cs','P','Szo','V'], ymFmt: function (y, m) { return y + '. ' + m; }
    },
    en: {
      arrival: 'Check-in', departure: 'Check-out', pickDates: 'Select your check-in and check-out dates',
      pickDeparture: 'Now select your check-out date', nights: 'nights', adults: 'Adults', children: 'Children',
      childrenHint: 'under 18', baby: 'Travelling with a baby', dog: 'Bringing a dog', cat: 'Bringing a cat / small pet',
      search: 'Search', back: 'New search', loading: 'Loading…', loadError: 'We could not load the data right now. Please call us!',
      noDates: 'Please select your dates in the calendar first.', fullDay: 'All our apartments are booked for this night.',
      resultsFor: 'Our offers', best: 'Best offer', option: 'Option', person: 'guests', perNight: '/ night',
      accommodation: 'Accommodation', ifa: 'Tourist tax', total: 'Total', wholeHouse: 'Whole-house special price applied.',
      none: 'Unfortunately we do not have enough free space for these dates and conditions. Try other dates or give us a call – we may still find a solution!',
      request: 'Request this offer', requestTitle: 'Request an offer', directNote: 'Booking directly with us is cheaper than on booking sites!',
      copy: 'Copy text', copied: 'Copied!', estimate: 'Prices are indicative; your booking is final once we confirm it.',
      legendFull: 'Fully booked', legendFew: 'Few places left', tagBaby: 'baby-friendly', tagDog: 'dogs welcome', tagCat: 'cats welcome', mailSubject: 'Booking request', months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      dows: ['Mo','Tu','We','Th','Fr','Sa','Su'], ymFmt: function (y, m) { return m + ' ' + y; }
    },
    de: {
      arrival: 'Anreise', departure: 'Abreise', pickDates: 'Wählen Sie Ihr An- und Abreisedatum',
      pickDeparture: 'Wählen Sie jetzt das Abreisedatum', nights: 'Nächte', adults: 'Erwachsene', children: 'Kinder',
      childrenHint: 'unter 18', baby: 'Mit Baby', dog: 'Mit Hund', cat: 'Mit Katze / Kleintier',
      search: 'Suchen', back: 'Neue Suche', loading: 'Wird geladen…', loadError: 'Die Daten konnten nicht geladen werden. Bitte rufen Sie uns an!',
      noDates: 'Bitte wählen Sie zuerst die Daten im Kalender.', fullDay: 'In dieser Nacht sind alle Apartments belegt.',
      resultsFor: 'Unsere Angebote', best: 'Bestes Angebot', option: 'Option', person: 'Pers.', perNight: '/ Nacht',
      accommodation: 'Unterkunft', ifa: 'Kurtaxe', total: 'Gesamt', wholeHouse: 'Sonderpreis für das ganze Haus berechnet.',
      none: 'Leider haben wir für diesen Zeitraum und diese Bedingungen nicht genug freie Plätze. Versuchen Sie andere Daten oder rufen Sie uns an!',
      request: 'Dieses Angebot anfragen', requestTitle: 'Anfrage', directNote: 'Direkt bei uns buchen Sie günstiger als auf Buchungsportalen!',
      copy: 'Text kopieren', copied: 'Kopiert!', estimate: 'Die Preise sind unverbindlich; die Buchung gilt nach unserer Bestätigung.',
      legendFull: 'Ausgebucht', legendFew: 'Wenige Plätze frei', tagBaby: 'babyfreundlich', tagDog: 'Hunde willkommen', tagCat: 'Katzen willkommen', mailSubject: 'Buchungsanfrage', months: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
      dows: ['Mo','Di','Mi','Do','Fr','Sa','So'], ymFmt: function (y, m) { return m + ' ' + y; }
    }
  };

  /* ---------------------------------------------------------------- *
   *  TISZTA LOGIKA (tesztelhető)
   * ---------------------------------------------------------------- */
  function parseCSV(text) {
    var first = text.slice(0, 1000);
    var delim = (first.match(/;/g) || []).length > (first.match(/,/g) || []).length ? ';' : ',';
    var lines = text.split(/\r?\n/).filter(function (l) { return l.trim(); });
    var out = [];
    for (var i = 1; i < lines.length; i++) {
      var row = [], val = '', q = false;
      for (var j = 0; j < lines[i].length; j++) {
        var c = lines[i][j];
        if (c === '"') q = !q;
        else if (c === delim && !q) { row.push(val.trim()); val = ''; }
        else val += c;
      }
      row.push(val.trim());
      var s = function (k) { return row.length > k ? row[k] : ''; };
      var n = function (k) { return parseInt(s(k).replace(/\D/g, ''), 10) || 0; };
      var yes = function (k) { var v = s(k).toLowerCase(); return v.indexOf('igen') > -1 || v === 'x' || v === 'yes'; };
      if (!s(0)) continue;
      out.push({
        name: s(0), capacity: n(1), extraBeds: n(2),
        prices: { 5: n(3), 4: n(4), 3: n(5), 2: n(6), 1: n(7) },
        baby: yes(8), dog: yes(9), cat: yes(10), whole: n(11)
      });
    }
    return out;
  }

  /** Egy éjszaka ára adott létszámra – ugyanaz a logika, mint a régi kalkulátorban. */
  function nightPrice(apt, pax) {
    var key = function (p) { return p >= 5 ? 5 : p; };
    var v = apt.prices[key(pax)];
    if (v > 0) return v;
    for (var i = pax + 1; i <= 8; i++) { v = apt.prices[key(i)]; if (v > 0) return v; }
    for (i = pax - 1; i >= 1; i--) { v = apt.prices[key(i)]; if (v > 0) return v; }
    return 0;
  }

  function overlaps(busy, from, to) {
    for (var i = 0; i < busy.length; i++) {
      if (busy[i][0] < to && busy[i][1] > from) return true;
    }
    return false;
  }

  /**
   * A legjobb elosztások: kevesebb apartman előnyben, azon belül az olcsóbb.
   * apts: [{id, name, capacity, extraBeds, prices, ...}]  →  [{items:[{apt,pax,price}], perNight, whole}]
   */
  function bestOptions(apts, pax, totalUnits, wholePrice, limit) {
    var n = apts.length, results = [];
    for (var mask = 1; mask < (1 << n); mask++) {
      var set = [];
      for (var b = 0; b < n; b++) if (mask & (1 << b)) set.push(apts[b]);
      var maxCap = set.reduce(function (a, x) { return a + x.capacity + x.extraBeds; }, 0);
      if (maxCap < pax || set.length > pax) continue;
      // DP: minimális ár, minden apartmanba legalább 1 fő
      var INF = 1e15, dp = [[0]], choice = [];
      for (var i = 0; i < set.length; i++) {
        dp[i + 1] = []; choice[i + 1] = [];
        var cap = set[i].capacity + set[i].extraBeds;
        for (var k = 0; k <= pax; k++) {
          dp[i + 1][k] = INF;
          for (var p = 1; p <= Math.min(cap, k); p++) {
            var prev = dp[i][k - p];
            if (prev === undefined || prev >= INF) continue;
            var pr = nightPrice(set[i], p);
            if (prev + pr < dp[i + 1][k]) { dp[i + 1][k] = prev + pr; choice[i + 1][k] = p; }
          }
        }
      }
      if (!(dp[set.length][pax] < INF)) continue;
      var items = [], left = pax;
      for (i = set.length; i >= 1; i--) {
        var take = choice[i][left];
        items.unshift({ apt: set[i - 1], pax: take, price: nightPrice(set[i - 1], take) });
        left -= take;
      }
      var perNight = dp[set.length][pax], whole = false;
      if (set.length === totalUnits && wholePrice > 0 && wholePrice < perNight) { perNight = wholePrice; whole = true; }
      results.push({ items: items, perNight: perNight, whole: whole });
    }
    results.sort(function (a, b) { return a.items.length - b.items.length || a.perNight - b.perNight; });
    // Több apartmanra bontott ajánlat csak akkor, ha a legkevesebb apartmanos változatból 1-nél kevesebb alternatíva van
    if (results.length) {
      var minCnt = results[0].items.length;
      var same = results.filter(function (r) { return r.items.length === minCnt; });
      if (same.length >= 2) results = same;
    }
    return results.slice(0, limit || 3);
  }

  function addDays(ymd, d) {
    var p = ymd.split('-').map(Number);
    return new Date(Date.UTC(p[0], p[1] - 1, p[2] + d)).toISOString().slice(0, 10);
  }
  function nightsBetween(a, b) {
    return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 864e5);
  }

  /** Árlista sorok összepárosítása a foglaltsági egységekkel (név eleje alapján). */
  function mergeData(priceRows, units) {
    var norm = function (s) { return String(s).toLowerCase().replace(/\s+/g, ' ').trim(); };
    return priceRows.map(function (r) {
      var u = units.filter(function (x) {
        var a = norm(x.name), b = norm(r.name);
        return a === b || a.indexOf(b) === 0 || norm(x.id) === b;
      })[0];
      return {
        id: u ? u.id : r.name, name: u ? u.name : r.name, busy: u ? u.busy : [],
        capacity: r.capacity, extraBeds: r.extraBeds, prices: r.prices, baby: r.baby, dog: r.dog, cat: r.cat, whole: r.whole,
        matched: !!u
      };
    });
  }

  if (typeof module !== 'undefined') {
    module.exports = { parseCSV: parseCSV, nightPrice: nightPrice, bestOptions: bestOptions, mergeData: mergeData, overlaps: overlaps };
    return;
  }

  /* ---------------------------------------------------------------- *
   *  FELÜLET
   * ---------------------------------------------------------------- */
  var me = document.currentScript;
  var ENDPOINT = (me && me.getAttribute('data-endpoint')) || window.NEMERE_ENDPOINT;
  var PRICES = (me && me.getAttribute('data-prices')) || window.NEMERE_PRICES;

  var CSS = '' +
    '.nk{--nk-bg:#000052;--nk-fg:#fff;--nk-soft:rgba(255,255,255,.12);--nk-acc:#ffd54a;--nk-busy:#e05a4f;' +
    'background:var(--nk-bg);color:var(--nk-fg);font-family:inherit;border-radius:var(--nk-r,16px);padding:18px;box-sizing:border-box;max-width:760px;margin:0 auto;position:relative}' +
    '.nk *{box-sizing:border-box}.nk h3{margin:0 0 12px;font-size:20px}.nk h4{margin:0}' +
    '.nk-dates{display:flex;gap:10px;margin-bottom:12px}.nk-date{flex:1;background:var(--nk-soft);border-radius:var(--nk-r,10px);padding:8px 12px}' +
    '.nk-date small{display:block;opacity:.75;font-size:12px}.nk-date b{font-size:16px}' +
    '.nk-cal{background:var(--nk-soft);border-radius:var(--nk-r,12px);padding:10px;margin-bottom:12px}' +
    '.nk-calnav{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}' +
    '.nk-calnav button{background:#fff;color:var(--nk-bg);border:0;border-radius:50%;width:30px;height:30px;font-size:18px;cursor:pointer}' +
    '.nk-calnav button:disabled{opacity:.3;cursor:default}' +
    '.nk-months{display:flex;gap:16px;flex-wrap:wrap}.nk-month{flex:1 1 230px}' +
    '.nk-month h5{margin:0 0 6px;text-align:center;font-size:14px}' +
    '.nk-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}' +
    '.nk-dow{text-align:center;font-size:11px;opacity:.7}' +
    '.nk-d{aspect-ratio:1/1;border:0;border-radius:6px;background:transparent;color:inherit;font:inherit;font-size:13px;cursor:pointer;position:relative;padding:0}' +
    '.nk-d:hover:not(:disabled){background:rgba(255,255,255,.2)}' +
    '.nk-d:disabled{opacity:.3;cursor:default}' +
    '.nk-d.full{color:var(--nk-busy);text-decoration:line-through;opacity:.8}' +
    '.nk-d.few::after{content:"";position:absolute;bottom:3px;left:50%;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--nk-acc)}' +
    '.nk-d.in{background:rgba(255,255,255,.22);border-radius:0}' +
    '.nk-d.sel{background:#fff!important;color:var(--nk-bg);font-weight:bold;border-radius:6px}' +
    '.nk-legend{display:flex;gap:14px;font-size:11px;opacity:.85;margin-top:6px;flex-wrap:wrap}' +
    '.nk-legend span{display:inline-flex;align-items:center;gap:5px}' +
    '.nk-row{display:flex;justify-content:space-between;align-items:center;font-weight:bold;margin:8px 0}' +
    '.nk-row small{display:block;font-weight:normal;opacity:.7;font-size:11px}' +
    '.nk-ctl{display:flex;align-items:center;gap:12px}' +
    '.nk-ctl button{width:34px;height:34px;border-radius:50%;border:0;background:#fff;color:var(--nk-bg);font-size:20px;font-weight:bold;cursor:pointer}' +
    '.nk-ctl span{min-width:22px;text-align:center}' +
    '.nk-checks{background:var(--nk-soft);border-radius:var(--nk-r,12px);padding:12px 14px;display:flex;flex-direction:column;gap:9px;margin:12px 0}' +
    '.nk-checks label{display:flex;gap:10px;align-items:center;cursor:pointer;font-size:14px}' +
    '.nk-checks input{width:18px;height:18px}' +
    '.nk-btn{width:100%;padding:14px;border:0;border-radius:var(--nk-r,12px);background:#fff;color:var(--nk-bg);font-weight:bold;font-size:16px;text-transform:uppercase;cursor:pointer}' +
    '.nk-btn.ghost{background:transparent;color:#fff;border:1px solid #fff;text-transform:none;font-size:14px;padding:10px}' +
    '.nk-msg{background:#ff5a5a;color:#fff;border-radius:var(--nk-r,10px);padding:10px;margin:10px 0;font-size:14px;font-weight:bold;text-align:center}' +
    '.nk-sum{opacity:.85;font-size:14px;margin-bottom:12px}' +
    '.nk-opt{background:var(--nk-soft);border-radius:var(--nk-r,14px);padding:14px;margin-bottom:12px}' +
    '.nk-opt.best{background:rgba(255,255,255,.18);outline:2px solid var(--nk-acc)}' +
    '.nk-tag{display:inline-block;background:var(--nk-acc);color:#000052;font-size:11px;font-weight:bold;padding:2px 8px;border-radius:20px;margin-bottom:8px;text-transform:uppercase}' +
    '.nk-apt{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.12);font-size:14px}' +
        '.nk-tot p{display:flex;justify-content:space-between;margin:6px 0;font-size:14px}' +
    '.nk-tot h4{display:flex;justify-content:space-between;font-size:18px;margin-top:8px}' +
    '.nk-note{font-size:12px;opacity:.85;margin:8px 0}' +
    '.nk-contact{display:flex;flex-direction:column;gap:8px;margin-top:10px}' +
    '.nk-contact a{display:block;text-align:center;padding:10px;border:1px solid #fff;border-radius:var(--nk-r,10px);color:#fff;text-decoration:none;font-weight:bold;font-size:14px}' +
    '.nk-req{white-space:pre-wrap;background:rgba(0,0,0,.25);border-radius:var(--nk-r,10px);padding:10px;font-size:13px;margin:8px 0}' +
    '.nk-hidden{display:none}';

  function injectCss() {
    if (document.getElementById('nk-css')) return;
    var s = document.createElement('style'); s.id = 'nk-css'; s.textContent = CSS; document.head.appendChild(s);
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmtFt(n, lang) { return n.toLocaleString(lang === 'hu' ? 'hu-HU' : lang === 'de' ? 'de-DE' : 'en-GB') + ' Ft'; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function todayLocal() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }

  function App(root) {
    this.root = root;
    this.lang = root.getAttribute('data-lang') || (document.documentElement.lang || 'hu').slice(0, 2);
    if (!I18N[this.lang]) this.lang = 'hu';
    this.t = I18N[this.lang];
    this.phone = root.getAttribute('data-phone') || '+36 70 258 7981';
    this.email = root.getAttribute('data-email') || 'kenese@nemereapartmans.hu';
    this.ifaRate = Number(root.getAttribute('data-ifa') || 600);
    this.state = { from: null, to: null, adults: 2, children: 0, baby: false, dog: false, cat: false, shift: 0 };
    this.apts = []; this.today = todayLocal();
  }

  App.prototype.load = function () {
    var self = this, t = this.t;
    this.root.className = 'nk';
    this.root.innerHTML = '<p>' + t.loading + '</p>';
    var demo = window.NEMERE_DEMO;
    var pAvail = demo ? Promise.resolve(demo.avail) :
      fetch(ENDPOINT + (ENDPOINT.indexOf('?') > -1 ? '&' : '?') + 'format=json').then(function (r) { if (!r.ok) throw 0; return r.json(); });
    var pPrices = demo ? Promise.resolve(demo.csv) :
      fetch(PRICES).then(function (r) { if (!r.ok) throw 0; return r.text(); });
    Promise.all([pAvail, pPrices]).then(function (res) {
      self.today = res[0].today || self.today;
      self.apts = mergeData(parseCSV(res[1]), res[0].units || []);
      if (!self.apts.length) throw 0;
      self.renderForm();
    }).catch(function () {
      self.root.innerHTML = '<div class="nk-msg">' + t.loadError + '</div>' + self.contactHtml('');
    });
  };

  /** Hány apartman szabad az adott éjszakán */
  App.prototype.freeCount = function (night) {
    var next = addDays(night, 1);
    return this.apts.filter(function (a) { return !overlaps(a.busy, night, next); }).length;
  };

  App.prototype.dateTxt = function (d) {
    if (!d) return '—';
    var p = d.split('-'); return this.lang === 'hu' ? p[0] + '.' + p[1] + '.' + p[2] + '.' : p[2] + '.' + p[1] + '.' + p[0];
  };

  App.prototype.renderForm = function () {
    var t = this.t, s = this.state, self = this;
    var dateTxt = function (d) { return self.dateTxt(d); };
    var nights = s.from && s.to ? nightsBetween(s.from, s.to) : 0;
    var h = '';
    h += '<div class="nk-dates"><div class="nk-date"><small>' + t.arrival + '</small><b>' + dateTxt(s.from) + '</b></div>' +
      '<div class="nk-date"><small>' + t.departure + (nights ? ' · ' + nights + ' ' + t.nights : '') + '</small><b>' + dateTxt(s.to) + '</b></div></div>';
    h += '<div class="nk-cal">' + this.calendarHtml() + '</div>';
    h += this.counterHtml('adults', t.adults, '') + this.counterHtml('children', t.children, t.childrenHint);
    h += '<div class="nk-checks">' +
      '<label><input type="checkbox" data-k="baby"' + (s.baby ? ' checked' : '') + '> ' + t.baby + '</label>' +
      '<label><input type="checkbox" data-k="dog"' + (s.dog ? ' checked' : '') + '> ' + t.dog + '</label>' +
      '<label><input type="checkbox" data-k="cat"' + (s.cat ? ' checked' : '') + '> ' + t.cat + '</label></div>';
    h += '<div class="nk-msg nk-hidden"></div><button class="nk-btn" data-act="search">' + t.search + '</button>';
    this.root.innerHTML = h;
    this.bind();
  };

  App.prototype.counterHtml = function (k, label, hint) {
    return '<div class="nk-row"><div>' + label + (hint ? '<small>' + hint + '</small>' : '') + '</div><div class="nk-ctl">' +
      '<button type="button" data-cnt="' + k + '" data-d="-1">−</button><span>' + this.state[k] + '</span>' +
      '<button type="button" data-cnt="' + k + '" data-d="1">+</button></div></div>';
  };

  App.prototype.calendarHtml = function () {
    var t = this.t, s = this.state;
    var months = this.root.offsetWidth > 560 ? 2 : 1;
    var base = this.today.split('-').map(Number);
    var h = '<div class="nk-calnav"><button type="button" data-nav="-1"' + (s.shift <= 0 ? ' disabled' : '') + '>‹</button>' +
      '<small>' + (s.from && !s.to ? t.pickDeparture : t.pickDates) + '</small>' +
      '<button type="button" data-nav="1"' + (s.shift >= 17 ? ' disabled' : '') + '>›</button></div><div class="nk-months">';
    for (var i = 0; i < months; i++) {
      var mm = base[1] - 1 + s.shift + i, y = base[0] + Math.floor(mm / 12), m = ((mm % 12) + 12) % 12;
      var first = new Date(y, m, 1), days = new Date(y, m + 1, 0).getDate(), off = (first.getDay() + 6) % 7;
      h += '<div class="nk-month"><h5>' + t.ymFmt(y, t.months[m]) + '</h5><div class="nk-grid">';
      t.dows.forEach(function (d) { h += '<div class="nk-dow">' + d + '</div>'; });
      for (var e = 0; e < off; e++) h += '<div></div>';
      for (var d = 1; d <= days; d++) {
        var key = y + '-' + pad(m + 1) + '-' + pad(d);
        var free = this.freeCount(key), cls = 'nk-d', dis = false;
        if (key < this.today) dis = true;
        if (free === 0) cls += ' full'; else if (free === 1) cls += ' few';
        // távozási napnak lehet választani telt napot is (azon az éjszakán már nem alszanak)
        if (free === 0 && !(s.from && !s.to && key > s.from)) dis = true;
        if (s.from === key || s.to === key) cls += ' sel';
        else if (s.from && s.to && key > s.from && key < s.to) cls += ' in';
        h += '<button type="button" class="' + cls + '" data-day="' + key + '"' + (dis ? ' disabled' : '') +
          (free === 0 ? ' title="' + esc(t.fullDay) + '"' : '') + '>' + d + '</button>';
      }
      h += '</div></div>';
    }
    h += '</div><div class="nk-legend"><span><s style="color:var(--nk-busy)">12</s> ' + t.legendFull + '</span>' +
      '<span><i style="width:6px;height:6px;border-radius:50%;background:var(--nk-acc);display:inline-block"></i> ' + t.legendFew + '</span></div>';
    return h;
  };

  App.prototype.pickDay = function (day) {
    var s = this.state;
    if (!s.from || s.to || day <= s.from) { s.from = day; s.to = null; }
    else {
      // ha közben van telt éjszaka, új érkezésként kezeljük
      for (var d = s.from; d < day; d = addDays(d, 1)) {
        if (this.freeCount(d) === 0) { s.from = this.freeCount(day) ? day : null; s.to = null; this.renderForm(); return; }
      }
      s.to = day;
    }
    this.renderForm();
  };

  App.prototype.bind = function () {
    var self = this, s = this.state, r = this.root;
    r.querySelectorAll('[data-day]').forEach(function (b) { b.onclick = function () { self.pickDay(b.getAttribute('data-day')); }; });
    r.querySelectorAll('[data-nav]').forEach(function (b) { b.onclick = function () { s.shift = Math.max(0, s.shift + Number(b.getAttribute('data-nav'))); self.renderForm(); }; });
    r.querySelectorAll('[data-cnt]').forEach(function (b) {
      b.onclick = function () {
        var k = b.getAttribute('data-cnt'), min = k === 'adults' ? 1 : 0;
        s[k] = Math.min(30, Math.max(min, s[k] + Number(b.getAttribute('data-d'))));
        b.parentNode.querySelector('span').textContent = s[k];
      };
    });
    r.querySelectorAll('[data-k]').forEach(function (c) { c.onchange = function () { s[c.getAttribute('data-k')] = c.checked; }; });
    var go = r.querySelector('[data-act="search"]');
    if (go) go.onclick = function () { self.search(); };
  };

  App.prototype.search = function () {
    var s = this.state, t = this.t;
    if (!s.from || !s.to) {
      var m = this.root.querySelector('.nk-msg'); m.textContent = t.noDates; m.classList.remove('nk-hidden'); return;
    }
    var avail = this.apts.filter(function (a) {
      if (s.baby && !a.baby) return false;
      if (s.dog && !a.dog) return false;
      if (s.cat && !a.cat) return false;
      return !overlaps(a.busy, s.from, s.to);
    });
    var whole = this.apts.reduce(function (m, a) { return Math.max(m, a.whole || 0); }, 0);
    this.options = bestOptions(avail, s.adults + s.children, this.apts.length, whole, 3);
    this.renderResults();
  };

  App.prototype.renderResults = function () {
    var t = this.t, s = this.state, self = this, nights = nightsBetween(s.from, s.to);
    var pax = s.adults + s.children;
    var h = '<h3>' + t.resultsFor + '</h3><div class="nk-sum">' + this.dateTxt(s.from) + ' → ' + this.dateTxt(s.to) + ' · ' + nights + ' ' + t.nights +
      ' · ' + pax + ' ' + t.person + '</div>';
    if (!this.options.length) {
      h += '<div class="nk-msg">' + t.none + '</div>' + this.contactHtml(this.requestText(null));
    }
    this.options.forEach(function (o, i) {
      var acc = o.perNight * nights, ifa = s.adults * self.ifaRate * nights;
      h += '<div class="nk-opt' + (i === 0 ? ' best' : '') + '">' + '<span class="nk-tag">' + (i === 0 ? t.best : t.option + ' ' + (i + 1)) + '</span>';
      o.items.forEach(function (it) {
        var tags = [it.apt.baby && t.tagBaby, it.apt.dog && t.tagDog, it.apt.cat && t.tagCat].filter(Boolean).join(' · ');
        h += '<div class="nk-apt"><div><b>' + esc(it.apt.name) + '</b><br><small>' + it.pax + ' ' + t.person + (tags ? ' · ' + tags : '') + '</small></div>' +
          '<div>' + (o.whole ? '' : fmtFt(it.price, self.lang) + ' ' + t.perNight) + '</div></div>';
      });
      if (o.whole) h += '<div class="nk-note">★ ' + t.wholeHouse + '</div>';
      h += '<div class="nk-tot"><p><span>' + t.accommodation + ' (' + nights + ' ' + t.nights + ')</span><span>' + fmtFt(acc, self.lang) + '</span></p>' +
        '<p><span>' + t.ifa + '</span><span>' + fmtFt(ifa, self.lang) + '</span></p>' +
        '<h4><span>' + t.total + '</span><span>' + fmtFt(acc + ifa, self.lang) + '</span></h4></div>' +
        '<button class="nk-btn ghost" data-req="' + i + '" style="margin-top:10px">' + t.request + '</button>' +
        '<div class="nk-reqbox nk-hidden" data-box="' + i + '"></div></div>';
    });
    h += '<p class="nk-note">' + t.directNote + ' ' + t.estimate + '</p>';
    h += '<button class="nk-btn" data-act="back">' + t.back + '</button>';
    this.root.innerHTML = h;
    this.root.querySelector('[data-act="back"]').onclick = function () { self.renderForm(); };
    this.root.querySelectorAll('[data-req]').forEach(function (b) {
      b.onclick = function () {
        var i = Number(b.getAttribute('data-req')), box = self.root.querySelector('[data-box="' + i + '"]');
        box.innerHTML = self.contactHtml(self.requestText(self.options[i]));
        box.classList.toggle('nk-hidden');
        self.bindCopy(box);
      };
    });
    this.bindCopy(this.root);
    this.root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  App.prototype.requestText = function (o) {
    var t = this.t, s = this.state, nights = nightsBetween(s.from, s.to), self = this;
    var lines = [t.arrival + ': ' + this.dateTxt(s.from), t.departure + ': ' + this.dateTxt(s.to) + ' (' + nights + ' ' + t.nights + ')',
      t.adults + ': ' + s.adults, t.children + ': ' + s.children];
    var extras = [];
    if (s.baby) extras.push(t.baby); if (s.dog) extras.push(t.dog); if (s.cat) extras.push(t.cat);
    if (extras.length) lines.push(extras.join(', '));
    if (o) {
      lines.push('');
      o.items.forEach(function (it) { lines.push('• ' + it.apt.name + ' – ' + it.pax + ' ' + t.person); });
      lines.push(t.total + ': ~' + fmtFt(o.perNight * nights + s.adults * self.ifaRate * nights, self.lang));
    }
    return lines.join('\n');
  };

  App.prototype.contactHtml = function (text) {
    var t = this.t;
    var mail = 'mailto:' + this.email + '?subject=' + encodeURIComponent(t.mailSubject + ' – Nemere Apartmanház') +
      '&body=' + encodeURIComponent(text + '\n\n');
    return (text ? '<div class="nk-req">' + esc(text) + '</div><button class="nk-btn ghost" data-copy="' + esc(text) + '">' + t.copy + '</button>' : '') +
      '<div class="nk-contact"><a href="tel:' + this.phone.replace(/\s/g, '') + '" target="_top">📞 ' + esc(this.phone) + '</a>' +
      '<a href="' + mail + '" target="_blank" rel="noopener">✉ ' + esc(this.email) + '</a></div>';
  };

  App.prototype.bindCopy = function (scope) {
    var t = this.t;
    scope.querySelectorAll('[data-copy]').forEach(function (b) {
      b.onclick = function () {
        var txt = b.getAttribute('data-copy');
        var done = function () { b.textContent = t.copied; setTimeout(function () { b.textContent = t.copy; }, 1500); };
        if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, done); else done();
      };
    });
  };

  function start() {
    injectCss();
    document.querySelectorAll('#nemere-kereso, .nemere-kereso').forEach(function (el) {
      if (!el.hasAttribute('data-manual')) new App(el).load();
    });
  }
  // Kézi indítás / újraindítás (pl. nyelvváltáskor): NemereKereso.mount(elem)
  window.NemereKereso = { mount: function (el) { injectCss(); new App(el).load(); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
