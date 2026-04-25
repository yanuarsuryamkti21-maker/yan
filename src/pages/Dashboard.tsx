import React from 'react';
import { 
  Users, 
  FileText, 
  Trophy, 
  Clock, 
  Plus, 
  ArrowUpRight, 
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuthStore();

  const stats = [
    { label: 'Ujian Aktif', value: '03' },
    { label: 'Selesai', value: '18' },
    { label: 'Rata-rata Nilai', value: '84.5' },
    { label: 'Peringkat Kelas', value: '#04' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-card-polished group flex flex-col"
          >
            <p className="text-[12px] text-slate-500 font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card-polished">
            <div className="p-4 px-6 border-b border-border-subtle flex justify-between items-center">
              <h2 className="font-semibold text-base text-slate-800">Ujian Tersedia Hari Ini</h2>
              <span className="text-[12px] font-bold text-primary">Senin, 24 Mei 2024</span>
            </div>
            
            <div className="divide-y divide-border-subtle">
              {[
                { id: '1', title: 'Matematika - Ujian Akhir Semester', duration: 90, guru: 'Dra. Sumarni', status: 'tersedia' },
                { id: '2', title: 'Administrasi Infrastruktur Jaringan', duration: 120, guru: 'Bpk. Ridwan', status: 'tersedia' },
                { id: '3', title: 'Bahasa Inggris - Listening Section', duration: 45, guru: 'Ms. Diana', status: 'menunggu', time: 'Mulai 13:00 WIB' }
              ].map((exam, i) => (
                <div key={i} className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{exam.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Durasi: {exam.duration} Menit • Guru: {exam.guru}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    {exam.status === 'tersedia' ? (
                      <>
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold">Tersedia</span>
                        {(user?.role === 'admin' || user?.role === 'guru') ? (
                          <div className="flex gap-2">
                            <Link to="/app/admin/questions" className="text-[11px] font-bold text-slate-400 hover:text-primary transition-colors underline underline-offset-4">Kelola</Link>
                            <Link to={`/app/ujian/${exam.id}`} className="btn-primary-polished no-underline inline-block text-center py-1.5 px-4 text-[12px]">Preview</Link>
                          </div>
                        ) : (
                          <Link to={`/app/ujian/${exam.id}`} className="btn-primary-polished no-underline inline-block text-center">Kerjakan</Link>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[11px] font-bold uppercase tracking-wider">Menunggu</span>
                        <span className="text-[11px] text-slate-400 font-medium">{exam.time}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-polished">
            <div className="p-4 px-6 border-b border-border-subtle">
              <h2 className="font-semibold text-base text-slate-800">Informasi</h2>
            </div>
            <div className="p-5">
              <div className="border-l-4 border-primary pl-4 mb-8">
                <p className="text-[13px] font-bold text-primary mb-1">PENTING!</p>
                <p className="text-[12px] text-slate-600 leading-relaxed font-medium">Pastikan koneksi internet stabil sebelum memulai ujian. Dilarang membuka tab lain saat pengerjaan.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-[12px] font-bold text-slate-800">Log Aktivitas</h3>
                {[
                  { label: 'Login Berhasil', time: 'Hari ini, 07:30 WIB', color: 'bg-emerald-500' },
                  { label: 'Ujian Bahasa Indonesia Selesai', time: 'Kemarin, 14:20 WIB', color: 'bg-emerald-500' }
                ].map((log, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-2 h-2 ${log.color} rounded-full mt-1.5`}></div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800">{log.label}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
