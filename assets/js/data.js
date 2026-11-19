/* Apartmanok adatai – itt lehet szöveget, képet, jellemzőt módosítani.
 * id = a Channel Manager azonosítója (apt1…apt5), letter = a ház belső jelölése (A…E)
 * price: az árlistából (Google Táblázat) automatikusan töltődik, ha elérhető. */
window.NEMERE_APTS = [
  {
    id: 'apt1', letter: 'A', priceKey: 'Családi', photos: 10,
    name: { hu: 'Családi apartman', en: 'Family Apartment', de: 'Familien-Apartment' },
    guests: '4 + 2', bedrooms: 2,
    floor: 'ground', entrance: 'own', kitchen: 'own',
    baby: true, dog: true, cat: true,
    text: {
      hu: 'Földszinti, saját bejáratú otthon két hálószobával, teljesen felszerelt konyhával és hangulatos étkezősarokkal. Lépcső nélkül, pár lépésre a kerttől – kisgyerekkel, babával, kutyussal vagy nagyszülőkkel is kényelmes.',
      en: 'A ground-floor home with its own entrance, two bedrooms, a fully equipped kitchen and a cosy dining nook. No stairs and just a few steps from the garden – easy with little ones, a baby, a dog or grandparents.',
      de: 'Ein Zuhause im Erdgeschoss mit eigenem Eingang, zwei Schlafzimmern, voll ausgestatteter Küche und gemütlicher Essecke. Ohne Treppen und nur wenige Schritte vom Garten – ideal mit Kleinkindern, Baby, Hund oder Großeltern.'
    },
    beds: { hu: '2 franciaágy + kihúzható pótágy', en: '2 double beds + pull-out extra bed', de: '2 Doppelbetten + ausziehbares Zustellbett' }
  },
  {
    id: 'apt2', letter: 'B', priceKey: 'Hajós', photos: 10,
    name: { hu: 'Hajós apartman', en: 'Sailor’s Apartment', de: 'Segler-Apartment' },
    guests: '4 + 1', bedrooms: 2,
    floor: 'ground', entrance: 'own', kitchen: 'own',
    baby: true, dog: true, cat: true,
    text: {
      hu: 'Vitorlás hangulatú földszinti apartman tágas nappalival, amerikai konyhával és két hálószobával. A fürdőben sarokkád, a fedett teraszon saját asztal várja a reggelit.',
      en: 'A ground-floor apartment with a sailing theme, a spacious living room, open kitchen and two bedrooms. A corner bath in the bathroom and your own table on the covered terrace for long breakfasts.',
      de: 'Ein Erdgeschoss-Apartment im Segler-Stil mit großem Wohnzimmer, offener Küche und zwei Schlafzimmern. Im Bad eine Eckbadewanne, auf der überdachten Terrasse ein eigener Tisch fürs Frühstück.'
    },
    beds: { hu: '2 franciaágy + pótágy', en: '2 double beds + extra bed', de: '2 Doppelbetten + Zustellbett' }
  },
  {
    id: 'apt3', letter: 'C', priceKey: 'Panoráma', photos: 12,
    name: { hu: 'Panoráma apartman', en: 'Panorama Apartment', de: 'Panorama-Apartment' },
    guests: '6 + 2', bedrooms: 3,
    floor: 'upper', entrance: 'hall', kitchen: 'shared',
    baby: true, dog: false, cat: true,
    text: {
      hu: 'Három hálószoba az emeleten, kettőből erkélyről látszik a Balaton egy szelete. Nagyobb családoknak, baráti társaságoknak – a szomszédos Baráti apartmannal egybenyitva akár 12 főnek is otthont ad.',
      en: 'Three upstairs bedrooms, two of them with a balcony and a glimpse of Lake Balaton. Made for larger families and groups – opened up together with the neighbouring Friends’ Apartment it sleeps up to 12.',
      de: 'Drei Schlafzimmer im Obergeschoss, zwei davon mit Balkon und Blick auf ein Stück Balaton. Für größere Familien und Gruppen – zusammen mit dem benachbarten Freundes-Apartment bis zu 12 Personen.'
    },
    beds: { hu: '3 franciaágy + 2 pótágy (gyereknek)', en: '3 double beds + 2 extra beds (for children)', de: '3 Doppelbetten + 2 Zustellbetten (für Kinder)' }
  },
  {
    id: 'apt4', letter: 'D', priceKey: 'Baráti', photos: 7,
    name: { hu: 'Baráti apartman', en: 'Friends’ Apartment', de: 'Freundes-Apartment' },
    guests: '4', bedrooms: 2,
    floor: 'attic', entrance: 'hall', kitchen: 'shared',
    baby: false, dog: false, cat: false,
    text: {
      hu: 'Tetőtéri apartman két hálószobával, mindkettőben két különálló ággyal – ideális baráti társaságnak. Fürdőkád és zuhany is van, a Panoráma apartmannal egybenyitható.',
      en: 'An attic apartment with two bedrooms, each with two single beds – ideal for a group of friends. Bath and shower, and it opens up to the Panorama Apartment.',
      de: 'Ein Dachgeschoss-Apartment mit zwei Schlafzimmern mit je zwei Einzelbetten – ideal für Freunde. Badewanne und Dusche, verbindbar mit dem Panorama-Apartment.'
    },
    beds: { hu: '4 egyszemélyes ágy (2 + 2)', en: '4 single beds (2 + 2)', de: '4 Einzelbetten (2 + 2)' }
  },
  {
    id: 'apt5', letter: 'E', priceKey: 'Kisház', photos: 5,
    name: { hu: 'Kisház apartman', en: 'Cottage Apartment', de: 'Häuschen-Apartment' },
    guests: '4', bedrooms: 1,
    floor: 'attic', entrance: 'own', kitchen: 'tea',
    baby: false, dog: false, cat: true,
    text: {
      hu: 'Saját bejáratú tetőtéri szállás a különálló kisházban, saját fürdővel és teakonyhával. Egyszerű, barátságos és kedvező árú – fiataloknak, rövid balatoni kiruccanásra.',
      en: 'An attic stay with its own entrance in the separate cottage, with a private bathroom and kitchenette. Simple, friendly and good value – perfect for young travellers and short Balaton breaks.',
      de: 'Ein Dachgeschoss-Quartier mit eigenem Eingang im separaten Häuschen, mit eigenem Bad und Teeküche. Einfach, freundlich und preiswert – ideal für junge Gäste und kurze Balaton-Ausflüge.'
    },
    beds: { hu: '4 egyszemélyes ágy', en: '4 single beds', de: '4 Einzelbetten' }
  }
];
