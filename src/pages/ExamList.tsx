import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ArrowRight, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function ExamList() {
  const { user } = useAuthStore();
  
  const exams = [
    { 
      id: '1', 
      title: 'Ujian Tengah Semester - Produktif TKJ', 
      subject: 'Teknik Komputer & Jaringan',
      duration: 120,
      questions: 50,
      startTime: '2024-03-24T08:00:00Z',
      endTime: '2024-03-24T18:00:00Z',
      status: 'active',
      isCompleted: false
    },
    { 
      id: '2', 
      title: 'Kuis Harian - Dasar Desain Grafis', 
      subject: 'DKV',
      duration: 45,
      questions: 20,
      startTime: '2024-03-23T08:00:00Z',
      endTime: '2024-03-24T23:59:59Z',
      status: 'active',
      isCompleted: true,
      score: 95
    },
    { 
      id: '3', 
      title: 'Ujian Akhir Semester - Bahasa Inggris', 
      subject: 'Umum',
      duration: 90,
      questions: 40,
      startTime: '2024-04-01T08:00:00Z',
      endTime: '2024-04-01T10:00:00Z',
      status: 'upcoming',
      isCompleted: false
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Daftar Ujian</h1>
        <p className="text-slate-500 font-medium">Pilih ujian yang tersedia untuk dikerjakan.</p>
      </div>

      <div className="grid gap-6">
        {exams.map((exam, i) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white rounded-3xl border border-slate-100 p-6 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-xl hover:border-primary/20 transition-all relative overflow-hidden"
          >
            {exam.isCompleted && (
              <div className="absolute top-0 right-0 p-1 px-3 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-bl-xl">
                Selesai
              </div>
            )}
            
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
              {exam.status === 'upcoming' ? (
                <Lock className="w-8 h-8 text-slate-300" />
              ) : (
                <Calendar className="w-8 h-8 text-slate-300 group-hover:text-primary transition-colors" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">{exam.subject}</span>
                <span className="text-slate-200">•</span>
                <div className="flex items-center gap-1 text-slate-500 text-xs font-bold">
                  <Clock className="w-3 h-3" />
                  {exam.duration} Menit
                </div>
                <span className="text-slate-200">•</span>
                <span className="text-slate-500 text-xs font-bold">{exam.questions} Soal</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors">{exam.title}</h3>
              <p className="text-slate-400 text-sm font-medium">
                Berakhir: {new Date(exam.endTime).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {exam.isCompleted ? (
                <div className="text-right mr-4">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Nilai Anda</p>
                  <p className="text-2xl font-black text-emerald-500">{exam.score}</p>
                </div>
              ) : null}

              {exam.status === 'upcoming' ? (
                <button disabled className="px-6 py-3 bg-slate-50 text-slate-400 rounded-2xl text-sm font-bold cursor-not-allowed">
                  Mendatang
                </button>
              ) : exam.isCompleted ? (
                <button className="px-6 py-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-100 transition-all">
                  <CheckCircle2 className="w-4 h-4" />
                  Lihat Hasil
                </button>
              ) : (
                <Link 
                  to={`/app/ujian/${exam.id}`}
                  className="px-8 py-3 bg-primary text-white rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-200 hover:bg-primary-hover transition-all group"
                >
                  Kerjakan
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-8 bg-amber-50 border border-amber-100 rounded-3xl flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-amber-800 tracking-tight">Perhatian Sebelum Ujian</h4>
          <ul className="text-sm text-amber-700/80 mt-2 space-y-1 font-medium list-disc ml-4">
            <li>Pastikan koneksi internet stabil selama pengerjaan.</li>
            <li>Waktu akan terus berjalan meski Anda menutup browser.</li>
            <li>Sistem akan otomatis mengumpulkan jawaban saat waktu habis.</li>
            <li>Dilarang membuka tab baru atau aplikasi lain selama ujian.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
