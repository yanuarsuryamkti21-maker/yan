import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Trophy, 
  Users, 
  Settings, 
  ChevronRight,
  GraduationCap,
  LogOut,
  Plus
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuthStore();
  const { isSidebarOpen, closeSidebar } = useUIStore();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/app/dashboard', roles: ['admin', 'guru', 'siswa'] },
    { icon: FileText, label: 'Ujian Saya', path: '/app/ujian', roles: ['siswa'] },
    { icon: GraduationCap, label: 'Manajemen Ujian', path: '/app/admin/exams', roles: ['admin', 'guru'] },
    { icon: Plus, label: 'Manajemen Soal', path: '/app/admin/questions', roles: ['admin', 'guru'] },
    { icon: Trophy, label: 'Riwayat Hasil', path: '/app/hasil', roles: ['admin', 'guru', 'siswa'] },
    { icon: Settings, label: 'User Management', path: '/app/admin/users', roles: ['admin'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role || ''));
  const jurusan = ['TKJ', 'DKV', 'AK', 'BC', 'MPLB', 'BD'];

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden" 
          onClick={closeSidebar}
        />
      )}

      <div className={cn(
        "w-[260px] h-screen bg-sidebar flex flex-col fixed left-0 top-0 z-40 border-r border-slate-800 transition-transform duration-300 lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 pb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-white text-base leading-none">Prima Unggul</h1>
              <p className="text-[11px] text-slate-400 mt-1">CBT Portal</p>
            </div>
          </div>
          
          <button 
            onClick={closeSidebar}
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 mt-2 overflow-y-auto">
          {filteredMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) => cn(
                "sidebar-nav-item",
                isActive && "active"
              )}
            >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="mt-10 px-6">
          <p className="text-[11px] text-slate-500 uppercase tracking-[0.1em] font-bold mb-4">Jurusan Tersedia</p>
          <div className="flex flex-wrap gap-1.5">
            {jurusan.map(j => (
              <span key={j} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold">
                {j}
              </span>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <p className="text-xs font-semibold text-white">Butuh Bantuan?</p>
          <p className="text-[11px] text-slate-400 mt-1">Hubungi Admin IT SMK Prima Unggul</p>
        </div>
      </div>
      </div>
    </>
  );
}
