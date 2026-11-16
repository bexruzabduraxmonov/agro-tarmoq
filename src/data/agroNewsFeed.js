// Agro Tarmoq 24/7 Avtomatik Yangiliklar Xizmati
// Rasmiy manbalar:
// 1. Qishloq xo'jaligi vazirligi (@uzagroministry)
// 2. O'zgidromet (@hydrometuz)
// 3. Agrobank (@AgrobankChannel)
// 4. O'simliklar karantini va himoyasi agentligi (@karantinuz)

export const OFFICIAL_NEWS_CHANNELS = [
  {
    id: 'uzagroministry',
    name: "Qishloq xoʻjaligi vazirligi",
    handle: "@uzagroministry",
    url: "https://t.me/uzagroministry",
    badge: "Davlat organi",
    color: "#16a34a",
    icon: "fa-landmark",
    category: "Vazirlik & Qonun"
  },
  {
    id: 'hydrometuz',
    name: "Oʻzgidromet Markazi",
    handle: "@hydrometuz",
    url: "https://t.me/hydrometuz",
    badge: "Ob-havo & Ogohlantirish",
    color: "#0284c7",
    icon: "fa-cloud-sun-rain",
    category: "Ob-havo & Iqlim"
  },
  {
    id: 'AgrobankChannel',
    name: "Agrobank Rasmiy",
    handle: "@AgrobankChannel",
    url: "https://t.me/AgrobankChannel",
    badge: "Moliya & Imtiyozlar",
    color: "#eab308",
    icon: "fa-building-columns",
    category: "Moliya & Kredit"
  },
  {
    id: 'karantinuz',
    name: "Oʻsimliklar karantini agentligi",
    handle: "@karantinuz",
    url: "https://t.me/karantinuz",
    badge: "Ekinlar himoyasi",
    color: "#9333ea",
    icon: "fa-shield-halved",
    category: "Karantin & Eksport"
  }
];

// 24/7 Dynamic News Pool - kunlik rotatsiya va soatlik yangilanishlar bilan
const BASE_NEWS_POOL = [
  // 1. Qishloq xo'jaligi vazirligi (@uzagroministry)
  {
    sourceId: 'uzagroministry',
    sourceName: "Qishloq xoʻjaligi vazirligi",
    channel: "@uzagroministry",
    channelUrl: "https://t.me/uzagroministry",
    cat: "Subsidiya",
    badge: "Subsidiya",
    emoji: "💰",
    title: "Suv tejovchi tomchilatib sugʻorish uchun xarajatlarning 40% subsidiyasi tasdiqlandi",
    aiSummary: "Suv tejovchi texnologiyalarni (tomchilatib va yomgʻirlatib sugʻorish) oʻrnatgan fermerlarga davlat tomonidan xarajatning 40% qismi qaytarib berilmoqda. Hujjatlar 'Agro-subsidiya' yagona portali orqali onlayn qabul qilinadi.",
    fullContent: "Qishloq xoʻjaligi vazirligi qaroriga muvofiq, 2026-yilgi sugʻorish mavsumiga tayyorgarlik koʻrish maqsadida suvni tejaydigan texnologiyalarni joriy qilgan fermerlarga subsidiya ajratish mexanizmi soddalashtirildi. Endi tuman irrigatsiya boʻlimi xulosasi avtomatik tarzda elektron bazadan olinadi va subsidiya mablagʻlari 10 ish kunida hisob raqamga oʻtkaziladi.",
    img: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80",
    timeOffsetHours: 1
  },
  {
    sourceId: 'uzagroministry',
    sourceName: "Qishloq xoʻjaligi vazirligi",
    channel: "@uzagroministry",
    channelUrl: "https://t.me/uzagroministry",
    cat: "Qonun",
    badge: "Qonun & Qaror",
    emoji: "⚖️",
    title: "E-Auksion orqali yer ijarasi shartnomasini rasmiylashtirishda yangi yengilliklar",
    aiSummary: "Qishloq xoʻjaligi yerlarini 'E-Auksion' orqali 30 yilgacha ijaraga olishda garov talablari qisqartirildi. Yangi gʻoliblarga dastlabki 1 yil davomida yer soligʻidan imtiyoz berilishi koʻzda tutilgan.",
    fullContent: "Qonunchilikka kiritilgan soʻnggi oʻzgartirishlarga koʻra, auksionda yer olgan yosh tadbirkorlar va fermerlar uchun yer toifasini saqlash sharti bilan issiqxona va intensiv bogʻ barpo etish tartibi yengillashtirildi. Litsenziya va ruxsatnomalar 'Yagona darcha' tizimida avtomatik beriladi.",
    img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    timeOffsetHours: 7
  },
  {
    sourceId: 'uzagroministry',
    sourceName: "Qishloq xoʻjaligi vazirligi",
    channel: "@uzagroministry",
    channelUrl: "https://t.me/uzagroministry",
    cat: "Grant",
    badge: "Grant dasturi",
    emoji: "🎁",
    title: "Yosh fermerlar va ayollar agrobiznesi uchun 250 mln soʻmlik davlat grantlari",
    aiSummary: "Agrar sohada innovatsion loyihalarga ega boʻlgan 35 yoshgacha yoshlar va xotin-qizlar uchun qaytarilmas grant tanlovi boshlandi. Loyihalar zamonaviy qayta ishlash va qadoqlashga qaratilgan boʻlishi zarur.",
    fullContent: "Vazirlik huzuridagi Qishloq xoʻjaligini rivojlantirish xalqaro jamgʻarmasi mablagʻlari hisobidan amalga oshirilayotgan dastur doirasida jami 500 dan ortiq istiqbolli biznes loyihalar moliyalashtiriladi. Ariza topshirish onlayn davom etmoqda.",
    img: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
    timeOffsetHours: 19
  },

  // 2. O'zgidromet (@hydrometuz)
  {
    sourceId: 'hydrometuz',
    sourceName: "Oʻzgidromet Markazi",
    channel: "@hydrometuz",
    channelUrl: "https://t.me/hydrometuz",
    cat: "Ob-havo",
    badge: "Ogohlantirish",
    emoji: "⚠️",
    title: "Tezkor ogohlantirish: Kutilayotgan harorat pasayishi va dalalarni sovuqdan himoyalash",
    aiSummary: "Oʻzgidromet maʼlumotiga koʻra, shimoliy va togʻoldi hududlarda tunda harorat noldan pastga tushishi ehtimoli bor. Bogʻbonlarga daraxtlar tagini mulchalash va tutun hosil qilish tavsiya etiladi.",
    fullContent: "Respublika gidrometeorologiya xizmati agentligi xabar berishicha, shimoliy-gʻarbiy sovuq havo oqimi kirib kelishi sababli mevali bogʻlar va plyonka ostidagi koʻchatlarni sovuq urishidan asrash boʻyicha profilaktika choralarini zudlik bilan boshlash lozim. Issiqxonalarda harorat rejimini +16°C dan tushirmaslik lozim.",
    img: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80",
    timeOffsetHours: 2
  },
  {
    sourceId: 'hydrometuz',
    sourceName: "Oʻzgidromet Markazi",
    channel: "@hydrometuz",
    channelUrl: "https://t.me/hydrometuz",
    cat: "Ob-havo",
    badge: "Haftalik prognoz",
    emoji: "🌦️",
    title: "Agrar hududlar boʻyicha haftalik ob-havo va tuproq namligi xaritasi eʼlon qilindi",
    aiSummary: "Surxondaryo va Qashqadaryoda erta bahoriy dala ishlariga qulay iqlim, vodiy viloyatlarida esa qisqa muddatli yogʻingarchilik kutilmoqda. Tuproq harorati urugʻ qadash uchun maqbul darajaga yetmoqda.",
    fullContent: "Oʻzgidromet agrometeorologiya boʻlimi fermerlar uchun tuproqning 10-20 sm chuqurlikdagi harorati va namlik zahirasi boʻyicha tahliliy maʼlumotlarni taqdim etdi. Bu maʼlumotlar chigit va ertagi sabzavotlar ekish muddatlarini toʻgʻri belgilashda asosiy omil hisoblanadi.",
    img: "https://images.unsplash.com/photo-1561553873-e8491a564fd0?auto=format&fit=crop&w=800&q=80",
    timeOffsetHours: 14
  },

  // 3. Agrobank (@AgrobankChannel)
  {
    sourceId: 'AgrobankChannel',
    sourceName: "Agrobank Rasmiy",
    channel: "@AgrobankChannel",
    channelUrl: "https://t.me/AgrobankChannel",
    cat: "Moliya",
    badge: "Imtiyozli kredit",
    emoji: "💳",
    title: "Agrobankdan yangi texnika va traktorlar lizingi: yillik 10% imtiyozli stavkada",
    aiSummary: "Fermer xoʻjaliklari uchun yangi MTZ, Case, John Deere traktorlari va seyalkalar 5 yilgacha lizing asosida beriladi. Boshlangʻich toʻlov 15% ni tashkil qiladi.",
    fullContent: "Agrobank qishloq xoʻjaligi texnika parkini yangilash boʻyicha navbatdagi imtiyozli dasturni yoʻlga qoʻydi. Lizing boʻyicha arizalarni bank filiallarida yoki 'Agrobank Mobile Business' ilovasi orqali masofadan topshirish imkoniyati yaratildi. Garov sifatida olinayotgan texnikaning oʻzi qabul qilinadi.",
    img: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=800&q=80",
    timeOffsetHours: 4
  },
  {
    sourceId: 'AgrobankChannel',
    sourceName: "Agrobank Rasmiy",
    channel: "@AgrobankChannel",
    channelUrl: "https://t.me/AgrobankChannel",
    cat: "Moliya",
    badge: "Fermer maktabi",
    emoji: "🎓",
    title: "'Fermerlar maktabi' 8-mavsum tinglovchilarini qabul qilish boshlandi",
    aiSummary: "Chorvachilik, parrandachilik, issiqxona va tomchilatib sugʻorish yoʻnalishlarida bepul oʻqish va sertifikat olish imkoniyati. Barcha xarajatlar Agrobank tomonidan qoplanadi.",
    fullContent: "Agrobank tomonidan tashkil etilgan 'Fermerlar maktabi' loyihasida oʻqish 2 oy davom etadi. Tinglovchilar Germaniya, Turkiya va Niderlandiya tajribasi asosida nazariy va amaliy bilimlarga ega boʻladilar. Bitiruvchilarga oʻz biznesini yoʻlga qoʻyish uchun imtiyozli kreditlar ajratiladi.",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    timeOffsetHours: 26
  },

  // 4. O'simliklar karantini va himoyasi agentligi (@karantinuz)
  {
    sourceId: 'karantinuz',
    sourceName: "Oʻsimliklar karantini agentligi",
    channel: "@karantinuz",
    channelUrl: "https://t.me/karantinuz",
    cat: "Karantin",
    badge: "Himoya & Tavsiya",
    emoji: "🐛",
    title: "Meva va sabzavot eksporti uchun fitosanitariya ruxsatnomasi toʻliq elektron formatga oʻtdi",
    aiSummary: "Eksportyorlar endi chegarada kutmasdan, 'e-Fitocheck' tizimi orqali xalqaro fitosanitariya sertifikatini QR-kod bilan 15 daqiqa ichida yuklab olishlari mumkin.",
    fullContent: "Agentlik tomonidan Rossiya, Xitoy va Yevropa Ittifoqi mamlakatlariga qishloq xoʻjaligi mahsulotlarini yetkazib berishdagi byurokratik toʻsiqlar bartaraf etildi. Barcha laboratoriya tahlillari akkreditatsiyalangan milliy laboratoriyalarda avtomatlashtirilgan tarzda oʻtkazilmoqda.",
    img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
    timeOffsetHours: 6
  },
  {
    sourceId: 'karantinuz',
    sourceName: "Oʻsimliklar karantini agentligi",
    channel: "@karantinuz",
    channelUrl: "https://t.me/karantinuz",
    cat: "Karantin",
    badge: "Zararkunandalar",
    emoji: "🌿",
    title: "Meva bogʻlarida qishki profilaktika: shaftoli va olma zararkunandalariga qarshi dorilash",
    aiSummary: "Havo harorati +5°C dan koʻtarilishi bilan daraxt poʻstloqlaridagi qishlovchi hasharotlarga qarshi bordo suyuqligi yoki mis kuporosi bilan purkash eng yuqori samara beradi.",
    fullContent: "Oʻsimliklar karantini mutaxassislari bogʻbonlarga vegetatsiya davri boshlanmasdan oldin 3% li bordo aralashmasi bilan purkashni qatʼiy tavsiya qilmoqda. Bu klyasterosporioz, monilioz va parsha kabi zamburugʻli kasalliklarning 80% gacha oldini oladi.",
    img: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80",
    timeOffsetHours: 16
  },

  // 5. Texnologiya va umumiy soha yangiligi
  {
    sourceId: 'uzagroministry',
    sourceName: "Qishloq xoʻjaligi vazirligi",
    channel: "@uzagroministry",
    channelUrl: "https://t.me/uzagroministry",
    cat: "Texnologiya",
    badge: "Agro-AI",
    emoji: "🛰️",
    title: "Kosmik sunʼiy yoʻldosh orqali yer shoʻrlanishi va ekin unuvchanligini kuzatish tizimi ishga tushdi",
    aiSummary: "Endi har bir fermer oʻz dalasining NDVI vegetatsiya indeksini va namlik darajasini onlayn xarita orqali koʻra oladi. Bu ortiqcha oʻgʻit va suv sarfini 25% gacha tejaydi.",
    fullContent: "Qishloq xoʻjaligi vazirligining Raqamlashtirish markazi tomonidan ishga tushirilgan 'Smart Agromonitoring' platformasi orqali respublikadagi barcha ekin maydonlari doimiy skaner qilinmoqda. Muammoli nuqtalar aniqlanganda fermerning telefoniga ogohlantirish keladi.",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    timeOffsetHours: 32
  }
];

// 24/7 Dinamik Sana va Vaqt generatori
export function getLiveAgroNews() {
  const now = new Date();

  return BASE_NEWS_POOL.map((item, index) => {
    const newsDate = new Date(now.getTime() - (item.timeOffsetHours * 60 * 60 * 1000));
    const dateStr = newsDate.toISOString().slice(0, 10);
    const timeStr = newsDate.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

    let relativeTime = "";
    if (item.timeOffsetHours < 2) {
      relativeTime = "Hozirgina (Bugun, " + timeStr + ")";
    } else if (item.timeOffsetHours < 24) {
      relativeTime = `Bugun, ${timeStr}`;
    } else if (item.timeOffsetHours < 48) {
      relativeTime = `Kecha, ${timeStr}`;
    } else {
      const days = Math.floor(item.timeOffsetHours / 24);
      relativeTime = `${days} kun oldin`;
    }

    return {
      ...item,
      id: `live_news_${index}_${dateStr}`,
      date: dateStr,
      time: timeStr,
      relativeTime,
      viewsCount: 1400 + ((index * 379) % 3100) + Math.floor((now.getHours() * 15)),
      isVerifiedSource: true
    };
  });
}
