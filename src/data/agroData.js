// Explain: Static data for navigation, products, and site content.

  export const AGRO_DATA = {
    navPrimary: [
      ['', 'Bosh sahifa'], ['bozor.html', 'Bozor'], ['narxlar.html', 'Narxlar'],
      ['obhavo.html', 'Ob-havo'], ['texnika.html', 'Texnika'], ['agronom.html', 'Agronom'], ['dokon.html', 'Doʻkon']
    ],
    navMore: [
      ['xojalik.html', 'Xoʻjaligim'], ['royxatdan-otish.html', 'Roʻyxatdan oʻtish'], ['ishlar.html', 'Ishlar'], ['yangiliklar.html', 'Yangiliklar'], ['chorvachilik.html', 'Chorvachilik']
    ],
    homeCards: [
      { id: 'bozor', href: 'bozor.html', e: '🛒', t: 'Bozor', d: 'Sabzavot, meva, goʻsht va sut mahsulotlari', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27458.jpg?format=avif' },
      { id: 'narxlar', href: 'narxlar.html', e: '📊', t: 'Narxlar', d: '14 kunlik grafik va bozor solishtirmasi', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2746d.jpg?format=avif' },
      { id: 'obhavo', href: 'obhavo.html', e: '📅', t: 'Ob-havo va kalendar', d: 'Ekish, sugʻorish va hosil oylari', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27477.jpg?format=avif' },
      { id: 'texnika', href: 'texnika.html', e: '🚜', t: 'Texnika ijarasi', d: 'Traktor, kombayn va dron', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274aa.jpg?format=avif' },
      { id: 'agronom', href: 'agronom.html', e: '🌿', t: 'Agronom', d: 'Kasalliklar kutubxonasi va chorasi', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274b2.jpg?format=avif' },
      { id: 'xojalik', href: 'xojalik.html', e: '💰', t: 'Mening xoʻjaligim', d: 'Daromad, xarajat va foyda hisobi', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274b8.jpg?format=avif' },
      { id: 'dokon', href: 'dokon.html', e: '🌱', t: 'Doʻkon', d: 'Urugʻ, oʻgʻit va dori narxlari', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274bf.jpg?format=avif' },
      { id: 'ishlar', href: 'ishlar.html', e: '🧑‍🌾', t: 'Ishlar', d: 'Mavsumiy va doimiy ish eʼlonlari', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274c6.jpg?format=avif' },
      { id: 'yangiliklar', href: 'yangiliklar.html', e: '📰', t: 'Yangiliklar', d: 'Subsidiya, qonun, grant va texnologiya', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274cc.jpg?format=avif' },
      { id: 'chorvachilik', href: 'chorvachilik.html', e: '🐄', t: 'Chorvachilik', d: 'Emlash, veterinar va mol bozori', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274d3.jpg?format=avif' }
    ],
    products: [
      { id: 'pomidor', name: 'Pomidor', cat: 'sabzavot', emoji: '🍅', price: 12000, unit: 'kg', farmer: 'Akmal Karimov', region: 'Toshkent viloyati', trend: 1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274da.jpg?format=avif' },
      { id: 'bodring', name: 'Bodring', cat: 'sabzavot', emoji: '🥒', price: 9000, unit: 'kg', farmer: 'Zilola Yusupova', region: 'Fargʻona viloyati', trend: -1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274e1.jpg?format=avif' },
      { id: 'kartoshka', name: 'Kartoshka', cat: 'sabzavot', emoji: '🥔', price: 6500, unit: 'kg', farmer: 'Sherzod Ismoilov', region: 'Samarqand viloyati', trend: 1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274e9.jpg?format=avif' },
      { id: 'piyoz', name: 'Piyoz', cat: 'sabzavot', emoji: '🧅', price: 5500, unit: 'kg', farmer: 'Nodira Rahimova', region: 'Buxoro viloyati', trend: 0, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274ef.jpg?format=avif' },
      { id: 'sabzi', name: 'Sabzi', cat: 'sabzavot', emoji: '🥕', price: 7000, unit: 'kg', farmer: 'Baxtiyor Ergashev', region: 'Andijon viloyati', trend: -1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274f5.jpg?format=avif' },
      { id: 'karam', name: 'Karam', cat: 'sabzavot', emoji: '🥬', price: 4800, unit: 'kg', farmer: 'Malika Sattorova', region: 'Namangan viloyati', trend: 1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274fc.jpg?format=avif' },
      { id: 'olma', name: 'Olma', cat: 'meva', emoji: '🍎', price: 14000, unit: 'kg', farmer: 'Jasur Tursunov', region: 'Toshkent viloyati', trend: 1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27502.jpg?format=avif' },
      { id: 'uzum', name: 'Uzum', cat: 'meva', emoji: '🍇', price: 17000, unit: 'kg', farmer: 'Dilnoza Nazarova', region: 'Samarqand viloyati', trend: -1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27509.jpg?format=avif' },
      { id: 'nok', name: 'Nok', cat: 'meva', emoji: '🍐', price: 15500, unit: 'kg', farmer: 'Rustam Qodirov', region: 'Fargʻona viloyati', trend: 1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27510.jpg?format=avif' },
      { id: 'orik', name: 'Oʻrik', cat: 'meva', emoji: '🍑', price: 19000, unit: 'kg', farmer: 'Shahnoza Aliyeva', region: 'Andijon viloyati', trend: 0, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27516.jpg?format=avif' },
      { id: 'olcha', name: 'Olcha', cat: 'meva', emoji: '🍒', price: 21000, unit: 'kg', farmer: 'Ulugʻbek Sodiqov', region: 'Namangan viloyati', trend: -1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2751c.jpg?format=avif' },
      { id: 'qovun', name: 'Qovun', cat: 'meva', emoji: '🍈', price: 13000, unit: 'kg', farmer: 'Gulnora Xolmatova', region: 'Buxoro viloyati', trend: 1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27523.jpg?format=avif' },
      { id: 'molgo', name: 'Mol goʻshti', cat: 'gosh', emoji: '🥩', price: 95000, unit: 'kg', farmer: 'Farhod Abdullayev', region: 'Samarqand viloyati', trend: 1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27529.jpg?format=avif' },
      { id: 'qoygo', name: 'Qoʻy goʻshti', cat: 'gosh', emoji: '🍖', price: 110000, unit: 'kg', farmer: 'Kamola Toʻrayeva', region: 'Toshkent viloyati', trend: -1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2752f.jpg?format=avif' },
      { id: 'tovuq', name: 'Tovuq goʻshti', cat: 'gosh', emoji: '🍗', price: 38000, unit: 'kg', farmer: 'Aziz Mirzayev', region: 'Fargʻona viloyati', trend: 0, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27537.jpg?format=avif' },
      { id: 'echkigo', name: 'Echki goʻshti', cat: 'gosh', emoji: '🐐', price: 102000, unit: 'kg', farmer: 'Sobir Jalilov', region: 'Buxoro viloyati', trend: 1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2753d.jpg?format=avif' },
      { id: 'sigirsut', name: 'Sigir suti', cat: 'sut', emoji: '🥛', price: 8000, unit: 'litr', farmer: 'Nasiba Qosimova', region: 'Toshkent viloyati', trend: 1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27544.jpg?format=avif' },
      { id: 'qatiq', name: 'Qatiq', cat: 'sut', emoji: '🍶', price: 11000, unit: 'litr', farmer: 'Oybek Yusupov', region: 'Andijon viloyati', trend: 0, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2755a.jpg?format=avif' },
      { id: 'tvorog', name: 'Tvorog', cat: 'sut', emoji: '🧀', price: 26000, unit: 'kg', farmer: 'Lola Usmonova', region: 'Namangan viloyati', trend: -1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2755f.jpg?format=avif' },
      { id: 'pishloq', name: 'Pishloq', cat: 'sut', emoji: '🧈', price: 58000, unit: 'kg', farmer: 'Davron Sobirov', region: 'Samarqand viloyati', trend: 1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27566.jpg?format=avif' },

      // Urug'lar
      { id: 'urug_bugdoy', name: 'Bugʻdoy urugʻi ("Yaksart")', cat: 'urug', emoji: '🌾', price: 8500, unit: 'kg', farmer: 'Oʻzbekiston Gʻallachilik Instituti', region: 'Samarqand viloyati', trend: 1, img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80' },
      { id: 'urug_paxta', name: 'Paxta urugʻi ("Buxoro-102")', cat: 'urug', emoji: '🌱', price: 14000, unit: 'kg', farmer: 'Paxtachilik Elita Xoʻjaligi', region: 'Buxoro viloyati', trend: 0, img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80' },
      { id: 'urug_makka', name: 'Makkajoʻxori urugʻi (Gibrid don)', cat: 'urug', emoji: '🌽', price: 6200, unit: 'kg', farmer: 'Agro Savdo Markazi', region: 'Toshkent viloyati', trend: 1, img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80' },
      { id: 'urug_sholi', name: 'Sholi urugʻi ("Lazer" & "Alanga")', cat: 'urug', emoji: '🍚', price: 16000, unit: 'kg', farmer: 'Xorazm Sholikorlari', region: 'Xorazm viloyati', trend: -1, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80' },
      { id: 'urug_sabzavot', name: 'Sabzavot urugʻlari toʻplami (Pomidor, Bodring, Sabzi)', cat: 'urug', emoji: '🥕', price: 45000, unit: 'paket', farmer: 'Gollandiya Seleksiyasi Urugʻlari', region: 'Toshkent viloyati', trend: 1, img: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80' },

      // Mineral o'g'itlar
      { id: 'ogit_azot', name: 'Azotli oʻgʻit (Ammiakli selitra N-34%)', cat: 'mineral_ogit', emoji: '🧪', price: 38000, unit: 'qop (25 kg)', farmer: 'Kimyo Agro Sanoat', region: 'Fargʻona viloyati', trend: 1, img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80' },
      { id: 'ogit_fosfor', name: 'Fosforli oʻgʻit (Ammofos P-46%)', cat: 'mineral_ogit', emoji: '⚗️', price: 52000, unit: 'qop (25 kg)', farmer: 'Navoiy Kimyo Zavodi', region: 'Navoiy viloyati', trend: 0, img: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80' },
      { id: 'ogit_kaliy', name: 'Kaliyli oʻgʻit (Kaliy sulfat K-50%)', cat: 'mineral_ogit', emoji: '🧂', price: 65000, unit: 'qop (25 kg)', farmer: 'OʻzKimyo AgroTaʼminot', region: 'Toshkent viloyati', trend: -1, img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80' },

      // Organik o'g'itlar
      { id: 'ogit_gong', name: 'Qoramol goʻngi (toʻliq chirigan)', cat: 'organik_ogit', emoji: '🐂', price: 450000, unit: 'tirkama (mashina)', farmer: 'Chorvador Baraka Farm', region: 'Toshkent viloyati', trend: 0, img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80' },
      { id: 'ogit_kompost', name: 'Biokompost (tabiiy oʻsimlik oʻgʻiti)', cat: 'organik_ogit', emoji: '🍂', price: 18000, unit: 'qop (30 kg)', farmer: 'Ekologik Kompost Markazi', region: 'Samarqand viloyati', trend: 1, img: 'https://images.unsplash.com/photo-1592417817098-8f3d69103a46?auto=format&fit=crop&w=600&q=80' },
      { id: 'ogit_chirindi', name: 'Chirindi (Premium Biogumus)', cat: 'organik_ogit', emoji: '🪱', price: 2500, unit: 'kg', farmer: 'OʻzBiogumus Klasteri', region: 'Andijon viloyati', trend: 1, img: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80' },

      // O'simliklarni himoya qilish vositalari
      { id: 'himoya_insektitsid', name: 'Insektitsid ("Aktara" zararkunandalarga qarshi)', cat: 'himoya', emoji: '🧴', price: 64000, unit: 'dona', farmer: 'Agro Dorixona Markazi', region: 'Toshkent viloyati', trend: 1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275e3.jpg?format=avif' },
      { id: 'himoya_fungitsid', name: 'Fungitsid ("Ridomil Gold" kasalliklarga qarshi)', cat: 'himoya', emoji: '💊', price: 78000, unit: 'dona', farmer: 'Agro Kimyo Taʼminot', region: 'Fargʻona viloyati', trend: 0, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275dd.jpg?format=avif' },
      { id: 'himoya_gerbitsid', name: 'Gerbitsid (Begona oʻtlarga qarshi samarali preparat)', cat: 'himoya', emoji: '🌿', price: 85000, unit: 'litr', farmer: 'Oʻsimliklarni Himoya Qilish MCHJ', region: 'Samarqand viloyati', trend: -1, img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80' },

      // Yoqilg'i mahsulotlari
      { id: 'yoqilgi_dizel', name: 'Dizel yoqilgʻisi (Agro-solyarka Yevro-5)', cat: 'yoqilgi', emoji: '⛽', price: 11800, unit: 'litr', farmer: 'Oʻzbekneftgaz Taʼminot', region: 'Respublika boʻylab', trend: 1, img: 'https://images.unsplash.com/photo-1527018607637-023631810dd2?auto=format&fit=crop&w=600&q=80' },
      { id: 'yoqilgi_benzin', name: 'Benzin (Ai-92 tozalangan)', cat: 'yoqilgi', emoji: '🛢️', price: 10500, unit: 'litr', farmer: 'Agro Yoqilgʻi Baza', region: 'Respublika boʻylab', trend: 0, img: 'https://images.unsplash.com/photo-1610492461174-8b6440db7f9e?auto=format&fit=crop&w=600&q=80' },
      { id: 'yoqilgi_moy', name: 'Motor va gidravlik moylar (Traktorlar uchun)', cat: 'yoqilgi', emoji: '🛢️', price: 32000, unit: 'litr', farmer: 'Texnika Moy Servis', region: 'Toshkent viloyati', trend: 1, img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80' },

      // Sug'orish vositalari
      { id: 'sugorish_tomchi', name: 'Tomchilatib sug‘orish uskunalari (1 ga toʻliq toʻplam)', cat: 'sugorish', emoji: '💧', price: 4800000, unit: 'toʻplam (1 ga)', farmer: 'Smart Irrigation Tech', region: 'Toshkent viloyati', trend: -1, img: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80' },
      { id: 'sugorish_quvur', name: 'Polietilen sug‘orish quvurlari (d-16/32/50mm)', cat: 'sugorish', emoji: '〰️', price: 4200, unit: 'metr', farmer: 'Quvur Plast Zavod', region: 'Samarqand viloyati', trend: 0, img: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80' },
      { id: 'sugorish_nasos', name: 'Suv nasoslari va qumli filtrlash stansiyasi', cat: 'sugorish', emoji: '⚙️', price: 3500000, unit: 'dona', farmer: 'AgroNasos Servis', region: 'Fargʻona viloyati', trend: 1, img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },

      // Qishloq xo'jaligi texnikalari
      { id: 'texnika_traktor', name: 'Traktor MTZ-82 (Yangi komplektatsiyada)', cat: 'texnika_savdo', emoji: '🚜', price: 240000000, unit: 'dona', farmer: 'Toshkent Traktor Zavodi Agromash', region: 'Toshkent viloyati', trend: 0, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2756e.jpg?format=avif' },
      { id: 'texnika_kombayn', name: 'Gʻalla oʻrish kombayni (Claas / Don)', cat: 'texnika_savdo', emoji: '🌾', price: 650000000, unit: 'dona', farmer: 'Agromash Lizing Kompaniyasi', region: 'Samarqand viloyati', trend: 1, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2757a.jpg?format=avif' },
      { id: 'texnika_seyalka', name: 'Seyalka (Paxta va don ekuvchi pnevmatik agregat)', cat: 'texnika_savdo', emoji: '🚜', price: 38000000, unit: 'dona', farmer: 'Chirchiq Qishloq Xoʻjalik Texnikasi', region: 'Toshkent viloyati', trend: -1, img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80' },
      { id: 'texnika_kultivator', name: 'Kultivator va chuqur yumshatgich (Chizel)', cat: 'texnika_savdo', emoji: '⛏️', price: 19000000, unit: 'dona', farmer: 'Fargʻona Agromash Servis', region: 'Fargʻona viloyati', trend: 0, img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80' },

      // O'simliklarni parvarishlash vositalari
      { id: 'parvarish_stimulyator', name: 'O‘sishni boshqaruvchi biostimulyatorlar', cat: 'parvarish', emoji: '🌱', price: 55000, unit: 'litr', farmer: 'BioAgro Texnologiyalar Instituti', region: 'Toshkent viloyati', trend: 1, img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80' },
      { id: 'parvarish_mikro', name: 'Kompleks mikroelementlar (Sink, Bor, Temir, Magniy)', cat: 'parvarish', emoji: '🧪', price: 48000, unit: 'paket (1 kg)', farmer: 'Agro Element Laboratoriyasi', region: 'Samarqand viloyati', trend: 1, img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80' }
    ],
    cats: [
      ['all', 'Barchasi'],
      ['sabzavot', 'Sabzavot'],
      ['meva', 'Meva'],
      ['gosh', 'Goʻsht'],
      ['sut', 'Sut'],
      ['urug', 'Urugʻlar'],
      ['mineral_ogit', 'Mineral oʻgʻitlar'],
      ['organik_ogit', 'Organik oʻgʻitlar'],
      ['himoya', 'Himoya vositalari'],
      ['yoqilgi', 'Yoqilgʻi mahsulotlari'],
      ['sugorish', 'Sugʻorish vositalari'],
      ['texnika_savdo', 'Agrotexnika'],
      ['parvarish', 'Parvarishlash vositalari']
    ],
    catLabel: {
      sabzavot: 'Sabzavot',
      meva: 'Meva',
      gosh: 'Goʻsht',
      sut: 'Sut',
      urug: 'Urugʻlar',
      mineral_ogit: 'Mineral oʻgʻitlar',
      organik_ogit: 'Organik oʻgʻitlar',
      himoya: 'Himoya vositalari',
      yoqilgi: 'Yoqilgʻi mahsulotlari',
      sugorish: 'Sugʻorish vositalari',
      texnika_savdo: 'Agrotexnika',
      parvarish: 'Parvarishlash vositalari'
    },
    trendIcon: { 1: '▲', '-1': '▼', 0: '■' },
    trendClass: { 1: 'trend-up', '-1': 'trend-down', 0: '' },
    markets: ['Chorsu bozori', 'Oloy bozori', 'Qoʻqon bozori', 'Samarqand bozori', 'Fargʻona bozori'],
    months: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
    monthsFull: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'],
    crops: {
      bugdoy: { name: 'Bugʻdoy', plant: [8, 9, 10], water: [2, 3, 4], harvest: [5, 6] },
      paxta: { name: 'Paxta', plant: [3, 4], water: [5, 6, 7], harvest: [8, 9] },
      makkajoxori: { name: 'Makkajoʻxori', plant: [3, 4], water: [5, 6], harvest: [7, 8] },
      sabzavot: { name: 'Sabzavot', plant: [2, 3, 4], water: [5, 6, 7], harvest: [6, 7, 8, 9] },
      meva: { name: 'Meva', plant: [2, 3], water: [4, 5, 6], harvest: [7, 8, 9] }
    },
    regions: {
      toshkent: { name: 'Toshkent viloyati', warn: 'Mart oyida sovuq tushishi mumkin — koʻchatlarni yopiq saqlang va tunni issiq qiling.', risk: 'Sovuq xavfi' },
      samarqand: { name: 'Samarqand viloyati', warn: 'Iyul–avgustda qurgʻoqchilik ehtimoli yuqori — sugʻorishni oldindan rejalashtiring.', risk: 'Qurgʻoqchilik xavfi' },
      fargona: { name: 'Fargʻona viloyati', warn: 'Bahorda kuchli yomgʻir va sel xavfi mavjud — drenajni tekshiring.', risk: 'Sel xavfi' },
      buxoro: { name: 'Buxoro viloyati', warn: 'Yozda havo 42°C dan oshadi — ekinlarni erta tongda sugʻoring.', risk: 'Issiqlik xavfi' },
      andijon: { name: 'Andijon viloyati', warn: 'Kuzda erta sovuq tushadi — hosilni vaqtida yigʻib oling.', risk: 'Erta sovuq' },
      namangan: { name: 'Namangan viloyati', warn: 'Aprelda doʻl (muz) xavfi mavjud — ekinlarni himoyalang.', risk: 'Doʻl xavfi' }
    },
    equip: [
      { name: 'MTZ-82 Traktor', type: 'traktor', emoji: '🚜', price: 450000, owner: 'Bekzod Toshev', region: 'Toshkent viloyati', phone: '+998 90 123 45 67', note: 'Plug va kultivator bilan', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2756e.jpg?format=avif' },
      { name: 'John Deere 6M', type: 'traktor', emoji: '🚜', price: 780000, owner: 'Sanjar Yoʻldoshev', region: 'Samarqand viloyati', phone: '+998 91 234 56 78', note: 'Yangi, GPS bilan', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27573.jpg?format=avif' },
      { name: 'Claas Tucano Kombayn', type: 'kombayn', emoji: '🌾', price: 3200000, owner: 'Nodir Karimov', region: 'Fargʻona viloyati', phone: '+998 93 345 67 89', note: 'Don va bugʻdoy uchun', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2757a.jpg?format=avif' },
      { name: 'Don-1500 Kombayn', type: 'kombayn', emoji: '🚜', price: 2400000, owner: 'Alisher Nazarov', region: 'Buxoro viloyati', phone: '+998 94 456 78 90', note: 'Ehtiyot qismlari bor', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27581.jpg?format=avif' },
      { name: 'Agras T40 Dron', type: 'dron', emoji: '🛸', price: 600000, owner: 'Kamron Ergashev', region: 'Toshkent viloyati', phone: '+998 97 567 89 01', note: 'Dori sepish uchun', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27587.jpg?format=avif' },
      { name: 'DJI Agras T20 Dron', type: 'dron', emoji: '🛸', price: 420000, owner: 'Diyor Sobirov', region: 'Andijon viloyati', phone: '+998 99 678 90 12', note: 'Kichik maydonlar uchun', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2758f.jpg?format=avif' }
    ],
    eqTypes: [['all', 'Barchasi'], ['traktor', 'Traktor'], ['kombayn', 'Kombayn'], ['dron', 'Dron']],
    eqLabel: { traktor: 'Traktor', kombayn: 'Kombayn', dron: 'Dron' },
    diseases: [
      { name: 'Pomidor fitoftorasi', crop: 'Pomidor', emoji: '🍅', sym: 'Barglarda jigarrang-qora dogʻlar, mevalarda yumshoq chirish, oq gʻubor.', cure: 'Fungitsid sepish, zararlangan barg va mevalarni olib tashlash, namlikni kamaytirish, havo aylanishini yaxshilash.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27595.jpg?format=avif' },
      { name: 'Bugʻdoy zangi (sariq)', crop: 'Bugʻdoy', emoji: '🌾', sym: 'Barglarda sariq-toʻq sariq zang dogʻlari, barg quriydi.', cure: 'Zangʻga chidamli nav ekish, fungitsid bilan ishlov, azotni meʼyorida berish.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2759b.jpg?format=avif' },
      { name: 'Olma parshasi', crop: 'Olma', emoji: '🍎', sym: 'Barg va mevalarda qora jigarrang dogʻlar, meva yorilib ketadi.', cure: 'Kuzgi barg tozalash, mis kuporosi bilan ishlov, zararlangan shoxlarni kesish.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275a2.jpg?format=avif' },
      { name: 'Kolorado qoʻngʻizi', crop: 'Kartoshka', emoji: '🥔', sym: 'Barglarni yeb qoʻyadi, tuxumlar barg ostida.', cure: 'Insektitsid sepish, qoʻlda yigʻish, almashlab ekish qoʻllash.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275a9.jpg?format=avif' },
      { name: 'Un shudringi', crop: 'Bodring', emoji: '🥒', sym: 'Barglarda oq un kabi qatlam, barg quriydi.', cure: 'Havo aylanishini yaxshilash, oltingugurtli preparatlar, ortiqcha namlikni yoʻqotish.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275af.jpg?format=avif' },
      { name: 'Uzum mildiu', crop: 'Uzum', emoji: '🍇', sym: 'Barglarda sariq moy dogʻlari, orqa tomonida oq gʻubor.', cure: 'Misli fungitsid, barglarni siyraklashtirish, yomgʻirdan himoya.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275b5.jpg?format=avif' },
      { name: 'Makka poʻstloq chirishi', crop: 'Makkajoʻxori', emoji: '🌽', sym: 'Poyada jigarrang chirish, oʻsimlik yotib qoladi.', cure: 'Almashlab ekish, zararlangan poyalarni yoʻq qilish, tuproqni quritish.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275bc.jpg?format=avif' }
    ],
    shop: [
      { name: 'Bugʻdoy urugʻi "Yaksart"', cat: 'urug', emoji: '🌱', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275c4.jpg?format=avif', offers: [{ store: 'Agro Savdo', price: 8500, rating: 4.6 }, { store: 'Urugʻ Markazi', price: 9200, rating: 4.8 }, { store: 'Fermer Doʻkon', price: 7900, rating: 4.2 }] },
      { name: 'Makkajoʻxori urugʻi', cat: 'urug', emoji: '🌽', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275c9.jpg?format=avif', offers: [{ store: 'Agro Savdo', price: 6200, rating: 4.5 }, { store: 'Urugʻ Markazi', price: 5800, rating: 4.7 }] },
      { name: 'Azotli oʻgʻit (selitra)', cat: 'ogit', emoji: '🧪', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275d0.jpg?format=avif', offers: [{ store: 'Kimyo Agro', price: 42000, rating: 4.4 }, { store: 'Fermer Doʻkon', price: 39500, rating: 4.1 }, { store: 'Agro Savdo', price: 45000, rating: 4.6 }] },
      { name: 'Fosforli oʻgʻit', cat: 'ogit', emoji: '⚗️', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275d7.jpg?format=avif', offers: [{ store: 'Kimyo Agro', price: 51000, rating: 4.3 }, { store: 'Agro Savdo', price: 48000, rating: 4.5 }] },
      { name: 'Fungitsid "Ridomil"', cat: 'dori', emoji: '💊', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275dd.jpg?format=avif', offers: [{ store: 'Agro Dorixona', price: 78000, rating: 4.7 }, { store: 'Kimyo Agro', price: 82500, rating: 4.4 }] },
      { name: 'Insektitsid "Aktara"', cat: 'dori', emoji: '🧴', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275e3.jpg?format=avif', offers: [{ store: 'Agro Dorixona', price: 64000, rating: 4.8 }, { store: 'Fermer Doʻkon', price: 60000, rating: 4.3 }, { store: 'Kimyo Agro', price: 67500, rating: 4.5 }] }
    ],
    shopCat: { urug: 'Urugʻ', ogit: 'Oʻgʻit', dori: 'Dori' },
    jobs: [
      { title: 'Mavsumiy bugʻdoy yigʻim ishchisi', type: 'mavsumiy', company: 'Fargʻona Agro', region: 'Fargʻona viloyati', pay: '150 000 soʻm / kun', desc: 'Kombayn yonida yordamchi ish. Tajriba shart emas, 3 mahal ovqat beriladi.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275ea.jpg?format=avif' },
      { title: 'Issiqxonada sabzavot teruvchi', type: 'mavsumiy', company: 'Toshkent Green', region: 'Toshkent viloyati', pay: '120 000 soʻm / kun', desc: 'Pomidor va bodring terish. Ayollar uchun mos, transport taʼminlanadi.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275f1.jpg?format=avif' },
      { title: 'Agronom (doimiy)', type: 'doimiy', company: 'Samarqand Dehqon', region: 'Samarqand viloyati', pay: '6 000 000 soʻm / oy', desc: 'Bogʻdorchilik va dala ekinlari boʻyicha maslahat. 3 yillik tajriba talab.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27602.jpg?format=avif' },
      { title: 'Traktor haydovchisi', type: 'doimiy', company: 'Buxoro Yer', region: 'Buxoro viloyati', pay: '5 000 000 soʻm / oy', desc: 'MTZ va John Deere texnikalarida ishlash. Toifali haydovchilik guvohnomasi kerak.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27608.jpg?format=avif' },
      { title: 'Chorva parvarishlovchi', type: 'doimiy', company: 'Andijon Chorva', region: 'Andijon viloyati', pay: '4 500 000 soʻm / oy', desc: 'Sigir va qoʻylarni parvarish qilish. Yotoqxona taqdim etiladi.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2760e.jpg?format=avif' },
      { title: 'Dron operatori yordamchisi', type: 'mavsumiy', company: 'Agro Texnika Servis', region: 'Toshkent viloyati', pay: '200 000 soʻm / kun', desc: 'Dori sepish ishlarida operatorga yordam. Texnikani oʻrgatamiz.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27614.jpg?format=avif' }
    ],
    jobTypes: [['all', 'Barchasi'], ['mavsumiy', 'Mavsumiy'], ['doimiy', 'Doimiy']],
    news: [
      { cat: 'Subsidiya', emoji: '💰', title: 'Sugʻorish uchun subsidiya', date: '2026-02-10', text: 'Tomchilatib sugʻorish tizimlarini oʻrnatgan fermerlarga xarajatning 40% qaytariladi.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2761a.jpg?format=avif' },
      { cat: 'Qonun', emoji: '⚖️', title: 'Yer ijarasi boʻyicha yangi qonun', date: '2026-01-28', text: 'Qishloq xoʻjaligi yerlarini uzoq muddatli ijaraga berish tartibi soddalashtirildi.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27621.jpg?format=avif' },
      { cat: 'Grant', emoji: '🎁', title: 'Yosh fermerlar uchun grant', date: '2026-02-05', text: '35 yoshgacha boʻlgan fermerlarga 200 million soʻmgacha grant ajratiladi.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27627.jpg?format=avif' },
      { cat: 'Texnologiya', emoji: '🛸', title: 'Dron bilan dori sepish kengaymoqda', date: '2026-02-12', text: 'Dronlar anʼanaviy usulga qaraganda 30% kam suv va dori sarflaydi.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2762d.jpg?format=avif' },
      { cat: 'Subsidiya', emoji: '🚜', title: 'Texnika xaridiga imtiyozli kredit', date: '2026-01-20', text: 'Traktor va kombayn xarid qilish uchun yillik 10% stavkada imtiyozli kredit.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27632.jpg?format=avif' },
      { cat: 'Texnologiya', emoji: '📱', title: 'Agro Tarmoq mobil xizmatlari', date: '2026-02-14', text: 'Fermerlar endi bozor narxlarini va ob-havoni onlayn kuzatishi mumkin.', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27638.jpg?format=avif' }
    ],
    newsTypes: [['all', 'Barchasi'], ['Subsidiya', 'Subsidiya'], ['Qonun', 'Qonun'], ['Grant', 'Grant'], ['Texnologiya', 'Texnologiya']],
    vaccines: {
      sigir: [
        { v: 'Oqsil kasalligi (FMD)', age: '2 oy', per: 'Har 6 oyda' },
        { v: 'Qorason (Anthrax)', age: '3 oy', per: 'Yiliga 1 marta' },
        { v: 'Brusellyoz', age: '4 oy', per: 'Yiliga 1 marta' },
        { v: 'Nodulyar dermatit', age: '6 oy', per: 'Yiliga 1 marta' }
      ],
      qoy: [
        { v: 'Oqsil kasalligi (FMD)', age: '2 oy', per: 'Har 6 oyda' },
        { v: 'Qorason (Anthrax)', age: '3 oy', per: 'Yiliga 1 marta' },
        { v: 'Ospa', age: '2 oy', per: 'Yiliga 1 marta' }
      ],
      tovuq: [
        { v: 'Nyukasl kasalligi', age: '1 kun', per: 'Har 3 oyda' },
        { v: 'Gumboro', age: '10 kun', per: 'Bir marta' },
        { v: 'Bronxit', age: '7 kun', per: 'Har 2 oyda' }
      ],
      ot: [
        { v: 'Gripp', age: '6 oy', per: 'Yiliga 1 marta' },
        { v: 'Qorason (Anthrax)', age: '4 oy', per: 'Yiliga 1 marta' }
      ]
    },
    animals: [['sigir', '🐄 Sigir'], ['qoy', '🐑 Qoʻy'], ['tovuq', '🐔 Tovuq'], ['ot', '🐴 Ot']],
    livestockMarket: {
      sigir: [{ n: 'Sigir (sutdor)', price: '12–18 mln soʻm' }, { n: 'Buqa (goʻsht uchun)', price: '15–22 mln soʻm' }, { n: 'Buzoq', price: '4–7 mln soʻm' }],
      qoy: [{ n: 'Qoʻy (urgʻochi)', price: '1.8–3 mln soʻm' }, { n: 'Qoʻchqor', price: '2.5–4 mln soʻm' }, { n: 'Qoʻzi', price: '0.8–1.5 mln soʻm' }],
      tovuq: [{ n: 'Broyler tovuq', price: '45–70 ming soʻm' }, { n: 'Tuxum beruvchi tovuq', price: '60–90 ming soʻm' }],
      ot: [{ n: 'Ot (ish uchun)', price: '18–30 mln soʻm' }, { n: 'Toychoq', price: '9–14 mln soʻm' }]
    },
    vets: [
      { name: 'Dr. Anvar Yoʻldoshev', spec: 'Yirik shoxli hayvonlar', region: 'Toshkent viloyati', phone: '+998 90 111 22 33', rating: 4.8, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2763f.jpg?format=avif' },
      { name: 'Dr. Nilufar Karimova', spec: 'Parranda kasalliklari', region: 'Fargʻona viloyati', phone: '+998 91 222 33 44', rating: 4.7, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27644.jpg?format=avif' },
      { name: 'Dr. Sobirjon Tojiyev', spec: 'Qoʻy va echki', region: 'Samarqand viloyati', phone: '+998 93 333 44 55', rating: 4.6, img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2764a.jpg?format=avif' }
    ]
  };

