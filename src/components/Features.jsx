import React from 'react';
import { 
  Scan, 
  Droplets, 
  Sprout, 
  Warehouse, 
  BadgePercent, 
  PhoneCall, 
  CheckCircle,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Scan,
      title: "Agrodron va Sun'iy Yo'ldosh Tahlili",
      desc: "Maydonlar holatini multispektral kameralar orqali skanerlash, zararkunandalar va oziqa yetishmovchiligini dastlabki bosqichda aniqlash.",
      color: "emerald"
    },
    {
      icon: Droplets,
      title: "Intellektual Tomchilatib Sug'orish",
      desc: "Sensorlar asosida tuproq namligini o'lchovchi, suv va elektr energiyasini 50% gacha tejaydigan avtomatlashtirilgan tizimlar.",
      color: "blue"
    },
    {
      icon: Sprout,
      title: "Sertifikatlangan Elita Urug'lar",
      desc: "Gollandiya, Turkiya va mahalliy ilmiy-tadqiqot institutlarining 99% unuvchanlikka ega gibrid urug' va payvand ko'chatlari.",
      color: "green"
    },
    {
      icon: Warehouse,
      title: "Zamonaviy Sovutgichli Omborlar",
      desc: "Atmosferasi nazorat qilinadigan (CA/ULO) saqlash kameralari hosilning yangiligini 6-9 oygacha yo'qotmasdan saqlaydi.",
      color: "amber"
    },
    {
      icon: BadgePercent,
      title: "Davlat Subsidiyalari va Imtiyozli Lizing",
      desc: "Suv tejovchi texnologiyalar va agrotexnika xaridi uchun davlatdan subsidiya olish hamda lizing shartnomalarini rasmiylashtirish.",
      color: "purple"
    },
    {
      icon: PhoneCall,
      title: "Doimiy Agromaslahat va Hamrohlik",
      desc: "Tajribali agronom, tuproqshunos va entomolog mutaxassislarimizdan mavsum davomida to'liq amaliy va ilmiy tavsiyalar.",
      color: "rose"
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Nega aynan Agro Tarmoq?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Zamonaviy Agrobiznes Uchun Ishonchli Yechimlar
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Biz shunchaki mahsulot sotmaymiz — dehqon va agrofirmalarning hosildorligini oshirish va daromadini ko'paytirish uchun to'liq texnologik zanjirni taqdim etamiz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-slate-50/70 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-7 h-7 stroke-[2]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Kafolatlangan standart</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
