import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AGRO_DATA } from '../data/agroData';

// Extended rich data for regions with agricultural climate metrics
const REGION_DATA = {
  toshkent: {
    name: 'Toshkent viloyati',
    temp: 22,
    feelsLike: 23,
    condition: 'Quyoshli, ochiq havo',
    icon: '☀️',
    humidity: 46,
    soilTemp: 16,
    wind: '3.8 m/s, SHQ',
    rainProb: 10,
    uvIndex: '4 (Oʻrtacha)',
    riskLevel: 'safe', // safe, warning, alert
    riskTitle: 'Barqaror iqlim sharoiti',
    riskText: 'Kuzgi shudgorlash va bugʻdoy ekish uchun eng qulay ob-havo hukm surmoqda. Ertalabki shudring ekinlarga tabiiy namlik beradi.',
    forecast: [
      { day: 'Bugun', date: '17-Okt', icon: '☀️', tDay: '+22°', tNight: '+11°', rain: '10%', status: 'Ekish uchun ideal' },
      { day: 'Ertaga', date: '18-Okt', icon: '🌤️', tDay: '+23°', tNight: '+12°', rain: '15%', status: 'Dori sepishga mos' },
      { day: 'Dush', date: '19-Okt', icon: '⛅', tDay: '+21°', tNight: '+10°', rain: '20%', status: 'Moʻtadil sharoit' },
      { day: 'Sesh', date: '20-Okt', icon: '🌧️', tDay: '+18°', tNight: '+9°', rain: '75%', status: 'Yomgʻir kutilmoqda' },
      { day: 'Chor', date: '21-Okt', icon: '🌤️', tDay: '+19°', tNight: '+8°', rain: '25%', status: 'Tuproqni yumshatish' },
      { day: 'Pay', date: '22-Okt', icon: '☀️', tDay: '+21°', tNight: '+10°', rain: '5%', status: 'Oʻgʻitlashga mos' },
      { day: 'Jum', date: '23-Okt', icon: '☀️', tDay: '+23°', tNight: '+11°', rain: '0%', status: 'Qulay va iliq' }
    ]
  },
  samarqand: {
    name: 'Samarqand viloyati',
    temp: 21,
    feelsLike: 22,
    condition: 'Ochiq, biroz bulutli',
    icon: '🌤️',
    humidity: 42,
    soilTemp: 15,
    wind: '4.2 m/s, SH',
    rainProb: 15,
    uvIndex: '5 (Oʻrtacha)',
    riskLevel: 'safe',
    riskTitle: 'Qulay agrometeorologik holat',
    riskText: 'Havo harorati meʼyorda, tuproq harorati urugʻ ildiz otishi uchun maqbul. Kechki sabzavotlar parvarishiga eʼtibor qarating.',
    forecast: [
      { day: 'Bugun', date: '17-Okt', icon: '🌤️', tDay: '+21°', tNight: '+10°', rain: '15%', status: 'Hosildorlikka qulay' },
      { day: 'Ertaga', date: '18-Okt', icon: '☀️', tDay: '+22°', tNight: '+11°', rain: '10%', status: 'Ekishga mos' },
      { day: 'Dush', date: '19-Okt', icon: '⛅', tDay: '+20°', tNight: '+9°', rain: '25%', status: 'Sugʻorish tavsiya' },
      { day: 'Sesh', date: '20-Okt', icon: '🌧️', tDay: '+17°', tNight: '+8°', rain: '65%', status: 'Qisqa muddatli yomgʻir' },
      { day: 'Chor', date: '21-Okt', icon: '🌤️', tDay: '+19°', tNight: '+7°', rain: '20%', status: 'Salqin havo' },
      { day: 'Pay', date: '22-Okt', icon: '☀️', tDay: '+21°', tNight: '+9°', rain: '5%', status: 'Optimal agromaslahat' },
      { day: 'Jum', date: '23-Okt', icon: '☀️', tDay: '+22°', tNight: '+10°', rain: '0%', status: 'Iliq quyoshli' }
    ]
  },
  fargona: {
    name: 'Fargʻona viloyati',
    temp: 23,
    feelsLike: 24,
    condition: 'Iliq quyoshli',
    icon: '☀️',
    humidity: 49,
    soilTemp: 17,
    wind: '2.5 m/s, J',
    rainProb: 5,
    uvIndex: '4 (Oʻrtacha)',
    riskLevel: 'safe',
    riskTitle: 'Meva va gʻallaga mos iqlim',
    riskText: 'Vodiy boʻylab tinch va iliq ob-havo. Bogʻlarda hosilni toʻliq yigʻib olish va daraxtlarga shakl berish uchun ajoyib fursat.',
    forecast: [
      { day: 'Bugun', date: '17-Okt', icon: '☀️', tDay: '+23°', tNight: '+12°', rain: '5%', status: 'Yigʻim-terimga mos' },
      { day: 'Ertaga', date: '18-Okt', icon: '☀️', tDay: '+24°', tNight: '+13°', rain: '5%', status: 'Aʼlo darajada' },
      { day: 'Dush', date: '19-Okt', icon: '🌤️', tDay: '+22°', tNight: '+11°', rain: '15%', status: 'Dori purkashga qulay' },
      { day: 'Sesh', date: '20-Okt', icon: '⛅', tDay: '+20°', tNight: '+10°', rain: '35%', status: 'Biroz bulutli' },
      { day: 'Chor', date: '21-Okt', icon: '🌤️', tDay: '+21°', tNight: '+9°', rain: '10%', status: 'Oʻgʻit berish' },
      { day: 'Pay', date: '22-Okt', icon: '☀️', tDay: '+23°', tNight: '+11°', rain: '0%', status: 'Iliq havo' },
      { day: 'Jum', date: '23-Okt', icon: '☀️', tDay: '+24°', tNight: '+12°', rain: '0%', status: 'Bogʻdorchilik kuni' }
    ]
  },
  andijon: {
    name: 'Andijon viloyati',
    temp: 22,
    feelsLike: 23,
    condition: 'Ochiq havo',
    icon: '☀️',
    humidity: 52,
    soilTemp: 16,
    wind: '2.8 m/s, SH',
    rainProb: 10,
    uvIndex: '4 (Oʻrtacha)',
    riskLevel: 'warning',
    riskTitle: 'Tungi harorat pasayishi',
    riskText: 'Kuzda kechalari harorat keskin pasayishi mumkin (+7°C). Nozik issiqsevar ekinlarni plyonka ostida saqlash tavsiya etiladi.',
    forecast: [
      { day: 'Bugun', date: '17-Okt', icon: '☀️', tDay: '+22°', tNight: '+11°', rain: '10%', status: 'Qulay ob-havo' },
      { day: 'Ertaga', date: '18-Okt', icon: '🌤️', tDay: '+23°', tNight: '+11°', rain: '10%', status: 'Kuzgi ekish' },
      { day: 'Dush', date: '19-Okt', icon: '⛅', tDay: '+21°', tNight: '+9°', rain: '20%', status: 'Harorat pasayishi' },
      { day: 'Sesh', date: '20-Okt', icon: '🌧️', tDay: '+18°', tNight: '+7°', rain: '60%', status: 'Yogʻingarchilik' },
      { day: 'Chor', date: '21-Okt', icon: '🌤️', tDay: '+19°', tNight: '+7°', rain: '15%', status: 'Tunlari salqin' },
      { day: 'Pay', date: '22-Okt', icon: '☀️', tDay: '+21°', tNight: '+9°', rain: '5%', status: 'Ochiq osmon' },
      { day: 'Jum', date: '23-Okt', icon: '☀️', tDay: '+22°', tNight: '+10°', rain: '0%', status: 'Optimal sharoit' }
    ]
  },
  namangan: {
    name: 'Namangan viloyati',
    temp: 21,
    feelsLike: 21,
    condition: 'Biroz bulutli',
    icon: '⛅',
    humidity: 54,
    soilTemp: 15,
    wind: '3.4 m/s, SH',
    rainProb: 20,
    uvIndex: '4 (Oʻrtacha)',
    riskLevel: 'safe',
    riskTitle: 'Moʻtadil namlik darajasi',
    riskText: 'Togʻoldi zonalarida namlik yuqori boʻlib, kuzgi ekinlar unib chiqishiga ijobiy taʼsir koʻrsatadi.',
    forecast: [
      { day: 'Bugun', date: '17-Okt', icon: '⛅', tDay: '+21°', tNight: '+10°', rain: '20%', status: 'Unib chiqishga mos' },
      { day: 'Ertaga', date: '18-Okt', icon: '🌤️', tDay: '+22°', tNight: '+11°', rain: '15%', status: 'Dala ishlari' },
      { day: 'Dush', date: '19-Okt', icon: '⛅', tDay: '+20°', tNight: '+9°', rain: '25%', status: 'Bulutli havo' },
      { day: 'Sesh', date: '20-Okt', icon: '🌧️', tDay: '+17°', tNight: '+8°', rain: '70%', status: 'Yomgʻir ehtimoli' },
      { day: 'Chor', date: '21-Okt', icon: '🌤️', tDay: '+19°', tNight: '+8°', rain: '15%', status: 'Nam tuproq' },
      { day: 'Pay', date: '22-Okt', icon: '☀️', tDay: '+21°', tNight: '+9°', rain: '5%', status: 'Quyoshli kun' },
      { day: 'Jum', date: '23-Okt', icon: '☀️', tDay: '+22°', tNight: '+10°', rain: '0%', status: 'Tinch ob-havo' }
    ]
  },
  buxoro: {
    name: 'Buxoro viloyati',
    temp: 25,
    feelsLike: 26,
    condition: 'Quyoshli, quruq havo',
    icon: '☀️',
    humidity: 32,
    soilTemp: 19,
    wind: '5.1 m/s, Gʻ',
    rainProb: 0,
    uvIndex: '5 (Oʻrtacha)',
    riskLevel: 'warning',
    riskTitle: 'Past tuproq namligi',
    riskText: 'Havo va tuproqda quruqlik yuqori. Yangi ekilgan maydonlarni meʼyorida sugʻorish va namlikni saqlovchi mulchalash zarur.',
    forecast: [
      { day: 'Bugun', date: '17-Okt', icon: '☀️', tDay: '+25°', tNight: '+12°', rain: '0%', status: 'Sugʻorish zarur' },
      { day: 'Ertaga', date: '18-Okt', icon: '☀️', tDay: '+26°', tNight: '+13°', rain: '0%', status: 'Quruq ob-havo' },
      { day: 'Dush', date: '19-Okt', icon: '🌤️', tDay: '+24°', tNight: '+11°', rain: '5%', status: 'Ekish ishlari' },
      { day: 'Sesh', date: '20-Okt', icon: '⛅', tDay: '+22°', tNight: '+10°', rain: '15%', status: 'Shamolli kun' },
      { day: 'Chor', date: '21-Okt', icon: '☀️', tDay: '+23°', tNight: '+9°', rain: '0%', status: 'Ochiq havo' },
      { day: 'Pay', date: '22-Okt', icon: '☀️', tDay: '+25°', tNight: '+11°', rain: '0%', status: 'Iliq kun' },
      { day: 'Jum', date: '23-Okt', icon: '☀️', tDay: '+26°', tNight: '+12°', rain: '0%', status: 'Dala ishlari' }
    ]
  },
  qashqadaryo: {
    name: 'Qashqadaryo viloyati',
    temp: 24,
    feelsLike: 25,
    condition: 'Quyoshli, ochiq',
    icon: '☀️',
    humidity: 36,
    soilTemp: 18,
    wind: '4.5 m/s, J-Gʻ',
    rainProb: 5,
    uvIndex: '5 (Oʻrtacha)',
    riskLevel: 'safe',
    riskTitle: 'Optimal gʻallachilik davri',
    riskText: 'Kuzgi bugʻdoy ekish uchun tuproq harorati ayni muddao. Seyalka va traktorlar bilan maydonlarni qamrab olish tavsiya etiladi.',
    forecast: [
      { day: 'Bugun', date: '17-Okt', icon: '☀️', tDay: '+24°', tNight: '+12°', rain: '5%', status: 'Gʻallaga aʼlo' },
      { day: 'Ertaga', date: '18-Okt', icon: '☀️', tDay: '+25°', tNight: '+13°', rain: '5%', status: 'Faol ekish' },
      { day: 'Dush', date: '19-Okt', icon: '🌤️', tDay: '+23°', tNight: '+11°', rain: '10%', status: 'Moʻtadil' },
      { day: 'Sesh', date: '20-Okt', icon: '⛅', tDay: '+21°', tNight: '+10°', rain: '20%', status: 'Bulutlanish' },
      { day: 'Chor', date: '21-Okt', icon: '☀️', tDay: '+22°', tNight: '+9°', rain: '0%', status: 'Ochiq havo' },
      { day: 'Pay', date: '22-Okt', icon: '☀️', tDay: '+24°', tNight: '+11°', rain: '0%', status: 'Iliq quyoshli' },
      { day: 'Jum', date: '23-Okt', icon: '☀️', tDay: '+25°', tNight: '+12°', rain: '0%', status: 'Yuqori unumdorlik' }
    ]
  },
  surxondaryo: {
    name: 'Surxondaryo viloyati',
    temp: 27,
    feelsLike: 28,
    condition: 'Issiq, toza osmon',
    icon: '☀️',
    humidity: 30,
    soilTemp: 21,
    wind: '3.2 m/s, J',
    rainProb: 0,
    uvIndex: '6 (Yuqori)',
    riskLevel: 'safe',
    riskTitle: 'Issiq subtropik iqlim',
    riskText: 'Anor, xurmo va kechki hosillarni terishning eng qizgʻin pallasi. Ertalabki soatlarda namlikni saqlovchi sugʻorish qulay.',
    forecast: [
      { day: 'Bugun', date: '17-Okt', icon: '☀️', tDay: '+27°', tNight: '+14°', rain: '0%', status: 'Meva yigʻimiga mos' },
      { day: 'Ertaga', date: '18-Okt', icon: '☀️', tDay: '+28°', tNight: '+15°', rain: '0%', status: 'Issiq quyoshli' },
      { day: 'Dush', date: '19-Okt', icon: '☀️', tDay: '+26°', tNight: '+13°', rain: '0%', status: 'Toza osmon' },
      { day: 'Sesh', date: '20-Okt', icon: '🌤️', tDay: '+24°', tNight: '+12°', rain: '10%', status: 'Biroz salqin' },
      { day: 'Chor', date: '21-Okt', icon: '☀️', tDay: '+25°', tNight: '+11°', rain: '0%', status: 'Optimal harorat' },
      { day: 'Pay', date: '22-Okt', icon: '☀️', tDay: '+27°', tNight: '+13°', rain: '0%', status: 'Issiq havo' },
      { day: 'Jum', date: '23-Okt', icon: '☀️', tDay: '+28°', tNight: '+14°', rain: '0%', status: 'Dala ishlari' }
    ]
  },
  xorazm: {
    name: 'Xorazm viloyati',
    temp: 19,
    feelsLike: 18,
    condition: 'Salqin, shamolli',
    icon: '💨',
    humidity: 45,
    soilTemp: 14,
    wind: '6.2 m/s, SH-Gʻ',
    rainProb: 15,
    uvIndex: '3 (Past)',
    riskLevel: 'warning',
    riskTitle: 'Kuchli shamol va shudgorlash',
    riskText: 'Shamol tezligi 6-8 m/s gacha yetishi mumkin. Dori purkash ishlarini shamol tinchiganda, erta tongda bajaring.',
    forecast: [
      { day: 'Bugun', date: '17-Okt', icon: '💨', tDay: '+19°', tNight: '+8°', rain: '15%', status: 'Dori sepmang' },
      { day: 'Ertaga', date: '18-Okt', icon: '🌤️', tDay: '+20°', tNight: '+9°', rain: '10%', status: 'Shudgorlashga mos' },
      { day: 'Dush', date: '19-Okt', icon: '⛅', tDay: '+18°', tNight: '+7°', rain: '20%', status: 'Salqin havo' },
      { day: 'Sesh', date: '20-Okt', icon: '🌧️', tDay: '+15°', tNight: '+5°', rain: '65%', status: 'Yomgʻir va shamol' },
      { day: 'Chor', date: '21-Okt', icon: '🌤️', tDay: '+17°', tNight: '+6°', rain: '10%', status: 'Tinchlanish' },
      { day: 'Pay', date: '22-Okt', icon: '☀️', tDay: '+19°', tNight: '+7°', rain: '0%', status: 'Ochiq quyoshli' },
      { day: 'Jum', date: '23-Okt', icon: '☀️', tDay: '+20°', tNight: '+8°', rain: '0%', status: 'Dala ishlari' }
    ]
  },
  qoraqalpogiston: {
    name: 'Qoraqalpogʻiston Resp.',
    temp: 18,
    feelsLike: 17,
    condition: 'Salqin, ochiq havo',
    icon: '🌤️',
    humidity: 43,
    soilTemp: 13,
    wind: '5.6 m/s, SH',
    rainProb: 10,
    uvIndex: '3 (Past)',
    riskLevel: 'warning',
    riskTitle: 'Erta sovuq xavfi',
    riskText: 'Tungi harorat +4°C gacha tushishi ehtimoli bor. Qishloq xoʻjaligi texnikalarini qishki saqlashga tayyorlang.',
    forecast: [
      { day: 'Bugun', date: '17-Okt', icon: '🌤️', tDay: '+18°', tNight: '+7°', rain: '10%', status: 'Texnika taʼmiri' },
      { day: 'Ertaga', date: '18-Okt', icon: '🌤️', tDay: '+19°', tNight: '+8°', rain: '10%', status: 'Hosil yakuni' },
      { day: 'Dush', date: '19-Okt', icon: '⛅', tDay: '+17°', tNight: '+6°', rain: '25%', status: 'Salqin shamol' },
      { day: 'Sesh', date: '20-Okt', icon: '🌧️', tDay: '+14°', tNight: '+4°', rain: '70%', status: 'Tungi sovuq' },
      { day: 'Chor', date: '21-Okt', icon: '🌤️', tDay: '+16°', tNight: '+5°', rain: '15%', status: 'Salqin kun' },
      { day: 'Pay', date: '22-Okt', icon: '☀️', tDay: '+18°', tNight: '+6°', rain: '0%', status: 'Ochiq havo' },
      { day: 'Jum', date: '23-Okt', icon: '☀️', tDay: '+19°', tNight: '+7°', rain: '0%', status: 'Qulay sharoit' }
    ]
  }
};

// Extended agronomic crop calendar with detailed monthly tasks
const CROPS_DATA = {
  bugdoy: {
    name: 'Bugʻdoy (Kuzgi don)',
    emoji: '🌾',
    type: 'Don ekini',
    depth: '4-5 sm',
    seedRate: '220-250 kg/ga',
    plantMonths: [8, 9, 10], // Sentabr, Oktabr, Noyabr
    waterMonths: [2, 3, 4], // Mart, Aprel, May
    fertilizeMonths: [1, 2, 8, 9],
    harvestMonths: [5, 6], // Iyun, Iyul
    phases: {
      9: {
        title: 'Oktabr — Kuzgi ekish va dastlabki unib chiqish',
        stage: 'Ekish va maysa unishi',
        tasks: [
          'Urugʻlikni ekishdan oldin fungitsidlar bilan dorilash (qorakuya kasalligiga qarshi)',
          'Ekish chuqurligi: 4-5 sm, nam tuproqqa qadash',
          'Asosiy oʻgʻit sifatida fosforli (Ammofos 150 kg/ga) va kaliyli oʻgʻit solish',
          'Urugʻ unib chiqqandan soʻng begona oʻtlar paydo boʻlishini kuzatish'
        ],
        idealSoilTemp: '14-16°C',
        waterAdvice: 'Ekisholdi yoki maysa unib chiqqandan keyin birinchi sugʻorish (yondirish suvi)'
      },
      5: {
        title: 'Iyun — Don toʻlishishi va gʻalla oʻrimi',
        stage: 'Toʻliq pishish va yigʻim-terim',
        tasks: [
          'Don namligini oʻlchash (optimal 13-14%)',
          'Kombaynlarni gʻalla oʻrimiga toʻliq sozlash va yoʻqotishlarni kamaytirish',
          'Somonni daladan tozalash yoki maydalab tuproqqa aralashtirish',
          'Takroriy ekin (makkajoʻxori, mosh, sabzavot) uchun yerni zudlik bilan tayyorlash'
        ],
        idealSoilTemp: '24-28°C',
        waterAdvice: 'Oʻrimdan 10 kun oldin sugʻorishni butunlay toʻxtatish'
      }
    }
  },
  paxta: {
    name: 'Paxta (Gʻoʻza)',
    emoji: '🌱',
    type: 'Texnika ekini',
    depth: '4-6 sm',
    seedRate: '60-80 kg/ga',
    plantMonths: [3, 4], // Aprel, May
    waterMonths: [5, 6, 7], // Iyun, Iyul, Avgust
    fertilizeMonths: [4, 5, 6],
    harvestMonths: [8, 9], // Sentabr, Oktabr
    phases: {
      9: {
        title: 'Oktabr — Terimning asosiy yakuniy bosqichi',
        stage: 'Paxta terimi va gʻoʻzapoyani yulish',
        tasks: [
          'Paxta xomashyosining 2-3 terimini sifatli yakunlash',
          'Defoliatsiya qilingan maydonlarda terim mashinalaridan unumli foydalanish',
          'Gʻoʻzapoyani yulish va maydalash agregatlarini ishga tushirish',
          'Kelgusi yil hosili uchun yerni chuqur haydashga tayyorlash'
        ],
        idealSoilTemp: '16-18°C',
        waterAdvice: 'Sugʻorish toʻliq yakunlangan'
      },
      3: {
        title: 'Aprel — Chigit ekish va qator oralariga ishlov berish',
        stage: 'Chigit ekish',
        tasks: [
          'Tuproq harorati 12-14°C ga yetganda chigit qadash',
          'Kultivatorlar bilan qator oralarini yumshatish',
          'Zararkunandalarga (shira, trips) qarshi dastlabki profilaktika'
        ],
        idealSoilTemp: '12-14°C',
        waterAdvice: 'Unib chiqishni tezlashtiruvchi namlagich sugʻorish'
      }
    }
  },
  makkajoxori: {
    name: 'Makkajoʻxori',
    emoji: '🌽',
    type: 'Don va silos ekini',
    depth: '6-8 sm',
    seedRate: '25-30 kg/ga',
    plantMonths: [3, 4, 5],
    waterMonths: [5, 6, 7],
    fertilizeMonths: [4, 5, 6],
    harvestMonths: [7, 8, 9],
    phases: {
      9: {
        title: 'Oktabr — Kechki va takroriy makkajoʻxori yigʻimi',
        stage: 'Silos va don yigʻim-terimi',
        tasks: [
          'Takroriy makkajoʻxorining sut-mum pishish davrida silosga oʻrish',
          'Don uchun ekilgan maydonlarda namlikni tekshirib terish',
          'Hosilni quritish omborlariga joylashtirish'
        ],
        idealSoilTemp: '15-18°C',
        waterAdvice: 'Sugʻorish toʻxtatilgan'
      }
    }
  },
  sabzavot: {
    name: 'Pomidor & Sabzavotlar',
    emoji: '🍅',
    type: 'Poliz va sabzavot',
    depth: '1-2 sm (koʻchat)',
    seedRate: '0.4-0.6 kg/ga',
    plantMonths: [2, 3, 4],
    waterMonths: [4, 5, 6, 7],
    fertilizeMonths: [3, 4, 5, 6],
    harvestMonths: [6, 7, 8, 9],
    phases: {
      9: {
        title: 'Oktabr — Kechki hosilni terish va issiqxonalarga koʻchirish',
        stage: 'Ochiq dalada hosil yakuni',
        tasks: [
          'Sovuq tushguncha yetilgan va pishmagan pomidorlarni terib saralash',
          'Ildiz qoldiqlarini va kasallangan palaklarni daladan yoqib yoʻqotish',
          'Issiqxonalarda qishki pomidor-bodring koʻchatlarini oʻtqazish',
          'Tuproqni organik kompost va fosfor bilan boyitish'
        ],
        idealSoilTemp: '16-18°C',
        waterAdvice: 'Kam miqdorda tomchilatib sugʻorish'
      }
    }
  },
  kartoshka: {
    name: 'Kartoshka',
    emoji: '🥔',
    type: 'Tugunak ekin',
    depth: '8-10 sm',
    seedRate: '2500-3000 kg/ga',
    plantMonths: [1, 2, 6], // Bahorgi va takroriy yozgi
    waterMonths: [3, 4, 7, 8],
    fertilizeMonths: [2, 3, 7],
    harvestMonths: [4, 5, 9, 10], // Oktabrda takroriy kartoshka
    phases: {
      9: {
        title: 'Oktabr — Takroriy kartoshkani toʻliq qazib olish',
        stage: 'Tugunaklar yigʻimi va saralash',
        tasks: [
          'Tugunaklarni poʻsti qattiqlashgach qazib olish',
          'Quyoshda 2-3 soat quritib, yaralanganlaridan saralash',
          'Urugʻlik kartoshkani yashil rangga keltirish (koʻkartirish)',
          'Omborxonalarda +3°C ... +5°C harorat rejimini taʼminlash'
        ],
        idealSoilTemp: '14-17°C',
        waterAdvice: 'Qazishdan 12-14 kun oldin suv toʻxtatiladi'
      }
    }
  },
  meva: {
    name: 'Olma & Bogʻdorchilik',
    emoji: '🍎',
    type: 'Koʻp yillik meva',
    depth: 'Koʻchat ekish: 60x60 sm',
    seedRate: '400-600 daraxt/ga',
    plantMonths: [2, 3, 10, 11], // Bahorgi va kuzgi koʻchat
    waterMonths: [4, 5, 6, 7],
    fertilizeMonths: [2, 3, 9, 10],
    harvestMonths: [6, 7, 8, 9],
    phases: {
      9: {
        title: 'Oktabr — Kuzgi parvarish va bogʻlarni qishga tayyorlash',
        stage: 'Hosil yakuni va daraxtlarni oziqlantirish',
        tasks: [
          'Kechki olma va nok navlarini terib omborlarga joylash',
          'Daraxt tanalarini ohak va temir kuporosi bilan oqlash',
          'Qurigan va kasallangan shoxlarni kesib (sanitar butash) olib tashlash',
          'Daraxt tubiga chirigan goʻng va fosfor-kaliyli oʻgʻit solib haydash'
        ],
        idealSoilTemp: '14-16°C',
        waterAdvice: 'Qisholdi toʻyintirib sugʻorish (yaxob suvi)ga tayyorgarlik'
      }
    }
  }
};

export default function ObHavoPage({ onShowToast }) {
  const { t } = useLanguage();
  const [regionKey, setRegionKey] = useState('toshkent');
  const [cropKey, setCropKey] = useState('bugdoy');
  const [selectedMonth, setSelectedMonth] = useState(9); // Default: Oktabr (index 9)
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [subPhone, setSubPhone] = useState('');

  const region = REGION_DATA[regionKey] || REGION_DATA.toshkent;
  const crop = CROPS_DATA[cropKey] || CROPS_DATA.bugdoy;

  // Active month info
  const activeMonthName = AGRO_DATA.monthsFull[selectedMonth];
  const monthPhase = crop.phases && crop.phases[selectedMonth] 
    ? crop.phases[selectedMonth] 
    : {
        title: `${activeMonthName} — ${crop.name} parvarishi`,
        stage: 'Mavsumiy agrotexnik bosqich',
        tasks: [
          `${crop.name} uchun belgilangan agrotexnik qoidalarga rioya qilish`,
          'Tuproq namligi va haroratini nazorat qilib borish',
          'Begona oʻtlar va kasalliklar profilaktikasini oʻtkazish',
          'Mutaxassis agronom tavsiyalariga binoan oziqlantirish'
        ],
        idealSoilTemp: '15-20°C',
        waterAdvice: 'Tuproq namligiga qarab navbatdagi sugʻorish meʼyori'
      };

  const handleSubSubmit = (e) => {
    e.preventDefault();
    if (subPhone.trim()) {
      if (onShowToast) {
        onShowToast(`${region.name} boʻyicha tezkor agrometeorologik xabarnoma faollashtirildi ✓`);
      }
      setSubModalOpen(false);
      setSubPhone('');
    }
  };

  return (
    <main id="top">
      <section id="obhavo" className="section">
        <div className="container">
          
          {/* Header */}
          <div className="section-head">
            <span className="kicker">{t('weather_kicker')}</span>
            <h2>{t('weather_title')}</h2>
            <p className="lead">
              {t('weather_lead')}
            </p>
          </div>

          {/* Quick Region Selector Pills */}
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px', 
              marginBottom: '20px' 
            }}
          >
            {Object.keys(REGION_DATA).map((rKey) => (
              <button
                key={rKey}
                type="button"
                className={`chip ${regionKey === rKey ? 'active' : ''}`}
                onClick={() => setRegionKey(rKey)}
              >
                {REGION_DATA[rKey].name}
              </button>
            ))}
          </div>

          {/* Top Selection Grid (Viloyat + Ekin turi) */}
          <div 
            className="chart-box" 
            style={{ 
              background: '#fff', 
              borderRadius: 'var(--radius)', 
              boxShadow: 'var(--shadow-sm)', 
              border: '1px solid var(--border-color)', 
              padding: '24px',
              marginBottom: '24px'
            }}
          >
            <div className="form-grid" style={{ marginBottom: 0 }}>
              <div className="field">
                <label htmlFor="weRegion" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                  Viloyatni tanlang
                </label>
                <select 
                  id="weRegion"
                  value={regionKey}
                  onChange={(e) => setRegionKey(e.target.value)}
                  style={{ fontWeight: 600, fontSize: '0.92rem' }}
                >
                  {Object.keys(REGION_DATA).map((k) => (
                    <option key={k} value={k}>
                      {REGION_DATA[k].name} ({REGION_DATA[k].temp}°C, {REGION_DATA[k].condition})
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="weCrop" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                  Ekin turini tanlang
                </label>
                <select 
                  id="weCrop"
                  value={cropKey}
                  onChange={(e) => setCropKey(e.target.value)}
                  style={{ fontWeight: 600, fontSize: '0.92rem' }}
                >
                  {Object.keys(CROPS_DATA).map((k) => (
                    <option key={k} value={k}>
                      {CROPS_DATA[k].emoji} {CROPS_DATA[k].name} ({CROPS_DATA[k].type})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Regional Risk / Agronomist Alert Banner */}
          <div 
            style={{ 
              background: region.riskLevel === 'warning' ? 'var(--yellow-soft)' : 'var(--green-soft)', 
              border: `1px solid ${region.riskLevel === 'warning' ? '#edd688' : '#c3e2cb'}`, 
              borderRadius: 'var(--radius)', 
              padding: '18px 22px', 
              marginBottom: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', maxWidth: '780px' }}>
              <span style={{ fontSize: '28px', lineHeight: 1 }}>
                {region.riskLevel === 'warning' ? '⚠️' : '🌿'}
              </span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: region.riskLevel === 'warning' ? '#8c5e00' : 'var(--primary-color)' }}>
                  {region.riskTitle} — {region.name}
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-color)', marginTop: '4px', lineHeight: 1.5 }}>
                  {region.riskText}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="ag-btn ag-btn-yellow"
              style={{ padding: '9px 18px', fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap' }}
              onClick={() => setSubModalOpen(true)}
            >
              🔔 SMS ogohlantirish
            </button>
          </div>

          {/* Real-time Agro-Meteorology KPI Cards */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px', 
              marginBottom: '28px' 
            }}
          >
            {/* Card 1: Havo harorati */}
            <div className="ag-card" style={{ padding: '20px', background: '#fff' }}>
              <div className="sub" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                Havo harorati
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-color)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{region.icon}</span>
                <span>+{region.temp}°C</span>
              </div>
              <div className="sub" style={{ fontSize: '0.82rem', marginTop: '6px' }}>
                His qilinishi: +{region.feelsLike}°C • {region.condition}
              </div>
            </div>

            {/* Card 2: Tuproq harorati */}
            <div className="ag-card" style={{ padding: '20px', background: '#fff' }}>
              <div className="sub" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                🌱 Tuproq harorati (+10 sm)
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-color)', marginTop: '4px' }}>
                +{region.soilTemp}°C
              </div>
              <div className="sub" style={{ fontSize: '0.82rem', marginTop: '6px' }}>
                Ildiz otish va urugʻ unishi uchun: <strong style={{ color: 'var(--primary-color)' }}>Optimal</strong>
              </div>
            </div>

            {/* Card 3: Havoning namligi */}
            <div className="ag-card" style={{ padding: '20px', background: '#fff' }}>
              <div className="sub" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                💧 Havo namligi
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary-color)', marginTop: '4px' }}>
                {region.humidity}%
              </div>
              <div className="sub" style={{ fontSize: '0.82rem', marginTop: '6px' }}>
                Yogʻingarchilik ehtimoli: <strong>{region.rainProb}%</strong>
              </div>
            </div>

            {/* Card 4: Shamol tezligi */}
            <div className="ag-card" style={{ padding: '20px', background: '#fff' }}>
              <div className="sub" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                💨 Shamol tezligi
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-color)', marginTop: '4px' }}>
                {region.wind}
              </div>
              <div className="sub" style={{ fontSize: '0.82rem', marginTop: '6px' }}>
                Dori sepish va purkash uchun: <strong style={{ color: 'var(--primary-color)' }}>Qulay</strong>
              </div>
            </div>
          </div>

          {/* 7-Day Agricultural Forecast Cards */}
          <div 
            className="chart-box" 
            style={{ 
              background: '#fff', 
              borderRadius: 'var(--radius)', 
              boxShadow: 'var(--shadow-sm)', 
              border: '1px solid var(--border-color)', 
              padding: '24px',
              marginBottom: '32px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  📅 7 kunlik agrometeorologik prognoz ({region.name})
                </h3>
                <p className="sub" style={{ fontSize: '0.82rem', marginTop: '2px' }}>
                  Ekish, sugʻorish va profilaktika uchun tavsiyalar bilan
                </p>
              </div>
              <span className="tag tag-green">
                Haftalik reja
              </span>
            </div>

            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
                gap: '12px' 
              }}
            >
              {region.forecast.map((fc, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: idx === 0 ? 'var(--green-soft)' : 'var(--background-color)',
                    border: idx === 0 ? '1.5px solid var(--primary-color)' : '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '14px 10px',
                    textAlign: 'center',
                    transition: '0.2s'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: idx === 0 ? 'var(--primary-dark)' : 'var(--text-color)' }}>
                    {fc.day}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted-color)', marginBottom: '8px' }}>
                    {fc.date}
                  </div>
                  <div style={{ fontSize: '28px', margin: '4px 0' }}>
                    {fc.icon}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-color)' }}>
                    {fc.tDay} <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)', fontWeight: 500 }}>{fc.tNight}</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--secondary-color)', fontWeight: 700, margin: '4px 0' }}>
                    💧 {fc.rain}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: idx === 0 ? 'var(--primary-dark)' : '#4a5d52', fontWeight: 600, marginTop: '6px', background: '#fff', padding: '4px 6px', borderRadius: '6px', border: '1px solid #e1ebe3' }}>
                    {fc.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive 12-Month Agro-Calendar Section */}
          <div 
            className="chart-box" 
            style={{ 
              background: '#fff', 
              borderRadius: 'var(--radius)', 
              boxShadow: 'var(--shadow-sm)', 
              border: '1px solid var(--border-color)', 
              padding: '26px' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  {crop.emoji} {crop.name} — 12 oylik agrotexnik kalendar
                </h3>
                <p className="sub" style={{ fontSize: '0.85rem', marginTop: '2px' }}>
                  Kerakli oyni bosing va oʻsha oy boʻyicha batafsil agronom tavsiyalarini koʻring.
                </p>
              </div>
              <span className="tag tag-yellow">
                Chuqurligi: {crop.depth} • Meʼyori: {crop.seedRate}
              </span>
            </div>

            {/* Month grid with interactive click */}
            <div className="month-grid" id="monthGrid">
              {AGRO_DATA.months.map((mn, idx) => {
                let cls = '';
                let ico = '❄️';
                let actionLabel = 'Tinchlik';

                if (crop.harvestMonths.includes(idx)) {
                  cls = 'm-harvest';
                  ico = '🌾';
                  actionLabel = 'Yigʻim-terim';
                } else if (crop.plantMonths.includes(idx)) {
                  cls = 'm-plant';
                  ico = '🌱';
                  actionLabel = 'Ekish davri';
                } else if (crop.waterMonths.includes(idx)) {
                  cls = 'm-water';
                  ico = '💧';
                  actionLabel = 'Faol sugʻorish';
                } else if (crop.fertilizeMonths && crop.fertilizeMonths.includes(idx)) {
                  cls = 'm-water';
                  ico = '🧪';
                  actionLabel = 'Oziqlantirish';
                }

                const isSelected = selectedMonth === idx;

                return (
                  <div 
                    key={idx} 
                    className="month-col"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedMonth(idx)}
                  >
                    <div 
                      className="month-name" 
                      style={{ 
                        fontWeight: isSelected ? 800 : 600,
                        color: isSelected ? 'var(--primary-color)' : 'var(--muted-color)'
                      }}
                    >
                      {mn} {isSelected ? '●' : ''}
                    </div>
                    <div 
                      className={`month-cell ${cls}`} 
                      title={`${AGRO_DATA.monthsFull[idx]}: ${actionLabel}`}
                      style={{
                        transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                        boxShadow: isSelected ? '0 0 0 3px var(--primary-color)' : 'none',
                        transition: '0.2s'
                      }}
                    >
                      {ico}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="row" style={{ marginTop: '20px', gap: '16px', flexWrap: 'wrap', fontSize: '0.85rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="month-cell m-plant" style={{ width: '22px', height: '22px', fontSize: '11px' }}>🌱</span>
                <span>Ekish mavsumi</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="month-cell m-water" style={{ width: '22px', height: '22px', fontSize: '11px' }}>💧</span>
                <span>Sugʻorish va oʻgʻitlash</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="month-cell m-harvest" style={{ width: '22px', height: '22px', fontSize: '11px' }}>🌾</span>
                <span>Yigʻim-terim (hosil)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="month-cell" style={{ width: '22px', height: '22px', fontSize: '11px', background: '#eef3ee' }}>❄️</span>
                <span>Tinchlik / Yer tayyorlash</span>
              </div>
            </div>

            {/* Selected Month Detailed Agronomic Action Checklist */}
            <div 
              style={{ 
                marginTop: '22px', 
                background: 'var(--background-color)', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius)', 
                padding: '20px' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-dark)', margin: 0 }}>
                  📋 {monthPhase.title}
                </h4>
                <span className="tag tag-green">
                  Bosqich: {monthPhase.stage}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '12px' }}>
                {/* Left: Tasks */}
                <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', color: 'var(--text-color)' }}>
                    ✅ {activeMonthName} oyi uchun agrotexnik vazifalar:
                  </div>
                  <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-color)' }}>
                    {monthPhase.tasks.map((task, tidx) => (
                      <li key={tidx} style={{ marginBottom: '6px' }}>{task}</li>
                    ))}
                  </ul>
                </div>

                {/* Right: Specific Advice */}
                <div style={{ background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', color: 'var(--text-color)' }}>
                    💡 Agro-parametrlar va tavsiyalar:
                  </div>
                  <div style={{ fontSize: '0.86rem', lineHeight: 1.6 }}>
                    <div style={{ marginBottom: '8px' }}>
                      <strong style={{ color: 'var(--primary-color)' }}>🌱 Optimal tuproq harorati:</strong> {monthPhase.idealSoilTemp}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <strong style={{ color: 'var(--secondary-color)' }}>💧 Sugʻorish meʼyori:</strong> {monthPhase.waterAdvice}
                    </div>
                    <div>
                      <strong style={{ color: '#8c5e00' }}>🛡️ Ekin himoyasi:</strong> Harorat oʻzgarishi va kasalliklarga qarshi erta profilaktika oʻtkazing.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Weather Alert Subscription Modal */}
      {subModalOpen && (
        <div 
          className="ag-overlay open" 
          onClick={() => setSubModalOpen(false)}
          role="dialog" 
          aria-label="Ob-havo xabarnomasi"
        >
          <div 
            className="cart-panel" 
            style={{ maxWidth: '420px', height: 'auto', maxHeight: '90vh', borderRadius: 'var(--radius)', margin: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="row" style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>🔔 Agrometeorologik xabarnoma</h3>
              <button 
                type="button" 
                onClick={() => setSubModalOpen(false)} 
                style={{ fontSize: '22px', border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p className="sub" style={{ fontSize: '0.88rem', marginBottom: '18px' }}>
              <strong>{region.name}</strong> boʻyicha sovuq urishi, kutilmagan yogʻingarchilik, kuchli shamol yoki qurgʻoqchilik xavfi paydo boʻlganda SMS / Telegram orqali oldindan ogohlantiramiz.
            </p>

            <form onSubmit={handleSubSubmit}>
              <div className="field" style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Tanlangan viloyat
                </label>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                  {region.name}
                </div>
              </div>

              <div className="field" style={{ marginBottom: '20px' }}>
                <label htmlFor="subPhone" style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Telefon raqamingiz yoki Telegram
                </label>
                <input
                  type="text"
                  id="subPhone"
                  placeholder="+998 90 123 45 67 yoki @username"
                  value={subPhone}
                  onChange={(e) => setSubPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="ag-btn ag-btn-green"
                style={{ width: '100%', padding: '13px', fontWeight: 700 }}
              >
                Ogohlantirishlarga obuna boʻlish
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
