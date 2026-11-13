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
      // === SABZAVOTLAR ===
      { 
        id: 'pomidor', name: 'Pomidor (Qizil, serhosil nav)', cat: 'sabzavot', emoji: '🍅', price: 12000, unit: 'kg', 
        farmer: 'Akmal Karimov', region: 'Toshkent viloyati', trend: 1, rating: 4.9, reviewsCount: 142,
        desc: 'Issiqxonada tabiiy quyosh nurida yetishtirilgan, suvli va xushboʻy qizil pomidor. Hech qanday kimyoviy tezlatkichlarsiz yetiltirilgan.',
        specs: ['Navi: Volgogradskiy elita', 'Yetishtirish: Issiqxona / Organik', 'Saqlash muddati: 10-14 kun (8-12°C)', 'Yetkazish: 24 soat ichida'],
        img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'bodring', name: 'Bodring (Navroʻz navi, mayda)', cat: 'sabzavot', emoji: '🥒', price: 9000, unit: 'kg', 
        farmer: 'Zilola Yusupova', region: 'Fargʻona viloyati', trend: -1, rating: 4.8, reviewsCount: 98,
        desc: 'Qisir-qisir, mayda tikanli, shirin va yangi uzilgan bodringlar. Salatlar va tuzlash uchun ideal tanlov.',
        specs: ['Navi: Navroʻz F1', 'Uzunligi: 9-12 sm', 'Terim vaqti: Bugun ertalab', 'Yetkazish: Sovutilgan furgonda'],
        img: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'kartoshka', name: 'Kartoshka (Qizil, qumloq yer hosili)', cat: 'sabzavot', emoji: '🥔', price: 6500, unit: 'kg', 
        farmer: 'Sherzod Ismoilov', region: 'Samarqand viloyati', trend: 1, rating: 4.7, reviewsCount: 230,
        desc: 'Samarqand togʻ etaklarida yetishtirilgan toʻyimli, toshsiz va qurt tushmagan saralangan kartoshka.',
        specs: ['Navi: Gala / Santa', 'Oʻlchami: 50-70 mm (Katta)', 'Kraxmalliligi: 16%', 'Foydalanish: Qovurish va pishirishga'],
        img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'piyoz', name: 'Piyoz (Zarafshon sariq piyozi)', cat: 'sabzavot', emoji: '🧅', price: 5500, unit: 'kg', 
        farmer: 'Nodira Rahimova', region: 'Buxoro viloyati', trend: 0, rating: 4.9, reviewsCount: 115,
        desc: 'Uzoq muddat chirimay saqlanadigan, quruq poʻstloqli, achchiq-shirin Buxoro saralangan piyozi.',
        specs: ['Navi: Zarafshon sariq', 'Kalibri: 60-80 mm', 'Quruq moddasi: 14%', 'Qadoqlanishi: 25 kg toʻr qop'],
        img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'sabzi', name: 'Sabzi (Sariq va qizil mirzoyi)', cat: 'sabzavot', emoji: '🥕', price: 7000, unit: 'kg', 
        farmer: 'Baxtiyor Ergashev', region: 'Andijon viloyati', trend: -1, rating: 4.8, reviewsCount: 88,
        desc: 'Osh va pishiriqlar uchun ajoyib, shirali, toza yuvilgan va saralangan Andijon sabzisi.',
        specs: ['Navi: Mirzoyi sariq / Mushak', 'Yuvilgan: Ha, toza saralangan', 'Yetkazish: Toʻr qoplarda', 'Shakar darajasi: Yuqori'],
        img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'karam', name: 'Karam (Yashil, qattiq boshli)', cat: 'sabzavot', emoji: '🥬', price: 4800, unit: 'kg', 
        farmer: 'Malika Sattorova', region: 'Namangan viloyati', trend: 1, rating: 4.6, reviewsCount: 64,
        desc: 'Vitamini koʻp, barglari zich oʻralgan, barra va suvli oq-yashil karam.',
        specs: ['Ogʻirligi: 2-3.5 kg/dona', 'Navi: Slava / Kolobok', 'Saqlanishi: 30 kungacha', 'Salatlar va dimlashga mos'],
        img: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=600&q=80' 
      },

      // === MEVALAR ===
      { 
        id: 'olma', name: 'Olma (Beshyulduz / Golden)', cat: 'meva', emoji: '🍎', price: 14000, unit: 'kg', 
        farmer: 'Jasur Tursunov', region: 'Toshkent viloyati', trend: 1, rating: 5.0, reviewsCount: 312,
        desc: 'Boʻstonliq togʻ yonbagʻirlaridagi bogʻlardan terilgan qip-qizil, shirali va xushboʻy tabiiy olma.',
        specs: ['Navi: Red Delicious / Golden', 'Hosil: 2026 yangi terim', 'Kaliy va vitamin C ga boy', 'Quti: 10 kg standart yashik'],
        img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'uzum', name: 'Uzum (Qora kishmish & Husayni)', cat: 'meva', emoji: '🍇', price: 17000, unit: 'kg', 
        farmer: 'Dilnoza Nazarova', region: 'Samarqand viloyati', trend: -1, rating: 4.9, reviewsCount: 205,
        desc: 'Urugʻsiz mayin qora kishmish va uzunchoq Husayni (Kelinbarmoq) uzumlari. Shirinlik darajasi 24% brix.',
        specs: ['Navi: Qora kishmish / Husayni', 'Shirinlik: 24 BRIX', 'Dona kattaligi: Yirik', 'Qadoq: Maxsus meva yashigi'],
        img: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'nok', name: 'Nok (Lesnaya krasavitsa)', cat: 'meva', emoji: '🍐', price: 15500, unit: 'kg', 
        farmer: 'Rustam Qodirov', region: 'Fargʻona viloyati', trend: 1, rating: 4.7, reviewsCount: 76,
        desc: 'Ogʻizda eriydigan, asaldek totli, yupqa poʻstloqli Fargʻona noki.',
        specs: ['Navi: Oʻrmon goʻzali', 'Hidi: Xushboʻy muskat', 'Qadoqlanishi: 8 kg yashik', '100% tabiiy oʻgʻitlangan'],
        img: 'https://images.unsplash.com/photo-1615484477778-ca3b783256fd?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'orik', name: 'Oʻrik (Yubiley & Qandak)', cat: 'meva', emoji: '🍑', price: 19000, unit: 'kg', 
        farmer: 'Shahnoza Aliyeva', region: 'Andijon viloyati', trend: 0, rating: 4.8, reviewsCount: 110,
        desc: 'Quyosh taftida pishgan, qand miqdori yuqori, danagi oson ajraladigan Andijon oʻrigi.',
        specs: ['Navi: Qandak shirin', 'Terilgan vaqti: Yangi terim', 'Yumshoqligi: Oʻrtacha qattiq', 'Eksportbop saralangan'],
        img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'olcha', name: 'Olcha va Gilos (Qora gilos)', cat: 'meva', emoji: '🍒', price: 21000, unit: 'kg', 
        farmer: 'Ulugʻbek Sodiqov', region: 'Namangan viloyati', trend: -1, rating: 4.9, reviewsCount: 154,
        desc: 'Namangan adirlaridan saralangan, qora qizil, yirik donali shirin gilos va nordon olcha.',
        specs: ['Kalibri: 28-32 mm', 'Rang: Toʻq qizil / Ruby', 'Saqlanishi: Maxsus sovutgichda', 'Bandlari bilan terilgan'],
        img: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'qovun', name: 'Qovun (Mirzachoʻl / Obi novvot)', cat: 'meva', emoji: '🍈', price: 13000, unit: 'kg', 
        farmer: 'Gulnora Xolmatova', region: 'Buxoro viloyati', trend: 1, rating: 5.0, reviewsCount: 180,
        desc: 'Mashhur Mirzachoʻl va Buxoro obi-novvoti. Asal isi keluvchi, tishi mayin qovun.',
        specs: ['Navi: Obi Novvot', 'Ogʻirligi: 4-7 kg', 'Shirinlik: Asal taʼmida', 'Ekilgan joy: Dasht unumdor yer'],
        img: 'https://images.unsplash.com/photo-1571575173927-aa3f8f4eed76?auto=format&fit=crop&w=600&q=80' 
      },

      // === GOʻSHT ===
      { 
        id: 'molgo', name: 'Mol goʻshti (Yumshoq lahm va suyakli)', cat: 'gosh', emoji: '🥩', price: 95000, unit: 'kg', 
        farmer: 'Farhod Abdullayev', region: 'Samarqand viloyati', trend: 1, rating: 4.9, reviewsCount: 340,
        desc: 'Halol soʻyilgan, togʻ yaylovlarida boqilgan yosh buqa goʻshti. Toza, yogʻsiz lahm qismi.',
        specs: ['Sertifikat: 100% Halol & Vet nazorati', 'Yoshi: 1.5 yoshli buqa', 'Saqlanishi: 0-4°C haroratda', 'Yetkazish: Termoboksda'],
        img: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'qoygo', name: 'Qoʻy goʻshti (Hisori qoʻy qovurgʻa)', cat: 'gosh', emoji: '🍖', price: 110000, unit: 'kg', 
        farmer: 'Kamola Toʻrayeva', region: 'Toshkent viloyati', trend: -1, rating: 5.0, reviewsCount: 220,
        desc: 'Oʻt-oʻlan bilan yaylovda boqilgan Hisor zotli barra qoʻzi goʻshti. Qovurgʻa va lahm qismlari.',
        specs: ['Zoti: Hisori barra', 'Soʻyish vaqti: Har kuni tongda', 'Sertifikat: Veterinariya maʼlumotnomasi 4-forma', 'Yetkazish: Sovutilgan holda'],
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'tovuq', name: 'Tovuq goʻshti (Broyler uy tovuqlari)', cat: 'gosh', emoji: '🍗', price: 38000, unit: 'kg', 
        farmer: 'Aziz Mirzayev', region: 'Fargʻona viloyati', trend: 0, rating: 4.7, reviewsCount: 165,
        desc: 'Tabiiy donga boqilgan, gormonlarsiz yetishtirilgan parranda goʻshti. Butun va boʻlingan tovuq.',
        specs: ['Boqilishi: Tabiiy gʻalla va koʻkat', 'Ogʻirligi: 1.4 - 2.0 kg', 'Halol kafolat: Mavjud', 'Muzlatilmagan (Barra)'],
        img: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'echkigo', name: 'Echki goʻshti (Parhezbop yosh echki)', cat: 'gosh', emoji: '🐐', price: 102000, unit: 'kg', 
        farmer: 'Sobir Jalilov', region: 'Buxoro viloyati', trend: 1, rating: 4.8, reviewsCount: 52,
        desc: 'Xolesterini kam, oshqozon-ichak uchun juda foydali boʻlgan parhezbop togʻ echkisi goʻshti.',
        specs: ['Turi: Yosh togʻ echkisi', 'Xolesterin: Minimal', 'Shifobaxsh: Parhezbop', 'Veterinariya nazoratidan oʻtgan'],
        img: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80' 
      },

      // === SUT MAHSULOTLARI ===
      { 
        id: 'sigirsut', name: 'Sigir suti (Tabiiy yogʻli sut, 4.2%)', cat: 'sut', emoji: '🥛', price: 8000, unit: 'litr', 
        farmer: 'Nasiba Qosimova', region: 'Toshkent viloyati', trend: 1, rating: 5.0, reviewsCount: 410,
        desc: 'Har tong yangi sogʻilgan, qovogʻi olinmagan qaymoqli sof qishloq sigir suti.',
        specs: ['Yogʻliligi: 4.0 - 4.5%', 'Pasterizatsiya: Xom / Qaynatilmagan', 'Tozaligi: Maxsus filtrdan oʻtgan', 'Idish: Steril shisha/baklajka'],
        img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'qatiq', name: 'Qatiq (Chala quyuq qishloq qatigʻi)', cat: 'sut', emoji: '🍶', price: 11000, unit: 'litr', 
        farmer: 'Oybek Yusupov', region: 'Andijon viloyati', trend: 0, rating: 4.9, reviewsCount: 195,
        desc: 'Tabiiy achitqi asosida tayyorlangan quyuq, qaymoqli va xushxoʻr qishloq qatigʻi.',
        specs: ['Achitqisi: Uy usulida tabiiy', 'Foydali bakteriyalar: Jonli probiotik', 'Saqlanishi: 5-7 kun (2-6°C)', 'Tarkibi: 100% tabiiy sut'],
        img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'tvorog', name: 'Tvorog (Yumshoq uy tvorogi, 9%)', cat: 'sut', emoji: '🧀', price: 26000, unit: 'kg', 
        farmer: 'Lola Usmonova', region: 'Namangan viloyati', trend: -1, rating: 4.8, reviewsCount: 142,
        desc: 'Qalampir va shakarsiz, toza sutdan ivitib olingan mayin va toʻyimli uy tvorogi.',
        specs: ['Yogʻlilik: 9%', 'Oqsillar: 18g / 100g', 'Hech qanday konservantsiz', 'Qadoq: 1 kg vakuum idish'],
        img: 'https://images.unsplash.com/photo-1567117632960-5942cb071537?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'pishloq', name: 'Pishloq (Gollandcha va Suluguni)', cat: 'sut', emoji: '🧈', price: 58000, unit: 'kg', 
        farmer: 'Davron Sobirov', region: 'Samarqand viloyati', trend: 1, rating: 4.9, reviewsCount: 88,
        desc: 'Samarqand sut zavodi va fermerlarining choʻziluvchan, tabiiy pishloqlari.',
        specs: ['Turi: Yarim qattiq / Suluguni', 'Pishish muddati: 45 kun', 'Kalsiy miqdori: Yuqori', 'Pizza va somsa uchun ajoyib'],
        img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80' 
      },

      // === URUGʻLAR ===
      { 
        id: 'urug_bugdoy', name: 'Bugʻdoy urugʻi ("Yaksart" elit nav)', cat: 'urug', emoji: '🌾', price: 8500, unit: 'kg', 
        farmer: 'Oʻzbekiston Gʻallachilik Instituti', region: 'Samarqand viloyati', trend: 1, rating: 4.9, reviewsCount: 310,
        desc: 'Qurgʻoqchilikka va sovuqqa chidamli, unib chiqish koeffitsiyenti 98% boʻlgan sertifikatlangan bugʻdoy urugʻi.',
        specs: ['Kategoriya: Super Elita', 'Unuvchanligi: 98%', 'Gektariga meʼyor: 200-220 kg', 'Hosil: 65-75 sentner/ga'],
        img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'urug_paxta', name: 'Paxta urugʻi ("Buxoro-102" tukli & tuksiz)', cat: 'urug', emoji: '🌱', price: 14000, unit: 'kg', 
        farmer: 'Paxtachilik Elita Xoʻjaligi', region: 'Buxoro viloyati', trend: 0, rating: 4.8, reviewsCount: 175,
        desc: 'Vilt kasalligiga bardoshli, tolasi uzun va pishiq boʻlgan elita seleksiya paxta chigit urugʻi.',
        specs: ['Navi: Buxoro-102 / S-6524', 'Tolaning chiqishi: 39-40%', 'Dorilangan: Fungitsid bilan himoyalangan', 'Qadoq: 25 kg qop'],
        img: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'urug_makka', name: 'Makkajoʻxori urugʻi (Gibrid donli Pioneer)', cat: 'urug', emoji: '🌽', price: 6200, unit: 'kg', 
        farmer: 'Agro Savdo Markazi', region: 'Toshkent viloyati', trend: 1, rating: 4.8, reviewsCount: 92,
        desc: 'Silos va don uchun intensiv hosil beruvchi F1 gibrid makkajoʻxori urugʻlik donasi.',
        specs: ['FAO: 380-420', 'Unish quvvati: 96%', 'Don unumdorligi: 120-140 s/ga', 'Ildiz tizimi: Kuchli baquvvat'],
        img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'urug_sholi', name: 'Sholi urugʻi ("Lazer" & "Alanga")', cat: 'urug', emoji: '🍚', price: 16000, unit: 'kg', 
        farmer: 'Xorazm Sholikorlari', region: 'Xorazm viloyati', trend: -1, rating: 4.9, reviewsCount: 204,
        desc: 'Oshbop, uzun donli, pishganda ezilmaydigan mashhur Xorazm Lazer sholisining saralangan urugʻi.',
        specs: ['Navi: Lazer / Alanga', 'Tozaligi: 99.2%', 'Vegetatsiya davri: 125 kun', 'Osh unumi: 68% sof guruch'],
        img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'urug_sabzavot', name: 'Sabzavot urugʻlari toʻplami (Gollandiya)', cat: 'urug', emoji: '🥕', price: 45000, unit: 'paket', 
        farmer: 'Gollandiya Seleksiyasi Urugʻlari', region: 'Toshkent viloyati', trend: 1, rating: 5.0, reviewsCount: 380,
        desc: 'Pomidor, bodring, sabzi, shivit, kashnich va bulgʻor qalampirining 100% unuvchi Niderlandiya gibridlari.',
        specs: ['Tarkibi: 6 xil sabzavot toʻplami', 'Ishlab chiqaruvchi: Rijk Zwaan / Enza Zaden', 'Sertifikat: Xalqaro ISTA', 'Muddati: 2028-yilgacha'],
        img: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80' 
      },

      // === MINERAL OʻGʻITLAR ===
      { 
        id: 'ogit_azot', name: 'Azotli oʻgʻit (Ammiakli selitra N-34%)', cat: 'mineral_ogit', emoji: '🧪', price: 38000, unit: 'qop (25 kg)', 
        farmer: 'Kimyo Agro Sanoat', region: 'Fargʻona viloyati', trend: 1, rating: 4.9, reviewsCount: 512,
        desc: 'Oʻsimliklarning tez va baquvvat oʻsishi uchun asosiy azot manbai boʻlgan oq donador selitra.',
        specs: ['Azot miqdori (N): 34.4%', 'Granula oʻlchami: 1-4 mm', 'Eruvchanligi: Suvda 100% tez eriydi', 'Ishlab chiqaruvchi: FargʻonaAzot AJ'],
        img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'ogit_fosfor', name: 'Fosforli oʻgʻit (Ammofos P-46%, N-11%)', cat: 'mineral_ogit', emoji: '⚗️', price: 52000, unit: 'qop (25 kg)', 
        farmer: 'Navoiy Kimyo Zavodi', region: 'Navoiy viloyati', trend: 0, rating: 4.8, reviewsCount: 290,
        desc: 'Ildiz tizimini mustahkamlaydigan, gullash va hosil tugishni jadallashtiradigan murakkab ammofos oʻgʻiti.',
        specs: ['Fosfor (P2O5): 46%', 'Azot (N): 11%', 'Ildiz oziqlantirish: Ekish oldidan', 'Qadoq: 25 kg namlikdan himoyalangan qop'],
        img: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'ogit_kaliy', name: 'Kaliyli oʻgʻit (Kaliy sulfat K-50%)', cat: 'mineral_ogit', emoji: '🧂', price: 65000, unit: 'qop (25 kg)', 
        farmer: 'OʻzKimyo AgroTaʼminot', region: 'Toshkent viloyati', trend: -1, rating: 4.7, reviewsCount: 140,
        desc: 'Meva va sabzavotlarning shirinligini oshiruvchi, sovuq va qurgʻoqchilikka chidamliligini taʼminlovchi xlorsiz kaliy.',
        specs: ['Kaliy (K2O): 50%', 'Xlorsiz: Tomchilatib sugʻorishga mos', 'Oʻsimlik immunitetini oshiradi', 'Qadoq: 25 kg'],
        img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80' 
      },

      // === ORGANIK OʻGʻITLAR ===
      { 
        id: 'ogit_gong', name: 'Qoramol goʻngi (Toʻliq chirigan gumus)', cat: 'organik_ogit', emoji: '🐂', price: 450000, unit: 'tirkama (mashina)', 
        farmer: 'Chorvador Baraka Farm', region: 'Toshkent viloyati', trend: 0, rating: 4.8, reviewsCount: 85,
        desc: '2 yil davomida chirigan, begona oʻt urugʻlaridan xoli, qora tuproq hosil qiluvchi tabiiy makkajoʻxori/bedadan hosil boʻlgan goʻng.',
        specs: ['Holati: 2 yillik toʻliq chirindi', 'Begona oʻt: Yoʻq (fermentatsiyalangan)', 'Hajmi: 4 tonna (ZIL tirkama)', 'Tuproq unumdorligini 3 barobar oshiradi'],
        img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'ogit_kompost', name: 'Biokompost (Tabiiy oʻsimlik oʻgʻiti)', cat: 'organik_ogit', emoji: '🍂', price: 18000, unit: 'qop (30 kg)', 
        farmer: 'Ekologik Kompost Markazi', region: 'Samarqand viloyati', trend: 1, rating: 4.9, reviewsCount: 160,
        desc: 'Oʻsimlik qoldiqlari va biomassa fermentatsiyasidan olingan toza, yumshoq organik oziqa.',
        specs: ['Organika: 65% dan ortiq', 'Namlik: 35-40%', 'Tuproq qatlami uchun mikrobiologik oziqa', 'Qadoq: 30 kg havo oʻtkazuvchi qop'],
        img: 'https://images.unsplash.com/photo-1592417817098-8f3d69103a46?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'ogit_chirindi', name: 'Chirindi (Kaliforniya chuvalchang Biogumusi)', cat: 'organik_ogit', emoji: '🪱', price: 2500, unit: 'kg', 
        farmer: 'OʻzBiogumus Klasteri', region: 'Andijon viloyati', trend: 1, rating: 5.0, reviewsCount: 420,
        desc: 'Qizil Kaliforniya chuvalchanglari tomonidan qayta ishlangan 100% sof va elangan konsentrlangan biogumus.',
        specs: ['Namlik: 40-45%', 'Gumik kislotalar: 15-20%', 'Tozaligi: 2 mm elakdan oʻtgan', 'Gul va koʻchatlar uchun birinchi raqamli oʻgʻit'],
        img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80' 
      },

      // === HIMOYA VOSITALARI ===
      { 
        id: 'himoya_insektitsid', name: 'Insektitsid ("Aktara" va "Koragen")', cat: 'himoya', emoji: '🧴', price: 64000, unit: 'dona', 
        farmer: 'Agro Dorixona Markazi', region: 'Toshkent viloyati', trend: 1, rating: 4.9, reviewsCount: 280,
        desc: 'Shiralar, trips, oqqanot va barcha turdagi zararkunandalarga qarshi uzoq muddatli tizimli taʼsirga ega preparat.',
        specs: ['Taʼsir etuvchi modda: Tiametoksam 250 g/kg', 'Himoya davri: 21-28 kun', 'Qoʻllash meʼyori: 10 litr suvga 2-4 gr', 'Original Shveytsariya litsenziyasi'],
        img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'himoya_fungitsid', name: 'Fungitsid ("Ridomil Gold" kasalliklarga qarshi)', cat: 'himoya', emoji: '💊', price: 78000, unit: 'dona', 
        farmer: 'Agro Kimyo Taʼminot', region: 'Fargʻona viloyati', trend: 0, rating: 4.8, reviewsCount: 195,
        desc: 'Fitoftora, un shudring, chirish va zamburugʻli kasalliklarni ildizidan yoʻqotuvchi yuqori samarali fungitsid.',
        specs: ['Tarkibi: Mefenoksam + Mankotseb', 'Davolash va profilaktika', 'Yomgʻirga chidamlilik: 2 soatdan soʻng', 'Qadoq: 250 g va 1 kg'],
        img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'himoya_gerbitsid', name: 'Gerbitsid ("Gezagard" begona oʻtlarga)', cat: 'himoya', emoji: '🌿', price: 85000, unit: 'litr', 
        farmer: 'Oʻsimliklarni Himoya Qilish MCHJ', region: 'Samarqand viloyati', trend: -1, rating: 4.7, reviewsCount: 110,
        desc: 'Sabzi, paxta va kartoshka dalalaridagi bir yillik ikki pallali va boshoqli begona oʻtlarga qarshi selektiv gerbitsid.',
        specs: ['Taʼsir etuvchi modda: Prometrin 500 g/l', 'Hosilga zarar yetkazmaydi', 'Samarasi: 8-10 hafta davomida', 'Qoʻllash: Unib chiqqunga qadar'],
        img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80' 
      },

      // === YOQILGʻI ===
      { 
        id: 'yoqilgi_dizel', name: 'Dizel yoqilgʻisi (Yevro-5 Agro-solyarka)', cat: 'yoqilgi', emoji: '⛽', price: 11800, unit: 'litr', 
        farmer: 'Oʻzbekneftgaz Taʼminot', region: 'Respublika boʻylab', trend: 1, rating: 4.9, reviewsCount: 650,
        desc: 'Traktor va kombaynlar uchun tozalangan, motor forsunkalarini toza saqlovchi sertifikatlangan Yevro-5 dizel yoqilgʻisi.',
        specs: ['Standart: GOST Yevro-5', 'Setan soni: 51 dan yuqori', 'Yetkazish: Yoqilgʻi tashuvchi mashinada (min 1000 litr)', 'Sertifikat: Oʻzstandart'],
        img: 'https://images.unsplash.com/photo-1611022513823-55f38013c048?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'yoqilgi_benzin', name: 'Benzin (Ai-92 Agro agregatlar uchun)', cat: 'yoqilgi', emoji: '🛢️', price: 10500, unit: 'litr', 
        farmer: 'Agro Yoqilgʻi Baza', region: 'Respublika boʻylab', trend: 0, rating: 4.8, reviewsCount: 210,
        desc: 'Motobloklar, suv nasoslari va yengil qishloq xoʻjalik agregatlari uchun toza Ai-92 benzini.',
        specs: ['Oktan soni: 92.5', 'Oqim darajasi: Yengil oʻt oldirish', 'Yetkazish: Bochkada yoki fura bilan', 'Sifat kafolati: Toʻliq'],
        img: 'https://images.unsplash.com/photo-1543699539-6d3fc3cdd27f?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'yoqilgi_moy', name: 'Motor va gidravlik moylar (15W-40 & M10G2k)', cat: 'yoqilgi', emoji: '🛢️', price: 32000, unit: 'litr', 
        farmer: 'Texnika Moy Servis', region: 'Toshkent viloyati', trend: 1, rating: 4.8, reviewsCount: 180,
        desc: 'Ogʻir yuk ostida ishlaydigan traktor dvigatellari va gidravlika tizimlari uchun mineral va yarim sintetik moylar.',
        specs: ['Yopishqoqlik: SAE 15W-40 / ISO 46', 'Issiqlikka chidamli: +50°C gacha', 'Ish vaqti: 250-300 moto-soat', 'Qadoq: 20L kanistra va 200L bochka'],
        img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80' 
      },

      // === SUGʻORISH VOSITALARI ===
      { 
        id: 'sugorish_tomchi', name: 'Tomchilatib sugʻorish tizimi (1 gektar toʻplam)', cat: 'sugorish', emoji: '💧', price: 4800000, unit: 'toʻplam (1 ga)', 
        farmer: 'Smart Irrigation Tech', region: 'Toshkent viloyati', trend: -1, rating: 5.0, reviewsCount: 130,
        desc: 'Suvni 60% gacha tejovchi, oʻgʻitni ildizga toʻgʻri yetkazuvchi toʻliq kompensatsiyalangan tomchilatish liniyasi.',
        specs: ['Lenta qalinligi: 8 mil / 16 mm', 'Tomizgich oraliq masofasi: 20-30 sm', 'Suv sarfi: 1.6 litr/soat', 'Kafolat: 3 yil rasmiy kafolat'],
        img: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'sugorish_quvur', name: 'Polietilen quvurlar (PE-100 d-32/50/63 mm)', cat: 'sugorish', emoji: '〰️', price: 4200, unit: 'metr', 
        farmer: 'Quvur Plast Zavod', region: 'Samarqand viloyati', trend: 0, rating: 4.7, reviewsCount: 95,
        desc: 'Quyosh nurlari va sovuqqa bardoshli, 10 atmosferagacha bosimga moʻljallangan qora suv quvurlari.',
        specs: ['Material: 100% birlamchi polietilen PE-100', 'Bosim: PN 6 - PN 10 bar', 'Xizmat muddati: 50 yil', 'Buxanka (rulon): 100 - 200 metr'],
        img: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'sugorish_nasos', name: 'Suv nasoslari va qum-shagʻal filtrlari', cat: 'sugorish', emoji: '⚙️', price: 3500000, unit: 'dona', 
        farmer: 'AgroNasos Servis', region: 'Fargʻona viloyati', trend: 1, rating: 4.9, reviewsCount: 118,
        desc: 'Ariq va quduqdan suv chiqaruvchi kuchli elektr va dizel dvigatelli agrosanoat nasoslari va avtomatik filtrlari.',
        specs: ['Quvvati: 5.5 - 11 kW (Elektr) / 15 HP (Dizel)', 'Unumdorligi: 50-80 m³/soat', 'Bosim balandligi: 35 metr', 'Filtr: Diskli va toʻrli er-xotin tozalash'],
        img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' 
      },

      // === AGROTEXNIKA ===
      { 
        id: 'texnika_traktor', name: 'Traktor MTZ-82.1 Belarus (Konditsionerli)', cat: 'texnika_savdo', emoji: '🚜', price: 240000000, unit: 'dona', 
        farmer: 'Toshkent Traktor Zavodi Agromash', region: 'Toshkent viloyati', trend: 0, rating: 5.0, reviewsCount: 88,
        desc: 'Oʻzbekiston dalalari uchun eng ishonchli va universal toʻliq yetaklovchi (4x4) koʻp funksiyali Belarus traktori.',
        specs: ['Dvigatel quvvati: 81 ot kuchi (D-243)', 'Privod: 4x4 Toʻliq yetakchi', 'Kafolat: 2 yil yoki 2000 moto-soat', 'Lizing va kredit shartlari mavjud'],
        img: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'texnika_kombayn', name: 'Gʻalla oʻrish kombayni (Claas Tucano 450)', cat: 'texnika_savdo', emoji: '🌾', price: 650000000, unit: 'dona', 
        farmer: 'Agromash Lizing Kompaniyasi', region: 'Samarqand viloyati', trend: 1, rating: 4.9, reviewsCount: 42,
        desc: 'Yuqori unumdorlikka ega nemis texnologiyasi asosidagi gʻalla va moyli ekinlarni nest-nobud qilmasdan oʻruvchi kombayn.',
        specs: ['Kosa hajmi (Bunker): 9000 litr', 'Jatka kengligi: 6.6 metr', 'Dvigatel: Mercedes-Benz 299 ot kuchi', 'Yoʻqotish darajasi: 0.5% dan kam'],
        img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'texnika_seyalka', name: 'Seyalka (Pnevmatik aniq ekish agregati)', cat: 'texnika_savdo', emoji: '🚜', price: 38000000, unit: 'dona', 
        farmer: 'Chirchiq Qishloq Xoʻjalik Texnikasi', region: 'Toshkent viloyati', trend: -1, rating: 4.8, reviewsCount: 36,
        desc: 'Paxta, makkajoʻxori, kungaboqar va loviyani belgilangan oraliqda bir meʼyorda chuqurlikka ekish mashinasi.',
        specs: ['Qatorlar soni: 4 - 8 qatorli', 'Oʻgʻit solish moslamasi: Bor', 'Tezlik: 8-12 km/soat', 'Boshqaruv: Kabina ichidagi elektron monitor'],
        img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'texnika_kultivator', name: 'Kultivator va chuqur yumshatgich (Chizel)', cat: 'texnika_savdo', emoji: '⛏️', price: 19000000, unit: 'dona', 
        farmer: 'Fargʻona Agromash Servis', region: 'Fargʻona viloyati', trend: 0, rating: 4.7, reviewsCount: 54,
        desc: 'Begona oʻtlarni ildizi bilan qirqib, yerni yumshatib ketuvchi universal kultivator-chizel osma agregati.',
        specs: ['Ishlov berish kengligi: 3.2 metr', 'Ish chuqurligi: 12-25 sm', 'Pichoqlari: Mustahkamlangan legirlangan poʻlat', 'Traktor quvvati: 60-90 ot kuchi'],
        img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80' 
      },

      // === PARVARISHLASH VOSITALARI ===
      { 
        id: 'parvarish_stimulyator', name: 'Oʻsishni boshqaruvchi biostimulyator (Megafol)', cat: 'parvarish', emoji: '🌱', price: 55000, unit: 'litr', 
        farmer: 'BioAgro Texnologiyalar Instituti', region: 'Toshkent viloyati', trend: 1, rating: 4.9, reviewsCount: 165,
        desc: 'Oʻsimlikni sovuq, issiq va qurgʻoqchilik stresslaridan chiqaruvchi tabiiy aminokislotalar majmuasi.',
        specs: ['Aminokislotalar: 28%', 'Oʻsish energiyasi: 2 barobar tezlashtiradi', 'Bargdan oziqlantirish uchun', 'Barcha ekinlarga toʻgʻri keladi'],
        img: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80' 
      },
      { 
        id: 'parvarish_mikro', name: 'Kompleks mikroelementlar (Bor, Sink, Xelat Temir)', cat: 'ogit', subcat: 'parvarish', emoji: '🧪', price: 48000, unit: 'paket (1 kg)', 
        farmer: 'Agro Element Laboratoriyasi', region: 'Samarqand viloyati', trend: 1, rating: 4.9, reviewsCount: 140,
        desc: 'Gul toʻkilishining oldini oluvchi, mevalarning toʻliq shakllanishini taʼminlovchi xelatlangan mikroelementlar.',
        specs: ['Shakli: 100% suvda eruvchan xelat (EDTA)', 'Tarkibi: B, Zn, Fe, Mn, Cu, Mo', 'Hosildorlik qoʻshilishi: +20-25%', 'Qadoq: 1 kg folgali paket'],
        img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80' 
      },

      // === FERMERLAR UCHUN XIZMATLAR ===
      {
        id: 'xizmat_dron', name: 'Agrodron orqali ekin maydonlarini purkash xizmati', cat: 'xizmatlar', emoji: '🛸', price: 55000, unit: 'ga',
        farmer: 'AeroAgro Monitoring MCHJ', region: 'Toshkent viloyati', trend: 1, rating: 5.0, reviewsCount: 89,
        desc: 'DJI Agras T40 dronlari yordamida oʻgʻit va himoya vositalarini teng taqsimotda, gʻildirak izisiz 10 barobar tez purkash.',
        specs: ['Unumdorlik: Soatiga 15-20 gektar', 'Dori tejalishi: 30% gacha kamroq suv va preparat', 'Kechki purkash: Mavjud (termovizor bilan)', 'Buyurtma: 24 soat oldin'],
        img: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'xizmat_laboratoriya', name: 'Tuproq agrokimyoviy laboratoriya tahlili', cat: 'xizmatlar', emoji: '🔬', price: 280000, unit: 'tahlil',
        farmer: 'Respublika Tuproqshunoslik Markazi', region: 'Samarqand viloyati', trend: 0, rating: 4.9, reviewsCount: 112,
        desc: 'Tuproq tarkibidagi NPK, gumus miqdori, pH kislotalilik va shoʻrlanish darajasini aniqlash va ilmiy tavsiyanoma berish.',
        specs: ['Koʻrsatkichlar: 12 ta parametr', 'Xulosa muddati: 3 ish kuni', 'Tavsiya: Gektariga oʻgʻit meʼyori xaritasi', 'Format: Elektron va muhrlangan qogʻoz'],
        img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'xizmat_ombor', name: 'Sovutgichli CA omborxona ijarasi (Meva va sabzavot)', cat: 'xizmatlar', emoji: '❄️', price: 120000, unit: 'tonna / oy',
        farmer: 'AgroLogistika Fresh Terminal', region: 'Fargʻona viloyati', trend: 1, rating: 4.8, reviewsCount: 76,
        desc: 'Gaz muhiti nazorat qilinadigan (Controlled Atmosphere) zamonaviy muzlatkich omborxonada hosilni 6 oygacha yangidek saqlash.',
        specs: ['Harorat: -1°C dan +4°C gacha', 'Namlik: 90-95% doimiy nazorat', 'Yuklash-tushirish: Avtokarlar bilan bepul', 'Sigʻim: 5,000 tonna'],
        img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'xizmat_sugorish', name: 'Intellektual tomchilatib sugʻorish tizimlarini oʻrnatish', cat: 'xizmatlar', emoji: '💧', price: 9500000, unit: 'ga (tayyor kalit)',
        farmer: 'EcoDrip Systems', region: 'Namangan viloyati', trend: 1, rating: 4.9, reviewsCount: 64,
        desc: 'Barcha filtr stansiyalari, quvurlar, tomizgichlar va avtomatlashtirilgan klapanlar bilan birga toʻliq montaj va kafolat.',
        specs: ['Suv tejalishi: 45-50%', 'Kafolat: 3 yil toʻliq kafolat', 'Davlat subsidiyasi: Hujjatlarni rasmiylashtirishda yordam', 'Oʻrnatish muddati: 10 ga uchun 5 kun'],
        img: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80'
      },

      // === AGRONOM MASLAHATLARI ===
      {
        id: 'agronom_bog', name: 'Intensiv bogʻ va tokzorlar uchun mavsumiy agronomik xizmat', cat: 'agronom', emoji: '👨‍🌾', price: 1500000, unit: 'oyiga / xoʻjalik',
        farmer: 'Bosh Agronom Mahmud Ergashev', region: 'Toshkent viloyati', trend: 1, rating: 5.0, reviewsCount: 94,
        desc: '20 yillik tajribaga ega yetakchi agronomdan haftalik monitoring, butash sxemalari, oziqlantirish va kasalliklar profilaktikasi.',
        specs: ['Format: Dalaga chiqish + onlayn konsultatsiya', 'Bogʻ turlari: Olma, nok, gilos, bodom, uzum', 'Agro-xarita: Mavsumiy toʻliq reja', 'Aloqa: Haftada 6 kun'],
        img: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'agronom_diagnostika', name: 'Ekin kasalliklari va zararkunandalarining onlayn diagnostikasi', cat: 'agronom', emoji: '📱', price: 35000, unit: 'tahlil',
        farmer: 'AgroDoktor Ekspert Guruhi', region: 'Buxoro viloyati', trend: 0, rating: 4.8, reviewsCount: 180,
        desc: 'Barg yoki mevani rasmga olib yuborasiz, 30 daqiqa ichida kasallik aniqlanib, eng samarali preparat va dozasi tavsiya qilinadi.',
        specs: ['Tezlik: 30-60 daqiqa', 'Aniqlik: 98% gacha kafolatlangan', 'Tavsiya: Aniq oʻgʻit va dori dozalari', 'Rejim: 08:00 - 20:00 har kuni'],
        img: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80'
      },

      // === E'LONLAR VA ERKIN SAVDO ===
      {
        id: 'elon_gilos', name: 'Eksportbop saralangan qizil gilos (28+ kalibr, ulgurji)', cat: 'elonlar', emoji: '🍒', price: 38000, unit: 'kg',
        farmer: 'Qashqadaryo Meva Klasteri', region: 'Qashqadaryo viloyati', trend: 1, rating: 4.9, reviewsCount: 42,
        desc: 'Yangi uzilgan, bir xil kalibrlangan, sovutilgan eksportbop gilos. Minimal buyurtma hajmi: 2 tonna.',
        specs: ['Kalibr: 28-32 mm', 'Qadoq: 5 kg maxsus plastik meva yashigi', 'Sertifikat: GlobalG.A.P. bor', 'Yuklash: Furgonlarga tezkor yuklash'],
        img: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'elon_somon', name: 'Bugʻdoy somoni zich presslangan (Chorva mollari uchun)', cat: 'elonlar', emoji: '🌾', price: 16000, unit: 'dona (pres)',
        farmer: 'Olimjon Dehqon xoʻjaligi', region: 'Jizzax viloyati', trend: -1, rating: 4.7, reviewsCount: 56,
        desc: 'Yomgʻirda qolmagan, toza, quruq va ogʻir presslangan bugʻdoy somonlari. 500 dona va undan ortiq xaridga chegirma.',
        specs: ['Ogʻirligi: 18-22 kg/pres', 'Sifati: Birinchi nav, toza quruq', 'Hajmi: 3,000 dona mavjud', 'Yuklab berish: Fermer hisobidan'],
        img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'elon_makkajoxori', name: 'Makkajoʻxori doni (Silos va yemlik, quritilgan)', cat: 'elonlar', emoji: '🌽', price: 3200, unit: 'kg',
        farmer: 'Sirdaryo Don Agro', region: 'Sirdaryo viloyati', trend: 1, rating: 4.8, reviewsCount: 67,
        desc: 'Namligi meʼyorda quritilgan, begona oʻt urugʻlaridan tozalangan yemlik makkajoʻxori doni.',
        specs: ['Namligi: 13.5%', 'Tozaligi: 98.2%', 'Qadoqlanishi: 50 kg qoplarda yoki ochiq yuk mashinasida', 'Minimal hajm: 5 tonna'],
        img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80'
      }
    ],
    marketplaceSections: [
      { id: 'texnika', name: 'Agro texnikalar', emoji: '🚜', count: '120+', desc: 'Traktorlar, kombaynlar, ekin sevalkalari va agrodronlar', img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80' },
      { id: 'urug', name: 'Urugʻ va koʻchatlar', emoji: '🌱', count: '350+', desc: 'Gibrid don urugʻlari, serhosil mevali daraxt koʻchatlari', img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80' },
      { id: 'ogit', name: 'Mineral oʻgʻitlar', emoji: '🧪', count: '180+', desc: 'Azotli, fosforli, kaliyli va tabiiy bio-gumus oʻgʻitlar', img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80' },
      { id: 'hosil', name: 'Qishloq xoʻjaligi mahsulotlari', emoji: '🍎', count: '540+', desc: 'Yangi meva-sabzavotlar, poliz, gʻalla va dukkakli ekinlar', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80' },
      { id: 'xizmatlar', name: 'Fermerlar uchun xizmatlar', emoji: '🛠️', count: '90+', desc: 'Dron purkash, tuproq agro-tahlili, CA sovuq omborlar', img: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80' },
      { id: 'agronom', name: 'Agronom maslahatlari', emoji: '🌿', count: '65+', desc: 'Ekin kasalliklari diagnostikasi va agro-texnologiya xaritalari', img: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80' },
      { id: 'elonlar', name: 'Eʼlonlar va savdo', emoji: '📢', count: '430+', desc: 'Fermerlarning erkin savdo eʼlonlari va xarid talablari', img: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80' }
    ],
    cats: [
      ['all', 'Barchasi'],
      ['texnika', 'Agro texnikalar'],
      ['urug', 'Urugʻ va koʻchatlar'],
      ['ogit', 'Mineral oʻgʻitlar'],
      ['hosil', 'Qishloq xoʻjaligi mahsulotlari'],
      ['xizmatlar', 'Fermer xizmatlari'],
      ['agronom', 'Agronom maslahatlari'],
      ['elonlar', 'Eʼlonlar va savdo'],
      ['sabzavot', 'Sabzavot'],
      ['meva', 'Meva'],
      ['gosh', 'Goʻsht'],
      ['sut', 'Sut']
    ],
    catLabel: {
      texnika: 'Agro texnikalar',
      urug: 'Urugʻ va koʻchatlar',
      ogit: 'Mineral oʻgʻitlar',
      hosil: 'Qishloq xoʻjaligi mahsulotlari',
      xizmatlar: 'Fermer xizmatlari',
      agronom: 'Agronom maslahatlari',
      elonlar: 'Eʼlonlar va savdo',
      sabzavot: 'Sabzavot',
      meva: 'Meva',
      gosh: 'Goʻsht',
      sut: 'Sut',
      mineral_ogit: 'Mineral oʻgʻitlar',
      organik_ogit: 'Organik oʻgʻitlar',
      himoya: 'Himoya vositalari',
      yoqilgi: 'Yoqilgʻi mahsulotlari',
      sugorish: 'Sugʻorish vositalari',
      texnika_savdo: 'Agrotexnika',
      parvarish: 'Parvarishlash vositalari'
    },
    regionsList: [
      'Barcha viloyatlar',
      'Toshkent viloyati',
      'Samarqand viloyati',
      'Fargʻona viloyati',
      'Andijon viloyati',
      'Namangan viloyati',
      'Buxoro viloyati',
      'Qashqadaryo viloyati',
      'Surxondaryo viloyati',
      'Xorazm viloyati',
      'Jizzax viloyati',
      'Sirdaryo viloyati',
      'Navoiy viloyati',
      'Qoraqalpogʻiston Respublikasi'
    ],
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

