import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AGRO_DATA } from '../data/agroData';
import { MONTH_NAMES_UZ, MONTHS_FULL_UZ, WEEKDAYS_SHORT_UZ, getTodayFormatted, getTodayShortDate } from '../utils/helpers';

// Helper to parse WMO weather code into Uzbek weather description, emoji, and agricultural advice
export function parseWmoWeather(code) {
  if (code === 0) return { condition: 'Ochiq, musaffo osmon', icon: '☀️', status: 'Dala ishlari uchun aʼlo' };
  if (code === 1 || code === 2) return { condition: 'Qisman bulutli, iliq', icon: '🌤️', status: 'Ekish va parvarishga mos' };
  if (code === 3) return { condition: 'Bulutli havo', icon: '⛅', status: 'Moʻtadil sharoit' };
  if (code === 45 || code === 48) return { condition: 'Tumanli, nam havo', icon: '🌫️', status: 'Namlik yuqori' };
  if (code >= 51 && code <= 55) return { condition: 'Mayda shivalovchi yomgʻir', icon: '🌦️', status: 'Tuproq tabiiy namlanadi' };
  if (code >= 61 && code <= 65) return { condition: 'Yomgʻirli havo', icon: '🌧️', status: 'Sugʻorish talab etilmaydi' };
  if (code >= 71 && code <= 77) return { condition: 'Qor yogʻishi', icon: '🌨️', status: 'Ekinlarni sovuqdan asrang' };
  if (code >= 80 && code <= 82) return { condition: 'Kuchli yomgʻir / jala', icon: '⛈️', status: 'Dala ishlarini kechiktiring' };
  if (code >= 95) return { condition: 'Momaqaldiroq va yashin', icon: '⚡', status: 'Ochiq dalada boʻlmang' };
  return { condition: 'Moʻtadil ob-havo', icon: '🌤️', status: 'Mavsumiy agrotadbirlar' };
}

// Generates 7-day daily forecast based strictly on current actual dates (new Date())
export function generateDynamicForecast(baseTemp = 15, baseRain = 10) {
  const forecast = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    let dayName = 'Bugun';
    if (i === 1) dayName = 'Ertaga';
    else if (i > 1) dayName = WEEKDAYS_SHORT_UZ[d.getDay()];

    const dateStr = `${d.getDate()}-${MONTH_NAMES_UZ[d.getMonth()]}`;

    const wave = Math.sin((d.getDate() + i * 2) * 0.7) * 3;
    const tDay = Math.round(baseTemp + wave);
    const tNight = Math.round(tDay - 7 - (i % 3));
    const rain = Math.max(0, Math.min(95, Math.round(baseRain + Math.cos(i * 1.5) * 20)));

    let icon = '☀️';
    let status = 'Ekish va parvarishga qulay';
    if (rain > 50) {
      icon = '🌧️';
      status = 'Yomgʻir kutilmoqda';
    } else if (rain > 20) {
      icon = '🌤️';
      status = 'Biroz bulutli, nam';
    } else if (tDay > 28) {
      icon = '☀️';
      status = 'Issiq, ertalab sugʻoring';
    } else if (tDay < 5) {
      icon = '❄️';
      status = 'Sovuq, ekinlarni asrang';
    }

    forecast.push({
      day: dayName,
      date: dateStr,
      icon,
      tDay: `${tDay > 0 ? '+' : ''}${tDay}°`,
      tNight: `${tNight > 0 ? '+' : ''}${tNight}°`,
      rain: `${rain}%`,
      status
    });
  }

  return forecast;
}

// Extended rich data for regions with agricultural climate metrics and coordinates for live data
const REGION_DATA = {
  toshkent: {
    name: 'Toshkent viloyati',
    lat: 41.2995,
    lon: 69.2401,
    defaultTemp: 14,
    defaultFeels: 13,
    defaultCondition: 'Quyoshli, ochiq havo',
    defaultIcon: '☀️',
    defaultHumidity: 46,
    defaultSoilTemp: 11,
    defaultWind: '3.8 m/s, SHQ',
    defaultRainProb: 10,
    riskLevel: 'safe',
    riskTitle: 'Barqaror iqlim sharoiti',
    riskText: 'Kuzgi shudgorlash va bugʻdoy ekish uchun eng qulay ob-havo hukm surmoqda. Ertalabki shudring ekinlarga tabiiy namlik beradi.'
  },
  samarqand: {
    name: 'Samarqand viloyati',
    lat: 39.6542,
    lon: 66.9597,
    defaultTemp: 13,
    defaultFeels: 12,
    defaultCondition: 'Ochiq, biroz bulutli',
    defaultIcon: '🌤️',
    defaultHumidity: 45,
    defaultSoilTemp: 10,
    defaultWind: '4.2 m/s, SH',
    defaultRainProb: 15,
    riskLevel: 'safe',
    riskTitle: 'Qulay agrometeorologik holat',
    riskText: 'Havo harorati meʼyorda, tuproq harorati urugʻ ildiz otishi uchun maqbul. Kechki sabzavotlar parvarishiga eʼtibor qarating.'
  },
  fargona: {
    name: 'Fargʻona viloyati',
    lat: 40.3842,
    lon: 71.7843,
    defaultTemp: 15,
    defaultFeels: 15,
    defaultCondition: 'Iliq quyoshli',
    defaultIcon: '☀️',
    defaultHumidity: 49,
    defaultSoilTemp: 12,
    defaultWind: '2.5 m/s, J',
    defaultRainProb: 5,
    riskLevel: 'safe',
    riskTitle: 'Meva va gʻallaga mos iqlim',
    riskText: 'Vodiy boʻylab tinch va iliq ob-havo. Bogʻlarda hosilni toʻliq yigʻib olish va daraxtlarga shakl berish uchun ajoyib fursat.'
  },
  andijon: {
    name: 'Andijon viloyati',
    lat: 40.7821,
    lon: 72.3442,
    defaultTemp: 14,
    defaultFeels: 13,
    defaultCondition: 'Ochiq havo',
    defaultIcon: '☀️',
    defaultHumidity: 52,
    defaultSoilTemp: 11,
    defaultWind: '2.8 m/s, SH',
    defaultRainProb: 10,
    riskLevel: 'warning',
    riskTitle: 'Tungi harorat pasayishi',
    riskText: 'Kuzda kechalari harorat keskin pasayishi mumkin. Nozik issiqsevar ekinlarni plyonka ostida saqlash tavsiya etiladi.'
  },
  namangan: {
    name: 'Namangan viloyati',
    lat: 40.9983,
    lon: 71.6726,
    defaultTemp: 14,
    defaultFeels: 13,
    defaultCondition: 'Biroz bulutli',
    defaultIcon: '⛅',
    defaultHumidity: 54,
    defaultSoilTemp: 11,
    defaultWind: '3.4 m/s, SH',
    defaultRainProb: 20,
    riskLevel: 'safe',
    riskTitle: 'Moʻtadil namlik darajasi',
    riskText: 'Togʻoldi zonalarida namlik yuqori boʻlib, kuzgi ekinlar unib chiqishiga ijobiy taʼsir koʻrsatadi.'
  },
  buxoro: {
    name: 'Buxoro viloyati',
    lat: 39.7747,
    lon: 64.4286,
    defaultTemp: 16,
    defaultFeels: 15,
    defaultCondition: 'Quyoshli, quruq havo',
    defaultIcon: '☀️',
    defaultHumidity: 35,
    defaultSoilTemp: 13,
    defaultWind: '5.1 m/s, Gʻ',
    defaultRainProb: 0,
    riskLevel: 'warning',
    riskTitle: 'Past tuproq namligi',
    riskText: 'Havo va tuproqda quruqlik yuqori. Yangi ekilgan maydonlarni meʼyorida sugʻorish va namlikni saqlovchi mulchalash zarur.'
  },
  qashqadaryo: {
    name: 'Qashqadaryo viloyati',
    lat: 38.8606,
    lon: 65.7891,
    defaultTemp: 16,
    defaultFeels: 15,
    defaultCondition: 'Quyoshli, ochiq',
    defaultIcon: '☀️',
    defaultHumidity: 38,
    defaultSoilTemp: 13,
    defaultWind: '4.5 m/s, J-Gʻ',
    defaultRainProb: 5,
    riskLevel: 'safe',
    riskTitle: 'Optimal gʻallachilik davri',
    riskText: 'Kuzgi bugʻdoy ekish uchun tuproq harorati ayni muddao. Seyalka va traktorlar bilan maydonlarni qamrab olish tavsiya etiladi.'
  },
  surxondaryo: {
    name: 'Surxondaryo viloyati',
    lat: 37.2242,
    lon: 67.2783,
    defaultTemp: 18,
    defaultFeels: 18,
    defaultCondition: 'Issiq, toza osmon',
    defaultIcon: '☀️',
    defaultHumidity: 32,
    defaultSoilTemp: 15,
    defaultWind: '3.2 m/s, J',
    defaultRainProb: 0,
    riskLevel: 'safe',
    riskTitle: 'Iliq subtropik iqlim',
    riskText: 'Anor, xurmo va kechki hosillarni terishning eng qizgʻin pallasi. Ertalabki soatlarda namlikni saqlovchi sugʻorish qulay.'
  },
  xorazm: {
    name: 'Xorazm viloyati',
    lat: 41.5564,
    lon: 60.6310,
    defaultTemp: 12,
    defaultFeels: 10,
    defaultCondition: 'Salqin, shamolli',
    defaultIcon: '💨',
    defaultHumidity: 48,
    defaultSoilTemp: 9,
    defaultWind: '6.2 m/s, SH-Gʻ',
    defaultRainProb: 15,
    riskLevel: 'warning',
    riskTitle: 'Kuchli shamol va shudgorlash',
    riskText: 'Shamol tezligi 6-8 m/s gacha yetishi mumkin. Dori purkash ishlarini shamol tinchiganda, erta tongda bajaring.'
  },
  qoraqalpogiston: {
    name: 'Qoraqalpogʻiston Resp.',
    lat: 42.4619,
    lon: 59.6166,
    defaultTemp: 10,
    defaultFeels: 8,
    defaultCondition: 'Salqin, ochiq havo',
    defaultIcon: '🌤️',
    defaultHumidity: 45,
    defaultSoilTemp: 8,
    defaultWind: '5.6 m/s, SH',
    defaultRainProb: 10,
    riskLevel: 'warning',
    riskTitle: 'Erta sovuq xavfi',
    riskText: 'Tungi harorat keskin tushishi ehtimoli bor. Qishloq xoʻjaligi texnikalarini qishki saqlashga tayyorlang.'
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
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default: Hozirgi oy
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [subPhone, setSubPhone] = useState('');

  // Live weather state
  const [liveWeather, setLiveWeather] = useState({});
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch real-time live meteorological data from Open-Meteo
  const fetchWeather = useCallback(async (rKey) => {
    const coords = REGION_DATA[rKey];
    if (!coords || !coords.lat) return;
    setLoadingWeather(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTashkent`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Live weather fetch failed');
      const data = await res.json();

      if (data && data.current && data.daily) {
        const cur = data.current;
        const curW = parseWmoWeather(cur.weather_code);
        const temp = Math.round(cur.temperature_2m);
        const feelsLike = Math.round(cur.apparent_temperature);
        const humidity = Math.round(cur.relative_humidity_2m);
        const wind = `${cur.wind_speed_10m.toFixed(1)} m/s, SH`;
        const soilTemp = Math.round(temp * 0.7 + 3);

        const forecast = data.daily.time.slice(0, 7).map((tStr, i) => {
          const parts = tStr.split('-');
          const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          let dayName = i === 0 ? 'Bugun' : (i === 1 ? 'Ertaga' : WEEKDAYS_SHORT_UZ[d.getDay()]);
          const dateStr = `${d.getDate()}-${MONTH_NAMES_UZ[d.getMonth()]}`;
          const wCode = data.daily.weather_code[i];
          const parsed = parseWmoWeather(wCode);
          const maxT = Math.round(data.daily.temperature_2m_max[i]);
          const minT = Math.round(data.daily.temperature_2m_min[i]);
          const rain = data.daily.precipitation_probability_max ? data.daily.precipitation_probability_max[i] : 0;

          return {
            day: dayName,
            date: dateStr,
            icon: parsed.icon,
            tDay: `${maxT > 0 ? '+' : ''}${maxT}°`,
            tNight: `${minT > 0 ? '+' : ''}${minT}°`,
            rain: `${rain}%`,
            status: parsed.status
          };
        });

        setLiveWeather((prev) => ({
          ...prev,
          [rKey]: {
            temp,
            feelsLike,
            humidity,
            wind,
            soilTemp,
            condition: curW.condition,
            icon: curW.icon,
            rainProb: data.daily.precipitation_probability_max ? data.daily.precipitation_probability_max[0] : 10,
            forecast,
            isLive: true
          }
        }));

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setLastUpdated(timeStr);
      }
    } catch (err) {
      console.warn('Live weather fetch notice (using dynamic forecast):', err);
    } finally {
      setLoadingWeather(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(regionKey);
  }, [regionKey, fetchWeather]);

  const baseRegion = REGION_DATA[regionKey] || REGION_DATA.toshkent;
  const live = liveWeather[regionKey];
  const region = {
    ...baseRegion,
    temp: live?.temp ?? baseRegion.defaultTemp,
    feelsLike: live?.feelsLike ?? baseRegion.defaultFeels,
    condition: live?.condition ?? baseRegion.defaultCondition,
    icon: live?.icon ?? baseRegion.defaultIcon,
    humidity: live?.humidity ?? baseRegion.defaultHumidity,
    soilTemp: live?.soilTemp ?? baseRegion.defaultSoilTemp,
    wind: live?.wind ?? baseRegion.defaultWind,
    rainProb: live?.rainProb ?? baseRegion.defaultRainProb,
    forecast: live?.forecast ?? generateDynamicForecast(baseRegion.defaultTemp, baseRegion.defaultRainProb),
    isLive: !!live?.isLive
  };

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
          
          {/* Header with Live Badge and Refresh */}
          <div className="section-head">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="kicker" style={{ margin: 0 }}>{t('weather_kicker')}</span>
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                padding: '4px 12px', 
                borderRadius: '999px', 
                background: 'rgba(34, 197, 94, 0.12)', 
                color: '#15803d', 
                fontWeight: 700, 
                fontSize: '0.78rem' 
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }}></span>
                Har kunlik ob-havo: Bugun, {getTodayFormatted()} {lastUpdated ? `(soat ${lastUpdated})` : ''}
              </span>
              <button
                type="button"
                onClick={() => fetchWeather(regionKey)}
                disabled={loadingWeather}
                style={{
                  background: 'var(--surface-color)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '999px',
                  padding: '3px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--text-color)'
                }}
                title="Ob-havoni yangilash"
              >
                <span>{loadingWeather ? '⏳' : '🔄'}</span>
                <span>{loadingWeather ? 'Yangilanmoqda...' : 'Yangilash'}</span>
              </button>
            </div>
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
            {Object.keys(REGION_DATA).map((rKey) => {
              const rLive = liveWeather[rKey];
              const tVal = rLive?.temp ?? REGION_DATA[rKey].defaultTemp;
              return (
                <button
                  key={rKey}
                  type="button"
                  className={`chip ${regionKey === rKey ? 'active' : ''}`}
                  onClick={() => setRegionKey(rKey)}
                >
                  {REGION_DATA[rKey].name} {tVal !== undefined ? `(${tVal > 0 ? '+' : ''}${tVal}°)` : ''}
                </button>
              );
            })}
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
                  {Object.keys(REGION_DATA).map((k) => {
                    const rLive = liveWeather[k];
                    const tVal = rLive?.temp ?? REGION_DATA[k].defaultTemp;
                    const cVal = rLive?.condition ?? REGION_DATA[k].defaultCondition;
                    return (
                      <option key={k} value={k}>
                        {REGION_DATA[k].name} ({tVal > 0 ? '+' : ''}${tVal}°C, {cVal})
                      </option>
                    );
                  })}
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
            <div className="ag-card" style={{ padding: '20px', background: 'var(--surface-color)' }}>
              <div className="sub" style={{ fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Havo harorati</span>
                {region.isLive && (
                  <span style={{ fontSize: '0.68rem', color: '#15803d', background: 'rgba(34,197,94,0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                    JONLI
                  </span>
                )}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-color)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{region.icon}</span>
                <span>{region.temp > 0 ? '+' : ''}{region.temp}°C</span>
              </div>
              <div className="sub" style={{ fontSize: '0.82rem', marginTop: '6px' }}>
                His qilinishi: {region.feelsLike > 0 ? '+' : ''}{region.feelsLike}°C • {region.condition}
              </div>
            </div>

            {/* Card 2: Tuproq harorati */}
            <div className="ag-card" style={{ padding: '20px', background: 'var(--surface-color)' }}>
              <div className="sub" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                🌱 Tuproq harorati (+10 sm)
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-color)', marginTop: '4px' }}>
                {region.soilTemp > 0 ? '+' : ''}{region.soilTemp}°C
              </div>
              <div className="sub" style={{ fontSize: '0.82rem', marginTop: '6px' }}>
                Ildiz otish va urugʻ unishi uchun: <strong style={{ color: 'var(--primary-color)' }}>Optimal</strong>
              </div>
            </div>

            {/* Card 3: Havoning namligi */}
            <div className="ag-card" style={{ padding: '20px', background: 'var(--surface-color)' }}>
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
            <div className="ag-card" style={{ padding: '20px', background: 'var(--surface-color)' }}>
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
              background: 'var(--surface-color)', 
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
                  Bugundan boshlab haftalik harorat, yogʻingarchilik va agrotadbirlar
                </p>
              </div>
              <span className="tag tag-green">
                🟢 Har kunlik prognoz
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
                    transition: '0.2s',
                    position: 'relative'
                  }}
                >
                  {idx === 0 && (
                    <span 
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#22c55e',
                        boxShadow: '0 0 6px #22c55e'
                      }}
                      title="Bugungi kun"
                    />
                  )}
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
                  <div style={{ fontSize: '0.72rem', color: idx === 0 ? 'var(--primary-dark)' : 'var(--text-color)', fontWeight: 600, marginTop: '6px', background: 'var(--surface-color)', padding: '4px 6px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
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
