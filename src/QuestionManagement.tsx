import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  Save, 
  X,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

interface Question {
  id: string;
  examId: string;
  examTitle: string;
  questionText: string;
  options: { key: string, text: string }[];
  correctAnswer: string;
}

export default function QuestionManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample Data
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      examId: '101',
      examTitle: 'Produktif TKJ - Jaringan Dasar',
      questionText: 'Apa fungsi utama dari router dalam sebuah jaringan?',
      options: [
        { key: 'A', text: 'Menghubungkan dua atau lebih jaringan yang berbeda' },
        { key: 'B', text: 'Memperkuat sinyal wifi' },
        { key: 'C', text: 'Menyimpan data website' },
        { key: 'D', text: 'Membuat kabel jaringan' }
      ],
      correctAnswer: 'A'
    }
  ]);

  const [newQuestion, setNewQuestion] = useState({
    examId: '',
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A'
  });

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const question: Question = {
      id: Math.random().toString(36).substr(2, 9),
      examId: newQuestion.examId,
      examTitle: 'Ujian Baru', // Simplified
      questionText: newQuestion.questionText,
      options: [
        { key: 'A', text: newQuestion.optionA },
        { key: 'B', text: newQuestion.optionB },
        { key: 'C', text: newQuestion.optionC },
        { key: 'D', text: newQuestion.optionD },
      ],
      correctAnswer: newQuestion.correctAnswer
    };

    setQuestions([question, ...questions]);
    setShowAddForm(false);
    setNewQuestion({
      examId: '',
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Manajemen Soal</h1>
          <p className="text-sm text-slate-500 font-medium">Kelola bank soal untuk seluruh mata pelajaran.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn-primary-polished flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Soal Baru
        </button>
      </div>

      {/* Stats Quick Look */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card-polished">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total Soal</p>
          <p className="text-xl font-bold text-slate-800">{questions.length}</p>
        </div>
        <div className="stat-card-polished">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Bank Soal Terpakai</p>
          <p className="text-xl font-bold text-slate-800">85%</p>
        </div>
        <div className="stat-card-polished border-emerald-100 bg-emerald-50/30">
          <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">Soal Baru (Bulan Ini)</p>
          <p className="text-xl font-bold text-emerald-700">+12</p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari teks soal..." 
            className="w-full h-11 pl-10 pr-4 bg-white border border-border-subtle rounded-xl text-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-4 h-11 border border-border-subtle rounded-xl flex items-center gap-2 text-slate-600 font-bold text-sm bg-white hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.filter(q => q.questionText.toLowerCase().includes(searchTerm.toLowerCase())).map((q) => (
          <motion.div 
            layout
            key={q.id} 
            className="card-polished"
          >
            <div className="p-5 flex gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase tabular-nums">ID: {q.id}</span>
                  <span className="text-slate-200">•</span>
                  <span className="text-xs font-bold text-primary">{q.examTitle}</span>
                </div>
                
                <p className="font-semibold text-slate-800 leading-relaxed">{q.questionText}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
                  {q.options.map((opt) => (
                    <div 
                      key={opt.key} 
                      className={cn(
                        "p-3 rounded-lg border flex items-center gap-3 text-sm transition-all",
                        q.correctAnswer === opt.key 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold" 
                          : "bg-slate-50 border-transparent text-slate-600"
                      )}
                    >
                      <span className={cn(
                        "w-6 h-6 flex items-center justify-center rounded-md font-black text-[10px] flex-shrink-0",
                        q.correctAnswer === opt.key ? "bg-emerald-500 text-white" : "bg-white border border-slate-200 text-slate-400"
                      )}>
                        {opt.key}
                      </span>
                      <span className="truncate">{opt.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-50">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setQuestions(questions.filter(prev => prev.id !== q.id))}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 px-8 border-b border-border-subtle flex justify-between items-center bg-slate-50">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Tambah Soal Baru</h2>
                  <p className="text-xs text-slate-500 font-medium">Isi detail pertanyaan di bawah ini.</p>
                </div>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleAddQuestion} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Teks Pertanyaan</label>
                    <textarea 
                      required
                      value={newQuestion.questionText}
                      onChange={(e) => setNewQuestion({...newQuestion, questionText: e.target.value})}
                      className="w-full min-h-[100px] p-4 bg-slate-50 border border-border-subtle rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none font-medium"
                      placeholder="Masukkan pertanyaan di sini..."
                    ></textarea>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Pilihan A</label>
                      <input 
                        required
                        type="text" 
                        value={newQuestion.optionA}
                        onChange={(e) => setNewQuestion({...newQuestion, optionA: e.target.value})}
                        className="w-full h-11 px-4 bg-slate-50 border border-border-subtle rounded-xl text-sm focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Pilihan B</label>
                      <input 
                        required
                        type="text" 
                        value={newQuestion.optionB}
                        onChange={(e) => setNewQuestion({...newQuestion, optionB: e.target.value})}
                        className="w-full h-11 px-4 bg-slate-50 border border-border-subtle rounded-xl text-sm focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Pilihan C</label>
                      <input 
                        required
                        type="text" 
                        value={newQuestion.optionC}
                        onChange={(e) => setNewQuestion({...newQuestion, optionC: e.target.value})}
                        className="w-full h-11 px-4 bg-slate-50 border border-border-subtle rounded-xl text-sm focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Pilihan D</label>
                      <input 
                        required
                        type="text" 
                        value={newQuestion.optionD}
                        onChange={(e) => setNewQuestion({...newQuestion, optionD: e.target.value})}
                        className="w-full h-11 px-4 bg-slate-50 border border-border-subtle rounded-xl text-sm focus:bg-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="w-1/2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Jawaban Benar</label>
                    <select 
                      value={newQuestion.correctAnswer}
                      onChange={(e) => setNewQuestion({...newQuestion, correctAnswer: e.target.value})}
                      className="w-full h-11 px-4 bg-slate-50 border border-border-subtle rounded-xl text-sm focus:bg-white outline-none appearance-none"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 h-12 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 h-12 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Soal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
