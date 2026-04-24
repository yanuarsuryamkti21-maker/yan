import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Clock, 
  AlertCircle,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuthStore } from '../store/useAuthStore';

export default function TakeExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Sample questions
  const questions = [
    {
      id: 1,
      text: "Apa yang dimaksud dengan IP Address dalam jaringan komputer?",
      options: [
        { key: 'A', text: "Alamat fisik perangkat keras" },
        { key: 'B', text: "Pengidentifikasi numerik unik untuk setiap perangkat dalam jaringan" },
        { key: 'C', text: "Protokol keamanan data" },
        { key: 'D', text: "Kabel penghubung antar komputer" }
      ]
    },
    {
      id: 2,
      text: "Protokol mana yang digunakan untuk mengirim email?",
      options: [
        { key: 'A', text: "HTTP" },
        { key: 'B', text: "FTP" },
        { key: 'C', text: "SMTP" },
        { key: 'D', text: "SNMP" }
      ]
    },
    {
      id: 3,
      text: "Topologi jaringan yang setiap komputernya terhubung ke satu hub pusat disebut?",
      options: [
        { key: 'A', text: "Ring" },
        { key: 'B', text: "Star" },
        { key: 'C', text: "Bus" },
        { key: 'D', text: "Mesh" }
      ]
    }
  ];

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: option }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/app/hasil');
    }, 2000);
  };

  if (isSubmitting) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-6">
        <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <h2 className="text-2xl font-black text-slate-900">Menyimpan Jawaban...</h2>
        <p className="text-slate-500 max-w-sm">Mohon jangan tutup halaman ini. Hasil ujian Anda sedang dikalkulasi.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Panel */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm sticky top-24 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center font-bold text-primary border border-primary/10">
            {currentQuestion + 1}
          </div>
          <div>
            <h2 className="font-bold text-slate-900">Pertanyaan Ke-{currentQuestion + 1}</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sisa {questions.length - currentQuestion - 1} Soal Lagi</p>
          </div>
        </div>

        <div className={cn(
          "flex items-center gap-3 px-6 py-3 rounded-2xl border font-black text-xl transition-all duration-300",
          timeLeft < 300 ? "bg-red-50 border-red-200 text-red-600 animate-pulse" : "bg-slate-50 border-slate-200 text-slate-900"
        )}>
          <Clock className={cn("w-6 h-6", timeLeft < 300 ? "text-red-500" : "text-slate-400")} />
          {formatTime(timeLeft)}
        </div>

        <button 
          onClick={() => setShowConfirm(true)}
          className="px-6 py-3 bg-emerald-500 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all"
        >
          <Send className="w-4 h-4" />
          Selesaikan Ujian
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Question Area */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm"
            >
              <div className="prose prose-slate max-w-none mb-10">
                <p className="text-xl font-bold text-slate-800 leading-relaxed">
                  {questions[currentQuestion].text}
                </p>
              </div>

              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleSelect(option.key)}
                    className={cn(
                      "group flex items-center gap-4 p-5 rounded-[1.5rem] border-2 text-left transition-all duration-200",
                      answers[currentQuestion] === option.key 
                        ? "bg-primary/5 border-primary shadow-md shadow-red-50" 
                        : "bg-slate-50/50 border-transparent hover:border-slate-200 hover:bg-white"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all",
                      answers[currentQuestion] === option.key 
                        ? "bg-primary text-white" 
                        : "bg-white text-slate-400 group-hover:text-slate-700 border border-slate-200"
                    )}>
                      {option.key}
                    </div>
                    <span className={cn(
                      "font-bold text-lg",
                      answers[currentQuestion] === option.key ? "text-primary" : "text-slate-600 group-hover:text-slate-900"
                    )}>
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <button 
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              Sebelumnya
            </button>
            <div className="flex items-center gap-2 text-slate-400 font-black text-sm">
              SOAL {currentQuestion + 1} DARI {questions.length}
            </div>
            <button 
              disabled={currentQuestion === questions.length - 1}
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-all group"
            >
              Berikutnya
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Navigation Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <LayoutGrid className="w-4 h-4 text-slate-400" />
              <h3 className="font-bold text-slate-900 text-sm">Navigasi Soal</h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={cn(
                    "h-10 rounded-xl font-black text-xs transition-all border-2 flex items-center justify-center",
                    currentQuestion === i 
                      ? "bg-primary border-primary text-white shadow-lg shadow-red-100" 
                      : answers[i] 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                        : "bg-slate-50 border-transparent text-slate-400 hover:border-slate-200"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-xs font-bold text-slate-500">Sedang Dibuka</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-xs font-bold text-slate-500">Sudah Dijawab</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                <span className="text-xs font-bold text-slate-500">Belum Dijawab</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-100 rounded-3xl p-6 text-red-600 space-y-3">
            <AlertCircle className="w-6 h-6" />
            <p className="text-xs font-bold leading-relaxed">
              Jawaban otomatis disimpan setiap detik. Selesaikan ujian sebelum waktu berakhir.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-[2rem] p-10 shadow-2xl space-y-8"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Selesaikan Ujian?</h2>
              <p className="text-slate-500 font-medium mt-2">Pastikan semua pertanyaan telah dijawab dengan benar.</p>
            </div>

            <div className="flex bg-slate-50 rounded-2xl p-4 gap-4">
              <div className="flex-1 text-center">
                <p className="text-[10px] text-slate-400 font-black uppercase">Dijawab</p>
                <p className="text-xl font-black text-emerald-600">{Object.keys(answers).length}</p>
              </div>
              <div className="w-px h-10 bg-slate-200 my-auto"></div>
              <div className="flex-1 text-center">
                <p className="text-[10px] text-slate-400 font-black uppercase">Kosong</p>
                <p className="text-xl font-black text-red-500">{questions.length - Object.keys(answers).length}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                Batal
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all"
              >
                Ya, Selesai
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
