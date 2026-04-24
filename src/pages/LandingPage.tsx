import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  BarChart3,
  Monitor
} from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  const jurusan = [
    { code: 'TKJ', name: 'Teknik Komputer & Jaringan' },
    { code: 'DKV', name: 'Desain Komunikasi Visual' },
    { code: 'AK', name: 'Akuntansi' },
    { code: 'BC', name: 'Broadcasting' },
    { code: 'MPLB', name: 'Manajemen Perkantoran & Layanan Bisnis' },
    { code: 'BD', name: 'Bisnis Digital' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">Prima Unggul CBT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#profil" className="hover:text-primary transition-colors">Profil</a>
            <a href="#jurusan" className="hover:text-primary transition-colors">Jurusan</a>
            <a href="#fitur" className="hover:text-primary transition-colors">Fitur</a>
            <Link 
              to="/login" 
              className="px-6 py-2.5 bg-primary text-white rounded-full hover:bg-primary-hover shadow-lg shadow-red-200 transition-all font-bold"
            >
              Portal Login
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              Masa Depan <span className="text-primary italic">Ujian Digital</span> Dimulai Di Sini.
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Platform Computer Based Test (CBT) tercanggih untuk SMK Prima Unggul. 
              Efisien, Aman, dan Akurat untuk mengukur kompetensi generasi emas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/login" 
                className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl hover:bg-primary-hover shadow-xl shadow-red-200 transition-all font-bold group"
              >
                Mulai Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold">
                Cek Hasil Ujian
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-400/10 rounded-full blur-3xl animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=2070" 
              alt="Education" 
              className="rounded-[2.5rem] shadow-2xl relative z-10 border border-white/20"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Profil Section */}
      <section id="profil" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Membangun Kompetensi di SMK Prima Unggul</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Sekolah yang berdedikasi menciptakan lulusan unggul yang siap bersaing secara global dengan penguasaan teknologi terkini.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-6 transition-all">
                <ShieldCheck className="w-7 h-7 text-primary group-hover:text-white transition-all" />
              </div>
              <h3 className="text-xl font-bold mb-3">Keamanan Tinggi</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Sistem anti-curang dengan monitoring real-time dan enkripsi data end-to-end.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:-rotate-6 transition-all">
                <BarChart3 className="w-7 h-7 text-primary group-hover:text-white transition-all" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Analysis</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Skoring otomatis dan analisis hasil ujian instan untuk evaluasi pembelajaran.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-6 transition-all">
                <Monitor className="w-7 h-7 text-primary group-hover:text-white transition-all" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi Database</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Penyimpanan fleksibel dengan performa tinggi yang menjamin kestabilan saat ujian massal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Jurusan Section */}
      <section id="jurusan" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pilih Masa Depanmu</h2>
            <p className="text-slate-600">6 Jurusan Unggulan yang relevan dengan kebutuhan industri masa kini.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {jurusan.map((j) => (
              <div key={j.code} className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 hover:bg-primary/5 transition-all text-center group">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-slate-400 group-hover:text-primary transition-all">
                  {j.code}
                </div>
                <p className="font-bold text-slate-900 text-xs leading-tight">{j.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900">SMK Prima Unggul</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 CBT System. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-primary">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-primary">Kebijakan Privasi</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
