import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function ContactSection({ selectedService }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: 'Toshkent viloyati',
    service: selectedService || "Agro-maslahat va monitoring",
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            Bog'lanish va Konsultatsiya
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mutaxassislarimiz Bilan Aloqaga Chiqing
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Savollaringiz bormi yoki dalangiz uchun bepul konsultatsiya kerakmi? Ma'lumotlaringizni qoldiring, 15 daqiqa ichida qo'ng'iroq qilamiz.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Aloqa Ma'lumotlari
              </h3>

              <div className="space-y-5">
                <a 
                  href="mailto:info@agrotarmoq.uz" 
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-emerald-50/60 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Elektron pochta</div>
                    <div className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      info@agrotarmoq.uz
                    </div>
                    <div className="text-xs text-slate-500">24 soat ichida javob beriladi</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-3 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Ish tartibi</div>
                    <div className="text-sm font-bold text-slate-900">
                      Dushanba — Shanba: 08:30 - 18:30
                    </div>
                    <div className="text-xs text-emerald-700 font-medium">Yakshanba: Navbatchi agronom onlayn</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50/80 border border-emerald-100">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-emerald-800 font-medium">Onlayn murojaat</div>
                    <div className="text-sm font-bold text-emerald-950">
                      24/7 Agro-Konsultatsiya
                    </div>
                    <div className="text-xs text-emerald-700 mt-1">Formani toʻldiring, mutaxassislarimiz sizga javob beradi.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Contact / Consultation Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-lg">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Arizangiz Muvaffaqiyatli Qabul Qilindi!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Hurmatli <strong>{formData.name || "Hamkor"}</strong>, mutaxassislarimiz ko'rsatilgan <strong>{formData.phone}</strong> raqamiga tez orada aloqaga chiqishadi.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        region: 'Toshkent viloyati',
                        service: 'Agro-maslahat va monitoring',
                        message: ''
                      });
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors"
                  >
                    Yangi ariza yuborish
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-100 pb-4 mb-2">
                  <h3 className="text-2xl font-black text-slate-900">
                    Onlayn Ariza va Konsultatsiya
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Barcha maydonlarni to'ldiring, bepul agronomik tahlil oling.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      F.I.SH / Ismingiz *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Sardor Rustamov"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Telefon raqamingiz *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+998 90 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Viloyat / Hududingiz
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Toshkent viloyati">Toshkent viloyati va shahar</option>
                      <option value="Samarqand viloyati">Samarqand viloyati</option>
                      <option value="Farg'ona viloyati">Farg'ona viloyati</option>
                      <option value="Andijon viloyati">Andijon viloyati</option>
                      <option value="Namangan viloyati">Namangan viloyati</option>
                      <option value="Buxoro viloyati">Buxoro viloyati</option>
                      <option value="Qashqadaryo viloyati">Qashqadaryo viloyati</option>
                      <option value="Surxondaryo viloyati">Surxondaryo viloyati</option>
                      <option value="Jizzax viloyati">Jizzax viloyati</option>
                      <option value="Sirdaryo viloyati">Sirdaryo viloyati</option>
                      <option value="Xorazm viloyati">Xorazm viloyati</option>
                      <option value="Navoiy viloyati">Navoiy viloyati</option>
                      <option value="Qoraqalpog'iston">Qoraqalpog'iston Respublikasi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Qiziqtirgan xizmat turi
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Tomchilatib sug'orish tizimi">Tomchilatib sug'orish tizimi</option>
                      <option value="Issiqxona qurilishi (Gidroponika)">Issiqxona qurilishi (Gidroponika)</option>
                      <option value="Elita urug'lar va ko'chatlar">Elita urug'lar va ko'chatlar</option>
                      <option value="Organik va mineral o'g'itlar">Organik va mineral o'g'itlar</option>
                      <option value="Agrodron va sun'iy yo'ldosh tahlili">Agrodron va sun'iy yo'ldosh tahlili</option>
                      <option value="Tuproq va suv laboratoriya tahlili">Tuproq va suv laboratoriya tahlili</option>
                      <option value="Eksport va sovutgichli saqlash">Eksport va sovutgichli saqlash</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Qo'shimcha izoh yoki yer maydoni haqida
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Masalan: 10 gektar bog' uchun tomchilatib sug'orish hisob-kitobi kerak..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/30 transition-all text-sm uppercase tracking-wider"
                >
                  {loading ? (
                    <span>Yuborilmoqda...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Arizani Yuborish & Maslahat Olish</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  Ma'lumotlaringiz xavfsizligi kafolatlanadi. Maxfiylik siyosatiga rioya etiladi.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
