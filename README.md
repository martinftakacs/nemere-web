# Nemere Apartmanház – weboldal

Statikus weboldal (GitHub Pages). Domain: **nemereapartmans.hu** (bekötés folyamatban).

## Felépítés
| Fájl | Mire való |
|---|---|
| `index.html` | Az oldal váza (szekciók) |
| `assets/js/i18n.js` | **Minden szöveg** magyarul, angolul, németül |
| `assets/js/data.js` | **Apartmanok** adatai: név, férőhely, szint, bejárat, konyha, leírás, képszám |
| `assets/js/kereso.js` | Szállás-kereső (foglaltság + árak) |
| `assets/js/main.js` | Működés: nyelvváltás, kártyák, galéria, panoráma |
| `assets/css/style.css` | Megjelenés (színek a fájl elején) |
| `assets/img/` | Képek: `a-01-l.jpg` … (a–e = apartmanok, `-l` nagy, `-s` kicsi) |
| `assets/logo/` | Logók színváltozatai |

## Adatforrások
- **Foglaltság:** Channel Manager (Google Apps Script) – `index.html` alján `NEMERE_ENDPOINT`
- **Árak:** publikált Google Táblázat (CSV) – `index.html` alján `NEMERE_PRICES`. A táblázat átírása után az oldal azonnal az új árakat mutatja.

## Élesítés a domainre
1. Forpsi DNS: az alábbi rekordok.
2. GitHub → Settings → Pages → Custom domain: `nemereapartmans.hu` → Save, majd *Enforce HTTPS*.
3. `index.html`-ből töröld a `<meta name="robots" content="noindex, nofollow">` sort (tesztüzem alatt a keresők nem indexelik az oldalt).

### DNS-rekordok (nemereapartmans.hu)
| Típus | Név | Érték |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | martinftakacs.github.io |

A betűtípusok (Bodoni Moda, Jost) SIL Open Font License alatt, licenc: `assets/fonts/`.
