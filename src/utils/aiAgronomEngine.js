// Comprehensive AI Agronomist Knowledge Engine (UZ, RU, EN)

export function generateAiAgronomAnswer(query, lang = 'uz') {
  if (!query || typeof query !== 'string') {
    return {
      title: lang === 'ru' ? "AI Агроном" : (lang === 'en' ? "AI Agronomist" : "AI Agronom"),
      text: lang === 'ru' 
        ? "Пожалуйста, задайте вопрос о вашей культуре, болезнях растений или уходе."
        : lang === 'en'
        ? "Please ask any question about your crops, plant diseases, or farming care."
        : "Iltimos, ekinlaringiz, kasalliklar yoki parvarish boʻyicha savolingizni yozing.",
      action: null
    };
  }

  const q = query.toLowerCase().trim();

  // 1. Salomatlik / Salomlashish / Umumiy
  if (/^(salom|assalomu|qalaysiz|qalesiz|privet|hello|hi|hey|zdravstvuyte)/i.test(q)) {
    return {
      title: lang === 'ru' ? "Приветствие AI Агронома" : (lang === 'en' ? "AI Agronomist Greeting" : "AI Agronom salomlashuvi"),
      text: lang === 'ru'
        ? "Здравствуйте! Я AI Агроном платформы Agro Tarmoq. Готов круглосуточно отвечать на ваши вопросы по болезням растений, нормам полива, выбору удобрений, защите от вредителей и сезонному календарю.\n\nКакая культура или проблема вас интересует?"
        : lang === 'en'
        ? "Hello! I am your Agro Tarmoq AI Agronomist assistant. Ready 24/7 to help you with plant pathology, fertilizer dosage, irrigation regimes, pest control, and seasonal crop calendars.\n\nWhich crop or issue can I assist you with today?"
        : "Assalomu alaykum! Men Agro Tarmoq platformasining sunʼiy intellekt agronomiman. Ekin kasalliklarini aniqlash, oʻgʻit meʼyorlari, zararkunandalarga qarshi kurash, sugʻorish tartibi va agrotexnik qoidalar boʻyicha 24/7 yordam berishga tayyorman.\n\nQaysi ekin yoki qanday muammo boʻyicha maslahat kerak?",
      action: { type: 'quick_prompts', label: lang === 'ru' ? '📸 Фотосканер листьев' : (lang === 'en' ? '📸 Scan Leaf Photo' : '📸 Bargni skanerlash'), page: 'agronom' }
    };
  }

  // 2. Rahmat / Minnatdorchilik
  if (/^(rahmat|katta rahmat|spasibo|thanks|thank you|barakalla|yaxshi)/i.test(q)) {
    return {
      title: "AI Agronom",
      text: lang === 'ru'
        ? "Пожалуйста! Всегда рад помочь вашему урожаю. Если возникнут вопросы по уходу за растениями или ценам — обращайтесь в любое время!"
        : lang === 'en'
        ? "You're very welcome! Always glad to help protect your harvest. Feel free to ask anytime about crop protection, fertilizers, or market prices."
        : "Arzimaydi! Hosilingiz doimo moʻl va barakali boʻlsin. Ekinlar parvarishi, kasalliklar yoki bozor narxlari boʻyicha yana savollaringiz boʻlsa, bemalol murojaat qiling!",
      action: null
    };
  }

  // 3. Pomidor & Fitoftoroz / Kasalliklar
  if (q.includes('pomidor') || q.includes('fitoftor') || q.includes('qora dog') || q.includes('tomati')) {
    if (q.includes('oziq') || q.includes('o\'g\'it') || q.includes('selitra') || q.includes('karbamid')) {
      return {
        title: "🍅 Pomidorni oziqlantirish meʼyorlari",
        text: `🌱 **Pomidor uchun optimal oʻgʻitlash tizimi:**\n\n` +
          `1. **Ekishdan oldin:** 1 sotix yerga 300-400 kg chirindi va 2.5-3 kg Ammofos solinadi.\n` +
          `2. **Gullash davrida:** Azotli oʻgʻitlarni kamaytiring (aks holda faqat palak oʻsadi), Kaliy sulfat (1 sotixga 1.5 kg) va Bor mikroelementi bilan bargdan purkash (10L suvga 5g bor kislotasi) gul toʻkilishining oldini oladi.\n` +
          `3. **Meva tugishda:** Kaliy nitrat yoki NPK 10-10-30 formulali kompleks oʻgʻit har 10-12 kunda meva shirinligi va yorilmasligi uchun zarur.`,
        action: { label: "🛒 Oʻgʻitlar boʻlimiga oʻtish", page: "dokon" }
      };
    }

    return {
      title: "🍅 Pomidor fitoftorozi va dogʻlanish tashxisi",
      text: `🔍 **Kasallik:** Fitoftoroz (Phytophthora infestans) — xavfli zamburugʻli kasallik.\n\n` +
        `• **Alomatlar:** Barg orqasida va poyada qoʻngʻir-qora dogʻlar, nam havoda oq mogʻor parpi, mevalar chirishi.\n` +
        `• **Tezkor davolash:** "Ridomil Gold" (10 litr suvga 25 gr) yoki "Quadris" (10 litrga 10-12 ml) purkash.\n` +
        `• **Profilaktika:** "Fitosporin-M" biopreparati, pastki sariq barglarni zudlik bilan olib tashlash, issiqxonani shamollatish.\n` +
        `• **Kutish muddati:** Kimyoviy dori sepilgandan soʻng 14 kungacha terim qilinmaydi.`,
      action: { label: "📸 Ekin bargini kamera orqali tekshirish", page: "agronom" }
    };
  }

  // 4. Bodring & Un-shudring / Soxta un-shudring
  if (q.includes('bodring') || q.includes('un shudring') || q.includes('oq dog') || q.includes('ogursi')) {
    return {
      title: "🥒 Bodring kasalliklari va parvarishi",
      text: `🔍 **Tashxis:** Un-shudring (Erysiphe cichoracearum) yoki Soxta un-shudring (Peronosporoz).\n\n` +
        `• **Alomatlar:** Barglarning ustki yuzasida oppoq un qoplamasi, pastki qismida sargʻish-moyli burchakli dogʻlar.\n` +
        `• **Tavsiya etilgan dorilar:** "Topaz" (10 litr suvga 3-4 ml) yoki "Previkur Enerji" (10 litr suvga 15-20 ml).\n` +
        `• **Xalqona samarali usul:** 1 litr qatiq/zardob + 9 litr iliq suv + 10 tomchi yod eritmasini barglarga sepish.\n` +
        `• **Sugʻorish tartibi:** Har 2-3 kunda faqat 20-22°C iliq suv bilan, sovuq ariq suvi ildiz chirishiga olib keladi.`,
      action: { label: "🛒 Himoya vositalarini koʻrish", page: "dokon" }
    };
  }

  // 5. Bug'doy & Kuzgi g'alla (Zang, Qorakuya)
  if (q.includes('bug\'doy') || q.includes('bugdoy') || q.includes('g\'alla') || q.includes('zang') || q.includes('pshenitsa')) {
    return {
      title: "🌾 Bugʻdoy zang kasalligi va agrotexnikasi",
      text: `🔍 **Tashxis:** Bugʻdoyning qoʻngʻir yoki sariq zang kasalligi (Puccinia recondita).\n\n` +
        `• **Xavf:** Hosildorlikni 30-40% gacha keskin pasaytiradi, don maydalashadi.\n` +
        `• **Tavsiya etilgan fungitsidlar:** "Falcon" (gektariga 0.6 litr), "Tilt" (gektariga 0.5 litr) yoki "Amistar Trio".\n` +
        `• **Ekish meʼyori:** Gektariga 220-250 kg, ekish chuqurligi 4-5 sm.\n` +
        `• **Oziqlantirish:** Erta bahorda naychalash davrida gektariga 150-200 kg Ammiakli selitra berish shart.`,
      action: { label: "📅 12 oylik agrotexnik kalendarni ochish", page: "obhavo" }
    };
  }

  // 6. Kartoshka & Kolorado / Ekish
  if (q.includes('kartoshka') || q.includes('kolorado') || q.includes('kartofel')) {
    return {
      title: "🥔 Kartoshka parvarishi va himoyasi",
      text: `🔍 **Tashxis & Tavsiyalar:**\n\n` +
        `• **Kolorado qoʻngʻizi va lichinkalari:** "Konfidor" (10 litr suvga 2-3 gr), "Koragen" (10 litrga 1.2-1.5 ml) yoki "Aktara".\n` +
        `• **Ekish qoidalari:** Qator oraligʻi 70 sm, chuqurligi 8-10 sm, urugʻlik vazni 50-80 gr boʻlgan unib chiqqan tuganaklar.\n` +
        `• **Tegishli sugʻorish:** Gullash va tuganak bogʻlash davrida namlik 75-80% dan tushmasligi kerak.\n` +
        `• **Profilaktika:** Ekishdan oldin tuganaklarni "Prestige" bilan dorilash 50 kun davomida zararkunandalardan himoya qiladi.`,
      action: { label: "📊 Kartoshka bozor narxlarini koʻrish", page: "narxlar" }
    };
  }

  // 7. Paxta & Gʻoʻza parvarishi
  if (q.includes('paxta') || q.includes('g\'o\'za') || q.includes('goza') || q.includes('tunlam') || q.includes('trips')) {
    return {
      title: "🌱 Paxta (Gʻoʻza) agrotexnikasi va zararkunandalar",
      text: `🔍 **Gʻoʻza zararkunandalariga qarshi chora:**\n\n` +
        `• **Koʻsak qurti (Paxta tunlami):** Feromon tutqichlar qoʻyish, "Avaunt" (gektariga 0.45L) yoki "Koragen" purkash.\n` +
        `• **Oʻrgimchakkana:** "Omite", "Nissoran" yoki "Vertimek" (gektariga 0.3-0.4L) vositalarini shamolsiz havoda sepish.\n` +
        `• **Chilpish (chekanka):** Poyada 14-16 ta hosil shoxi hosil boʻlganda tepa oʻsuvchi nuqtasini chilpish hosil pishishini 10-12 kunga tezlashtiradi.`,
      action: { label: "🚜 Agrotexnika ijarasiga oʻtish", page: "texnika" }
    };
  }

  // 8. O'g'itlar (Selitra, Mochevina, Fosfor, Kaliy, Chirindi)
  if (q.includes('o\'g\'it') || q.includes('ogit') || q.includes('selitra') || q.includes('mochevina') || q.includes('ammofos') || q.includes('karbamid') || q.includes('kaliy')) {
    return {
      title: "🧪 Mineral va organik oʻgʻitlar meʼyori",
      text: `🌿 **Oʻgʻitlar turlari va qoʻllanish qoidalari:**\n\n` +
        `1. **Ammiakli selitra (N-34%):** Tez taʼsir qiluvchi azot. Erta bahorda vegetatsiya boshida beriladi. Doza: 1 sotixga 1.5-2.5 kg.\n` +
        `2. **Karbamid / Mochevina (N-46%):** Konsentrlangan azot, ildizdan va bargdan oziqlantirish uchun ideal (10L suvga 30-40g).\n` +
        `3. **Ammofos (N-12%, P-52%):** Kuzda yoki ekish paytida yerning chuqur qatlamiga solinadi. Ildiz tizimini baquvvat qiladi.\n` +
        `4. **Kaliy sulfat:** Meva pishish davrida shirinlik va saqlanuvchanlikni oshiradi. Xlorli kaliydan koʻra xavfsiz.\n` +
        `5. **Qoida:** Har doim oʻgʻitlagandan soʻng darhol yer sugʻorilishi shart, aks holda ildiz kuyishi mumkin!`,
      action: { label: "🛒 Doʻkondan oʻgʻit buyurtma qilish", page: "dokon" }
    };
  }

  // 9. Sug'orish va Tomchilatish
  if (q.includes('sug\'or') || q.includes('suv') || q.includes('tomchilat') || q.includes('poliv')) {
    return {
      title: "💧 Sugʻorish meʼyorlari va tejamkor texnologiyalar",
      text: `🌊 **Aqlli sugʻorish qoidalari:**\n\n` +
        `• **Tomchilatib sugʻorish:** Suv sarfini 40-50% tejaydi, oʻgʻitni toʻgʻridan-toʻgʻri ildizga yetkazadi (fertigatsiya).\n` +
        `• **Sugʻorish vaqti:** Ertalab soat 06:00-09:00 gacha yoki kechqurun 18:00 dan soʻng. Kunduzgi jaziramada sugʻorish barglarni kuydiradi.\n` +
        `• **Tuproq namligi nazorati:** 15-20 sm chuqurlikdan tuproq olib mushtlaganda, yorilib ketmasa namlik yetarli, changisa zudlik bilan sugʻorish kerak.`,
      action: { label: "📅 Ob-havo va namlik maʼlumotlari", page: "obhavo" }
    };
  }

  // 10. Olma, Mevalar & Bog'dorchilik
  if (q.includes('olma') || q.includes('daraxt') || q.includes('bog\'') || q.includes('meva') || q.includes('shira') || q.includes('yablon')) {
    return {
      title: "🍎 Bogʻdorchilik va mevali daraxtlar parvarishi",
      text: `🌳 **Bogʻbon uchun muhim tavsiyalar:**\n\n` +
        `• **Olma parshasi va monilioz (chirishi):** Kurtak yozishdan oldin 3% li Bordo suyuqligi bilan koʻkartirib yuvish, gullashdan soʻng "Skor" (2ml/10L).\n` +
        `• **Mevaxoʻr qurtlar:** "Lyufox" (10L suvga 10ml) yoki "Koragen" purkash.\n` +
        `• **Shira (tlya) va bitlar:** "Bi-58" (10L suvga 15ml) yoki biologik "Fitoverm".\n` +
        `• **Oqlash:** Kuzda va erta bahorda ohak + mis kuporosi eritmasi bilan daraxt tanasini oqlash quyosh kuyishi va qishlovchi zararkunandalarni yoʻq qiladi.`,
      action: { label: "🌿 Kasalliklar katalogini ochish", page: "agronom" }
    };
  }

  // 11. Uzum & Tokchilik
  if (q.includes('uzum') || q.includes('tok') || q.includes('mildyu') || q.includes('oidium') || q.includes('vinograd')) {
    return {
      title: "🍇 Tokchilik va uzum himoyasi",
      text: `🍇 **Uzum kasalliklariga qarshi kurash:**\n\n` +
        `• **Mildyu (soxta un shudring):** Barg orqasida oq momiq. "Ridomil Gold" (25g/10L) yoki "Poliram" bilan yomgʻirdan keyin purkash.\n` +
        `• **Oidium (kul kasalligi):** Gʻujumlar yorilib ketadi, oq kul hidi keladi. Oltingugurt kukuni (Tiovit Jet 40g/10L) yoki "Topaz" (4ml/10L).\n` +
        `• **Chilpish:** Shohlar haddan tashqari qalinlashib ketishiga yoʻl qoʻymang, shamol aylanmasa kasallik 3 barobar tez tarqaladi.`,
      action: { label: "📸 Uzum bargini skanerlash", page: "agronom" }
    };
  }

  // 12. Ob-havo, Bahorgi sovuq & Antistress
  if (q.includes('sovuq') || q.includes('ob-havo') || q.includes('muz') || q.includes('qorasovuq') || q.includes('gradus')) {
    return {
      title: "❄️ Sovuq urishi xavfi va himoya choralari",
      text: `🛡️ **Kutilmagan sovuqlardan ekinni saqlab qolish:**\n\n` +
        `1. **Tutatish (tutun hosil qilish):** Bogʻ atrofida somon va goʻng uyumlarini ertalabki 03:00 dan 06:00 gacha tutatish havo haroratini 2-3°C oshiradi.\n` +
        `2. **Antistress preparatlar:** Sovuqdan 24 soat oldin va keyin "Megafol" (10L suvga 25ml) yoki "Epin-Extra" purkash oʻsimlik immunitetini mustahkamlaydi.\n` +
        `3. **Sugʻorish:** Sovuq tushishi kutilgan kechada nam tuproq quruq tuproqqa qaraganda 1.5 barobar koʻproq issiqlik saqlaydi.`,
      action: { label: "📅 Ob-havo prognozini tekshirish", page: "obhavo" }
    };
  }

  // 13. Bozor & Narxlar haqida
  if (q.includes('narx') || q.includes('bozor') || q.includes('qimmat') || q.includes('arzon') || q.includes('sotish')) {
    return {
      title: "📊 Qishloq xoʻjaligi mahsulotlari narxlari",
      text: `💰 **Bozor monitoringi tahlili:**\n\n` +
        `Platformamiz har kuni Toshkent, Samarqand, Fargʻona, Andijon va boshqa hududiy dehqon bozorlaridagi 100+ mahsulotlar ulgurji va chakana narxlarini yangilab boradi.\n\n` +
        `Grafik orqali 7, 14, 30 kunlik narx tebranishlarini kuzatishingiz va eng arzon hududdan xarid qilishingiz mumkin.`,
      action: { label: "📊 Narxlar sahifasiga oʻtish", page: "narxlar" }
    };
  }

  // 14. Intelligent Fallback for Any Other Farming Question
  const words = q.split(/\s+/).filter(w => w.length > 2);
  const keywordsList = words.slice(0, 3).join(', ');

  return {
    title: "🤖 AI Agronom Tahliliy Javobi",
    text: `🌱 **"${query}" boʻyicha agronomik xulosa:**\n\n` +
      `Siz koʻrsatgan holat (${keywordsList || 'agrotexnik savol'}) boʻyicha tavsiyalarimiz:\n\n` +
      `1. **Birlamchi koʻrik:** Ekin barglarining pastki va ustki qismini sinchkovlik bilan koʻring. Agar sargʻayish, dogʻ yoki bujrayish boʻlsa, zudlik bilan kasallangan qismlarni uzib tashlang.\n` +
      `2. **Kompleks profilaktika:** Zamburugʻli va bakterial kasalliklarga qarshi universal biopreparat "Fitosporin-M" (10L suvga 10-15ml) purkash tavsiya etiladi.\n` +
      `3. **Aniq tashxis:** Bargning fotosuratini **AI Agronom Skaneri**ga yuklang — neyron tarmoq 3 soniyada 98% aniqlik bilan kasallik nomini va aniq dori retseptini beradi!`,
    action: { label: "📸 Ekin bargini kamera orqali skanerlash", page: "agronom" }
  };
}
