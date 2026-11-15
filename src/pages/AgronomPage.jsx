import React, { useState, useRef, useEffect } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';
import { generateAiAgronomAnswer } from '../utils/aiAgronomEngine';

const SAMPLE_LEAVES = [
  {
    id: 'pomidor_fitoftora',
    cropKey: 'Pomidor',
    nameUz: 'Pomidor fitoftorasi (Late Blight)',
    nameRu: 'Фитофтороз томатов',
    nameEn: 'Tomato Late Blight (Phytophthora)',
    accuracy: 98.6,
    risk: 'high',
    symUz: 'Barglarda jigarrang-qora nam dogʻlar, orqasida oqish gʻubor, poyada qorayish.',
    symRu: 'Коричнево-бурые пятна на листьях, беловатый налет с нижней стороны, почернение стеблей.',
    symEn: 'Dark brown water-soaked lesions on leaves with white fungal growth on undersides.',
    cureUz: 'Fungitsid ("Ridomil Gold" 25g/10L suv) purkash, zararlangan barglarni kesib yoqish, tomchilatib sugʻorishga oʻtish.',
    cureRu: 'Опрыскивание фунгицидом ("Ридомил Голд" 25г/10л воды), удаление пораженных листьев, умеренный полив.',
    cureEn: 'Apply systemic fungicide (Ridomil Gold 25g/10L water), prune and dispose of infected leaves, reduce foliage moisture.',
    prevUz: 'Kuzda oʻsimlik qoldiqlarini yoʻqotish, issiqxonada namlikni 70% dan oshirmaslik.',
    prevRu: 'Севооборот, дезинфекция почвы, вентиляция теплиц и избегание переувлажнения.',
    prevEn: 'Crop rotation, greenhouse aeration, avoid overhead watering, plant certified resistant seeds.',
    img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27595.jpg?format=avif',
    storeCat: 'dori'
  },
  {
    id: 'bodring_un_shudring',
    cropKey: 'Bodring',
    nameUz: 'Bodring un shudringi (Powdery Mildew)',
    nameRu: 'Мучнистая роса огурца',
    nameEn: 'Cucumber Powdery Mildew',
    accuracy: 97.4,
    risk: 'med',
    symUz: 'Barg ustida unga oʻxshash oq qatlam, barglarning qurib toʻkilishi.',
    symRu: 'Белый мучнистый налет на верхней стороне листьев, постепенное усыхание.',
    symEn: 'White powdery fungal coating on upper leaf surface causing premature drying.',
    cureUz: 'Oltingugurtli preparatlar ("Topaz" yoki "Tiovit Jet" 20g/10L suv) bilan 7 kun oraliqda 2 marta purkash.',
    cureRu: 'Обработка серосодержащими фунгицидами ("Топаз", "Тиовит Джет") с интервалом 7-10 дней.',
    cureEn: 'Spray sulfur-based bio-fungicides (Topas or Tiovit Jet), enhance air circulation.',
    prevUz: 'Ekin qatorlarini zichlashtirmaslik, kaliyli oʻgʻitlar meʼyorini oshirish.',
    prevRu: 'Оптимальная плотность посадки, повышение дозы калийных удобрений.',
    prevEn: 'Avoid dense planting, sanitize greenhouse structures, maintain balanced potassium.',
    img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275af.jpg?format=avif',
    storeCat: 'dori'
  },
  {
    id: 'bugdoy_zangi',
    cropKey: 'Bugʻdoy',
    nameUz: 'Bugʻdoy sariq zangi (Yellow Rust)',
    nameRu: 'Желтая ржавчина пшеницы',
    nameEn: 'Wheat Yellow Stripe Rust',
    accuracy: 99.1,
    risk: 'high',
    symUz: 'Barglarda tomirlar boʻylab sariq va toʻq sariq chiziqli zang pufakchalari.',
    symRu: 'Продольные полосы желто-оранжевых пустул вдоль жилок листа, засыхание.',
    symEn: 'Stripe-like yellow-orange rust pustules along leaf veins reducing photosynthesis.',
    cureUz: 'Triazol guruhidagi tizimli fungitsidlar ("Falcon" yoki "Kolosal Pro" 0.3L/ga) sepish.',
    cureRu: 'Обработка системными фунгицидами группы триазолов ("Фалькон", "Колосаль Про").',
    cureEn: 'Apply systemic triazole fungicide (e.g. Falcon or Prosaro) upon first detection.',
    prevUz: 'Zangga chidamli navlarni ekish, urugʻlarni fungitsid bilan dorilab ekish.',
    prevRu: 'Посев устойчивых сортов, протравливание семян перед посевом.',
    prevEn: 'Sow certified rust-tolerant wheat cultivars, treat seeds before planting.',
    img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2759b.jpg?format=avif',
    storeCat: 'dori'
  },
  {
    id: 'olma_parsha',
    cropKey: 'Olma',
    nameUz: 'Olma parshasi va qora dogʻlanish',
    nameRu: 'Парша яблони',
    nameEn: 'Apple Scab & Dark Spot',
    accuracy: 96.8,
    risk: 'med',
    symUz: 'Barglarda zaytun-yashil va qora baxmalsimon dogʻlar, mevada yoriqlar.',
    symRu: 'Бархатистые оливково-черные пятна на листьях и плодах, деформация яблок.',
    symEn: 'Velvety olive-green and black spots on leaves, cracking on young fruits.',
    cureUz: 'Mis kuporosi (3%) yoki "Skor" (2ml/10L suv) bilan kurtak yozishdan oldin va keyin ishlov berish.',
    cureRu: 'Опрыскивание бордоской смесью или фунгицидом "Скор" (2мл/10л воды).',
    cureEn: 'Apply copper hydroxide or Score fungicide (2ml/10L water) before petal fall.',
    prevUz: 'Tushgan xazonlarni chuqur koʻmish yoki yoqish, erta bahorda 5% mochevina bilan yuvish.',
    prevRu: 'Уборка опавших листьев, ранее весеннее опрыскивание 5%-ным раствором мочевины.',
    prevEn: 'Rake and destroy fallen leaves, perform early spring urea eradication spray.',
    img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275a2.jpg?format=avif',
    storeCat: 'dori'
  },
  {
    id: 'uzum_mildiu',
    cropKey: 'Uzum',
    nameUz: 'Uzum mildiu (Soxta un shudring)',
    nameRu: 'Милдью винограда (Ложная мучнистая роса)',
    nameEn: 'Grapevine Downy Mildew',
    accuracy: 98.2,
    risk: 'high',
    symUz: 'Bargning ustida sargʻish moy dogʻlari, orqasida oppoq zamburugʻ parpi.',
    symRu: 'Маслянистые желтоватые пятна на верхней стороне, белый пушок снизу листа.',
    symEn: 'Oily yellowish spots on upper leaf surface, white dense downy growth underneath.',
    cureUz: 'Bordo suyuqligi (1%) yoki "Ridomil Gold" bilan yomgʻirlardan soʻng zudlik bilan ishlov berish.',
    cureRu: 'Обработка 1% бордоской жидкостью или препаратом "Ридомил Голд" после осадков.',
    cureEn: 'Spray Bordeaux mixture or Ridomil Gold promptly after rain and high humidity periods.',
    prevUz: 'Tok zanglarini yerdan baland koʻtarish, oraliq barglarni siyraklatish.',
    prevRu: 'Подвязка лоз, прореживание листьев вокруг гроздей для проветривания.',
    prevEn: 'Prune excess canopy to promote drying, tie vines above wet soil level.',
    img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275b5.jpg?format=avif',
    storeCat: 'dori'
  },
  {
    id: 'kartoshka_fitoftora',
    cropKey: 'Kartoshka',
    nameUz: 'Kartoshka fitoftorasi va dogʻlanish',
    nameRu: 'Фитофтороз картофеля',
    nameEn: 'Potato Late Blight',
    accuracy: 97.9,
    risk: 'high',
    symUz: 'Barg chetlarida qoramtir dogʻlar, palakning tez soʻlib qolishi.',
    symRu: 'Быстро темнеющие водянистые пятна по краям листьев, увядание ботвы.',
    symEn: 'Rapidly spreading dark water-soaked leaf margins and collapsing foliage.',
    cureUz: 'Tizimli fungitsid ("Revus" yoki "Infinito" 12-16ml/10L suv) purkash.',
    cureRu: 'Опрыскивание системными фунгицидами ("Ревус", "Инфинито" 15мл/10л воды).',
    cureEn: 'Apply systemic fungicides (Revus or Infinito), destroy severely blighted foliage.',
    prevUz: 'Sogʻlom urugʻlik tuganaklarni ekish, tuproqni baland qilib koʻmish.',
    prevRu: 'Использование здорового семенного материала, высокое окучивание.',
    prevEn: 'Use certified clean seed tubers, hill potatoes well to protect tubers.',
    img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a275a9.jpg?format=avif',
    storeCat: 'dori'
  }
];

export default function AgronomPage({ onNavigate, onShowToast }) {
  const { t, lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('all');

  // AI Diagnostic State
  const [activeSample, setActiveSample] = useState(SAMPLE_LEAVES[0]);
  const [uploadedImage, setUploadedImage] = useState(SAMPLE_LEAVES[0].img);
  const [selectedCrop, setSelectedCrop] = useState('Pomidor');
  const [selectedSymptom, setSelectedSymptom] = useState('dog');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [diagnosisResult, setDiagnosisResult] = useState(SAMPLE_LEAVES[0]);

  // Question form & Live AI Answer
  const [questionText, setQuestionText] = useState('');
  const [questionPhone, setQuestionPhone] = useState('');
  const [aiFormAnswer, setAiFormAnswer] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);

  // Camera & Upload refs
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup camera stream on unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const cropsList = [
    { key: 'Pomidor', uz: 'Pomidor 🍅', ru: 'Помидор 🍅', en: 'Tomato 🍅' },
    { key: 'Bodring', uz: 'Bodring 🥒', ru: 'Огурец 🥒', en: 'Cucumber 🥒' },
    { key: 'Bugʻdoy', uz: 'Bugʻdoy 🌾', ru: 'Пшеница 🌾', en: 'Wheat 🌾' },
    { key: 'Olma', uz: 'Olma 🍎', ru: 'Яблоня 🍎', en: 'Apple 🍎' },
    { key: 'Uzum', uz: 'Uzum 🍇', ru: 'Виноград 🍇', en: 'Grape 🍇' },
    { key: 'Kartoshka', uz: 'Kartoshka 🥔', ru: 'Картофель 🥔', en: 'Potato 🥔' },
    { key: 'Makkajoʻxori', uz: 'Makkajoʻxori 🌽', ru: 'Кукуруза 🌽', en: 'Corn 🌽' }
  ];

  const symptomsList = [
    { key: 'dog', uz: 'Bargda qora/jigarrang dogʻlar', ru: 'Черные/бурые пятна на листьях', en: 'Dark/brown spots on leaves' },
    { key: 'oq_qubor', uz: 'Oq un kabi gʻubor qatlami', ru: 'Белый мучнистый налет', en: 'White powdery layer' },
    { key: 'zang', uz: 'Sariq/zang tusli chiziqlar', ru: 'Желто-ржавые полосы', en: 'Yellow/rust streaks' },
    { key: 'qurish', uz: 'Barg chetlarining qurishi', ru: 'Усыхание краев листьев', en: 'Leaf margin scorching' },
    { key: 'chirish', uz: 'Poya va meva yumshab chirishi', ru: 'Гниение стебля или плода', en: 'Stem or fruit rotting' }
  ];

  const handleSelectSample = (sample) => {
    if (isCameraActive) stopCamera();
    setActiveSample(sample);
    setUploadedImage(sample.img);
    setSelectedCrop(sample.cropKey);
    setDiagnosisResult(null);
  };

  const handleFileUpload = (e) => {
    if (isCameraActive) stopCamera();
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setDiagnosisResult(null);
      if (onShowToast) {
        onShowToast(lang === 'ru' ? 'Фото листа успешно загружено' : (lang === 'en' ? 'Leaf photo uploaded' : 'Barg surati yuklandi'));
      }
      setTimeout(() => {
        handleRunDiagnosis();
      }, 400);
    }
  };

  const startCamera = async () => {
    setIsCameraActive(true);
    setDiagnosisResult(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(e => console.warn("Video play error:", e));
        }
      } else {
        setIsCameraActive(false);
        cameraInputRef.current?.click();
      }
    } catch (err) {
      console.warn("Camera streaming not supported or permission denied, using file capture:", err);
      setIsCameraActive(false);
      cameraInputRef.current?.click();
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);

      stopCamera();
      setUploadedImage(dataUrl);
      setDiagnosisResult(null);
      if (onShowToast) {
        onShowToast(lang === 'ru' ? 'Снимок сделан! Запуск AI анализа...' : 'Surat olindi! AI tahlil boshlanmoqda...');
      }
      setTimeout(() => {
        handleRunDiagnosis();
      }, 350);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleRunDiagnosis = () => {
    setIsScanning(true);
    setScanProgress(0);
    setDiagnosisResult(null);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 98;
        }
        return prev + 14;
      });
    }, 110);

    setTimeout(() => {
      clearInterval(interval);
      setScanProgress(100);
      setIsScanning(false);
      
      // Match sample or find best disease by selected crop
      const matched = SAMPLE_LEAVES.find(s => s.cropKey === selectedCrop) || activeSample || SAMPLE_LEAVES[0];
      setDiagnosisResult(matched);
      if (onShowToast) {
        onShowToast(lang === 'ru' ? 'AI диагноз успешно поставлен ✓' : (lang === 'en' ? 'AI diagnosis completed ✓' : 'AI tashxis muvaffaqiyatli qoʻyildi ✓'));
      }
    }, 1250);
  };

  const handleSendQuestion = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setIsAnswering(true);
    const query = questionText.trim();

    setTimeout(() => {
      const answer = generateAiAgronomAnswer(query, lang);
      setAiFormAnswer(answer);
      setIsAnswering(false);
      if (onShowToast) {
        onShowToast(lang === 'ru' ? 'AI Агроном ответил на вопрос ✓' : 'AI Agronom savolingizga javob berdi ✓');
      }
    }, 600);
  };

  // Filter diseases in encyclopedia
  const filteredDiseases = AGRO_DATA.diseases.filter((d) => {
    const matchesCrop = selectedCropFilter === 'all' || d.crop.toLowerCase().includes(selectedCropFilter.toLowerCase());
    if (!matchesCrop) return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase().trim();
    return (d.name + ' ' + d.crop + ' ' + d.sym + ' ' + d.cure).toLowerCase().includes(q);
  });

  return (
    <main id="top" style={{ paddingBottom: '60px' }}>
      
      {/* ─── Hero / Page Header ────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: '28px', paddingBottom: '16px' }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: '24px' }}>
            <span className="kicker">{t('agronom_kicker')}</span>
            <h2>{t('agronom_title')}</h2>
            <p className="lead">{t('agronom_lead')}</p>
          </div>

          {/* ─── 3. AI Agronom Feature Badge & Diagnostic Lab ────────────────── */}
          <div 
            id="ai-agronom-lab"
            style={{
              background: 'var(--surface-color)',
              border: '2px solid rgba(217, 119, 6, 0.4)',
              borderRadius: '24px',
              padding: 'clamp(20px, 4vw, 36px)',
              boxShadow: '0 12px 36px rgba(217, 119, 6, 0.12), 0 2px 8px rgba(0,0,0,0.04)',
              marginBottom: '48px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background glow accent */}
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(217, 119, 6, 0.18) 0%, rgba(217, 119, 6, 0) 70%)',
              pointerEvents: 'none'
            }} />

            {/* Header with Exact Badge 3 from user screenshot */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '18px' }}>
              <div 
                style={{
                  width: '42px',
                  height: '42px',
                  minWidth: '42px',
                  borderRadius: '50%',
                  background: '#d97706',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(217, 119, 6, 0.4)',
                  marginTop: '2px'
                }}
              >
                {t('ai_agronom_badge') || '3'}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-color)' }}>
                  {t('ai_agronom_title')}
                </h2>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#d97706', marginBottom: '6px' }}>
                  {t('ai_agronom_subtitle')}
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--muted-color)', lineHeight: 1.5, maxWidth: '780px' }}>
                  {t('ai_agronom_desc')}
                </p>
              </div>
            </div>

            {/* Diagnostic Interface: 2-Column Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '28px', alignItems: 'start' }}>
              
              {/* Left Column: Image & Scanner */}
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-color)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-camera" style={{ color: '#d97706' }}></i>
                  <span>{t('ai_upload_title')}</span>
                </div>

                {/* Leaf Preview & Live Camera Scanner Box */}
                <div 
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '290px',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    border: '2px dashed #d97706',
                    background: '#0a0f0d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
                  }}
                >
                  {isCameraActive ? (
                    /* Live WebRTC Camera Stream */
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      {/* Viewfinder Target Crosshairs */}
                      <div 
                        style={{
                          position: 'absolute',
                          inset: '20px',
                          border: '2px solid rgba(74, 222, 128, 0.7)',
                          borderRadius: '14px',
                          pointerEvents: 'none',
                          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.35)'
                        }}
                      />
                      {/* Capture and Cancel Buttons */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '14px',
                          left: '12px',
                          right: '12px',
                          display: 'flex',
                          gap: '10px',
                          zIndex: 10
                        }}
                      >
                        <button
                          type="button"
                          onClick={capturePhoto}
                          className="ag-btn ag-btn-green"
                          style={{
                            flex: 1,
                            padding: '10px 14px',
                            fontWeight: 800,
                            borderRadius: '12px',
                            fontSize: '0.88rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)'
                          }}
                        >
                          <i className="fa-solid fa-camera"></i>
                          <span>📸 Suratga olish</span>
                        </button>
                        <button
                          type="button"
                          onClick={stopCamera}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.4)',
                            background: 'rgba(0,0,0,0.6)',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '0.84rem',
                            cursor: 'pointer'
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Normal Preview Image */
                    <>
                      <img 
                        src={uploadedImage} 
                        alt="AI Leaf Scan"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: isScanning ? 0.75 : 0.95,
                          filter: isScanning ? 'contrast(1.15) brightness(1.1)' : 'none',
                          transition: 'all 0.3s'
                        }}
                      />

                      {/* Neural Grid Overlay & Animated Scanner Line */}
                      {isScanning && (
                        <>
                          <div 
                            style={{
                              position: 'absolute',
                              inset: 0,
                              backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.15) 1px, transparent 1px)',
                              backgroundSize: '24px 24px',
                              zIndex: 2
                            }}
                          />
                          <div 
                            style={{
                              position: 'absolute',
                              left: 0,
                              right: 0,
                              height: '4px',
                              background: 'linear-gradient(90deg, transparent, #22c55e, #eab308, #22c55e, transparent)',
                              boxShadow: '0 0 16px #22c55e, 0 0 28px #22c55e',
                              top: `${scanProgress}%`,
                              zIndex: 3,
                              transition: 'top 0.11s linear'
                            }}
                          />
                          <div 
                            style={{
                              position: 'absolute',
                              bottom: '16px',
                              left: '16px',
                              right: '16px',
                              background: 'rgba(0,0,0,0.85)',
                              backdropFilter: 'blur(8px)',
                              color: '#4ade80',
                              padding: '10px 16px',
                              borderRadius: '12px',
                              fontSize: '0.86rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              border: '1px solid rgba(34, 197, 94, 0.4)',
                              zIndex: 4
                            }}
                          >
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                              {t('ai_scanning')}
                            </span>
                            <span>{scanProgress}%</span>
                          </div>
                        </>
                      )}

                      {/* Status Overlay when ready */}
                      {!isScanning && (
                        <div 
                          style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            background: 'rgba(0,0,0,0.65)',
                            backdropFilter: 'blur(6px)',
                            color: '#fff',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            border: '1px solid rgba(255,255,255,0.2)'
                          }}
                        >
                          <i className="fa-solid fa-microchip" style={{ color: '#f59e0b', marginRight: '6px' }}></i>
                          AI Vision Ready
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Upload & Real Camera Button Row */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  {/* File Upload Input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    style={{ display: 'none' }} 
                  />
                  {/* Direct Mobile Native Camera Input */}
                  <input 
                    type="file" 
                    ref={cameraInputRef} 
                    accept="image/*" 
                    capture="environment"
                    onChange={handleFileUpload} 
                    style={{ display: 'none' }} 
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)',
                      color: 'var(--text-color)',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <i className="fa-solid fa-upload"></i>
                    <span>{t('ai_upload_drag')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={startCamera}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '11px 16px',
                      borderRadius: '12px',
                      border: '1px solid #16a34a',
                      background: 'var(--green-soft)',
                      color: 'var(--primary-dark)',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                    title={t('ai_camera_btn')}
                  >
                    <i className="fa-solid fa-camera"></i>
                    <span>Kamera</span>
                  </button>
                </div>

                {/* Sample Leaf Thumbnails */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--muted-color)', marginBottom: '8px' }}>
                    {t('ai_sample_title')}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
                    {SAMPLE_LEAVES.map((sample) => {
                      const isSelected = activeSample?.id === sample.id && uploadedImage === sample.img;
                      return (
                        <button
                          key={sample.id}
                          type="button"
                          onClick={() => handleSelectSample(sample)}
                          style={{
                            aspectRatio: '1',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: isSelected ? '2px solid #d97706' : '1px solid var(--border-color)',
                            padding: 0,
                            cursor: 'pointer',
                            position: 'relative',
                            boxShadow: isSelected ? '0 0 10px rgba(217, 119, 6, 0.4)' : 'none',
                            transform: isSelected ? 'scale(1.05)' : 'none',
                            transition: 'all 0.18s'
                          }}
                          title={lang === 'ru' ? sample.nameRu : (lang === 'en' ? sample.nameEn : sample.nameUz)}
                        >
                          <img src={sample.img} alt={sample.nameUz} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Diagnostic Controls & Results */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Crop & Symptom Dropdown Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-color)', marginBottom: '6px' }}>
                      {t('ai_crop_label')}
                    </label>
                    <select
                      value={selectedCrop}
                      onChange={(e) => {
                        setSelectedCrop(e.target.value);
                        setDiagnosisResult(null);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--surface-color)',
                        color: 'var(--text-color)',
                        fontWeight: 600,
                        fontSize: '0.88rem'
                      }}
                    >
                      {cropsList.map((c) => (
                        <option key={c.key} value={c.key}>
                          {lang === 'ru' ? c.ru : (lang === 'en' ? c.en : c.uz)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-color)', marginBottom: '6px' }}>
                      {t('ai_symptom_label')}
                    </label>
                    <select
                      value={selectedSymptom}
                      onChange={(e) => setSelectedSymptom(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--surface-color)',
                        color: 'var(--text-color)',
                        fontWeight: 600,
                        fontSize: '0.88rem'
                      }}
                    >
                      {symptomsList.map((s) => (
                        <option key={s.key} value={s.key}>
                          {lang === 'ru' ? s.ru : (lang === 'en' ? s.en : s.uz)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={handleRunDiagnosis}
                  disabled={isScanning}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    borderRadius: '14px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: isScanning ? 'wait' : 'pointer',
                    boxShadow: '0 8px 24px rgba(217, 119, 6, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'transform 0.15s, opacity 0.15s',
                    opacity: isScanning ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => !isScanning && (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <i className={`fa-solid ${isScanning ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'}`}></i>
                  <span>{isScanning ? t('ai_scanning') : t('ai_diagnose_btn')}</span>
                </button>

                {/* Result Card */}
                {diagnosisResult && (
                  <div 
                    style={{
                      background: 'var(--green-soft)',
                      border: '1.5px solid var(--primary-color)',
                      borderRadius: '16px',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      animation: 'fadeIn 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                      <div>
                        <span style={{ 
                          display: 'inline-block',
                          background: 'var(--primary-color)', 
                          color: '#fff', 
                          borderRadius: '20px', 
                          padding: '2px 10px', 
                          fontSize: '0.72rem', 
                          fontWeight: 800, 
                          marginBottom: '6px' 
                        }}>
                          {t('ai_result_title')}
                        </span>
                        <h3 style={{ margin: 0, fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-color)' }}>
                          {lang === 'ru' ? diagnosisResult.nameRu : (lang === 'en' ? diagnosisResult.nameEn : diagnosisResult.nameUz)}
                        </h3>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-color)' }}>
                          {t('ai_confidence_label')}
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary-dark)' }}>
                          {diagnosisResult.accuracy}%
                        </div>
                      </div>
                    </div>

                    {/* Symptoms Identified */}
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#b4452f', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {t('symptoms')}
                      </div>
                      <p style={{ margin: '3px 0 0', fontSize: '0.86rem', color: 'var(--text-color)', lineHeight: 1.45 }}>
                        {lang === 'ru' ? diagnosisResult.symRu : (lang === 'en' ? diagnosisResult.symEn : diagnosisResult.symUz)}
                      </p>
                    </div>

                    {/* Actionable Treatment */}
                    <div style={{ background: 'var(--surface-color)', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <i className="fa-solid fa-prescription-bottle-medical"></i>
                        <span>{t('ai_cure_label')}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-color)', lineHeight: 1.45 }}>
                        {lang === 'ru' ? diagnosisResult.cureRu : (lang === 'en' ? diagnosisResult.cureEn : diagnosisResult.cureUz)}
                      </p>
                    </div>

                    {/* Prevention Tips */}
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted-color)', lineHeight: 1.4 }}>
                      <strong style={{ color: 'var(--text-color)' }}>{t('ai_prev_label')}</strong>{' '}
                      {lang === 'ru' ? diagnosisResult.prevRu : (lang === 'en' ? diagnosisResult.prevEn : diagnosisResult.prevUz)}
                    </div>

                    {/* Action buttons inside result card */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                      {onNavigate && (
                        <button
                          type="button"
                          onClick={() => onNavigate('dokon')}
                          style={{
                            flex: 1,
                            padding: '10px 14px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'var(--primary-color)',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                          }}
                        >
                          {t('ai_buy_cure_btn')}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setDiagnosisResult(null)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '12px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--surface-color)',
                          color: 'var(--text-color)',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        {t('ai_reset_btn')}
                      </button>
                    </div>

                  </div>
                )}

              </div>
            </div>

          </div>

          {/* ─── Searchable Crop Disease Encyclopedia ───────────────────────── */}
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-color)' }}>
                  {t('crop_diseases')}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted-color)' }}>
                  {filteredDiseases.length} {t('total_selected_products')}
                </span>
              </div>

              {/* Crop Filter Buttons */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setSelectedCropFilter('all')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    background: selectedCropFilter === 'all' ? 'var(--primary-color)' : 'var(--surface-color)',
                    color: selectedCropFilter === 'all' ? '#fff' : 'var(--text-color)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {t('cat_all')}
                </button>
                {['Pomidor', 'Bodring', 'Bugʻdoy', 'Olma', 'Kartoshka', 'Uzum'].map((cropName) => (
                  <button
                    key={cropName}
                    type="button"
                    onClick={() => setSelectedCropFilter(cropName)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: '1px solid var(--border-color)',
                      background: selectedCropFilter === cropName ? 'var(--primary-color)' : 'var(--surface-color)',
                      color: selectedCropFilter === cropName ? '#fff' : 'var(--text-color)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {cropName}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div style={{ maxWidth: '600px', marginBottom: '28px' }}>
              <div className="header-search" style={{ display: 'flex', width: '100%', borderRadius: 'var(--radius-sm)' }}>
                <input
                  type="text"
                  id="diseaseSearch"
                  placeholder={t('search_input_placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1, padding: '12px 18px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>
            </div>
          </div>

          {/* Diseases Grid */}
          <div className="grid-cards" id="diseaseGrid">
            {filteredDiseases.length === 0 ? (
              <p className="empty" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--muted-color)' }}>
                {t('search_not_found')}
              </p>
            ) : (
              filteredDiseases.map((d, idx) => (
                <article key={idx} className="ag-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="card-media" style={{ height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
                      <img src={d.img} alt={d.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div className="row" style={{ marginBottom: '8px' }}>
                      <span className="tag tag-green">{d.emoji} {d.crop}</span>
                    </div>

                    <h3 className="card-title" style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 10px' }}>
                      {d.name}
                    </h3>
                    
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#b4452f', marginBottom: '3px' }}>
                        {t('symptoms')}
                      </div>
                      <p className="sub" style={{ fontSize: '0.85rem', color: 'var(--text-color)', lineHeight: 1.45, margin: 0 }}>
                        {d.sym}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '3px' }}>
                      {t('treatment')}
                    </div>
                    <p className="sub" style={{ fontSize: '0.85rem', color: 'var(--text-color)', lineHeight: 1.45, margin: '0 0 12px' }}>
                      {d.cure}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCrop(d.crop);
                        setUploadedImage(d.img);
                        const match = SAMPLE_LEAVES.find(s => s.cropKey === d.crop) || SAMPLE_LEAVES[0];
                        setActiveSample(match);
                        setDiagnosisResult(match);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: '1px solid #d97706',
                        background: 'transparent',
                        color: '#d97706',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fa-solid fa-microchip" style={{ marginRight: '6px' }}></i>
                      {t('ai_diagnose_btn')}
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* ─── Ask an Agronomist Consultation Form ─────────────────────── */}
          <div 
            style={{
              marginTop: '56px',
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: 'clamp(20px, 4vw, 36px)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
            }}
          >
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--primary-color)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '12px' }}>
                <i className="fa-solid fa-user-doctor"></i>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-color)' }}>
                {t('ask_question')}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', marginBottom: '20px' }}>
                {t('question_placeholder')}
              </p>

              <form onSubmit={handleSendQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <textarea
                  rows="3"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder={t('question_placeholder') || "Savolingizni yozing (masalan: pomidor bargida sargʻish dogʻ bor)..."}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface-color)',
                    color: 'var(--text-color)',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <input
                    type="tel"
                    value={questionPhone}
                    onChange={(e) => setQuestionPhone(e.target.value)}
                    placeholder="+998 90 123 45 67 (Ixtiyoriy)"
                    style={{
                      flex: 1,
                      minWidth: '180px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)',
                      color: 'var(--text-color)',
                      fontSize: '0.9rem'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isAnswering || !questionText.trim()}
                    className="ag-btn ag-btn-green"
                    style={{
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontWeight: 800,
                      cursor: isAnswering ? 'default' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>🤖</span>
                    <span>{isAnswering ? 'AI tahlil qilmoqda...' : 'AI dan soʻrash'}</span>
                  </button>
                </div>
              </form>

              {/* Live AI Answer Box */}
              {isAnswering && (
                <div style={{ marginTop: '20px', padding: '16px', background: 'var(--green-soft)', borderRadius: '14px', border: '1px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>🤖</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.92rem' }}>
                    AI Agronom savolingizni tahlil qilib, dori va tavsiyalarni tayyorlamoqda...
                  </span>
                </div>
              )}

              {aiFormAnswer && !isAnswering && (
                <div 
                  style={{ 
                    marginTop: '22px', 
                    padding: '20px', 
                    background: '#ffffff', 
                    borderRadius: '16px', 
                    border: '1.5px solid #22c55e', 
                    textAlign: 'left',
                    boxShadow: '0 8px 24px rgba(34, 197, 94, 0.15)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.3rem' }}>🤖</span>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                        {aiFormAnswer.title}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAiFormAnswer(null)}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '16px', color: 'var(--muted-color)' }}
                      title="Yopish"
                    >
                      ✕
                    </button>
                  </div>

                  <div style={{ fontSize: '0.9rem', color: 'var(--text-color)', lineHeight: 1.65, whiteSpace: 'pre-wrap', marginBottom: '16px' }}>
                    {aiFormAnswer.text}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => {
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="ag-btn ag-btn-green"
                      style={{ padding: '8px 16px', fontSize: '0.84rem', fontWeight: 700, borderRadius: '8px' }}
                    >
                      📸 Bargni skanerlash boʻlimiga oʻtish
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAiFormAnswer(null);
                        setQuestionText('');
                      }}
                      style={{ padding: '8px 14px', fontSize: '0.84rem', fontWeight: 600, borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer' }}
                    >
                      Boshqa savol berish
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
