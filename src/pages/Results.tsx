import React from 'react';
import { 
  Trophy, 
  ArrowRight, 
  RotateCcw, 
  Share2,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Results() {
  const result = {
    examTitle: 'Ujian Tengah Semester - Produktif TKJ',
    totalQuestions: 50,
    correctAnswers: 44,
    wrongAnswers: 6,
    score: 88,
    duration: '01:12:45',
    status: 'LULUS',
    date: '24 Maret 2024'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Hasil Ujian</h1>
        <p className="text-slate-500 font-medium">Laporan lengkap performa ujian Anda.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-100 overflow-hidden"
      >
        <div className="p-10 bg-primary/5 border-b border-primary/10 flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-red-100 flex items-center justify-center p-4">
            <Trophy className="w-full h-full text-amber-500 animate-bounce" />
          </div>
          <div>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">Skor Akhir</p>
            <h2 className="text-6xl font-black text-slate-900">{result.score}</h2>
          </div>
          <div className="px-6 py-2 bg-emerald-100 text-emerald-600 rounded-full font-black text-xs tracking-wider">
            {result.status}
          </div>
        </div>

        <div className="p-10 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-50 rounded-3xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="text-[10px] text-slate-400 font-black uppercase">Benar</p>
            <p className="text-2xl font-black text-slate-900">{result.correctAnswers}</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-3xl text-center space-y-2">
            <XCircle className="w-8 h-8 text-red-500 mx-auto" />
            <p className="text-[10px] text-slate-400 font-black uppercase">Salah</p>
            <p className="text-2xl font-black text-slate-900">{result.wrongAnswers}</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-3xl text-center space-y-2">
            <Clock className="w-8 h-8 text-blue-500 mx-auto" />
            <p className="text-[10px] text-slate-400 font-black uppercase">Durasi</p>
            <p className="text-2xl font-black text-slate-900">{result.duration}</p>
          </div>
        </div>

        <div className="px-10 pb-10 flex flex-wrap gap-4">
          <Link 
            to="/app/ujian"
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-red-200 hover:bg-primary-hover transition-all"
          >
            Kembali Ke Beranda
          </Link>
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
            <Share2 className="w-5 h-5" />
            Bagikan
          </button>
        </div>
      </motion.div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 space-y-6">
        <h3 className="text-xl font-black text-slate-900">Statistik Belajar</h3>
        <div className="space-y-4">
          {[
            { label: 'Pengetahuan Jaringan', value: 92 },
            { label: 'Protokol & Layanan', value: 78 },
            { label: ' Troubleshooting', value: 85 }
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-primary"
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
