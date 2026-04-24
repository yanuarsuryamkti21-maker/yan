import React from 'react';
import { Bell, Search, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <header className="h-16 bg-white border-b border-border-subtle sticky top-0 z-10 px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-slate-500 text-sm">Selamat Datang, </span>
        <span className="font-bold text-slate-800 text-sm">{user?.name} (XII-TKJ-1)</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
        </button>
        
        <div className="w-px h-6 bg-slate-200 mx-2"></div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-500 border border-border-subtle rounded-md hover:bg-slate-50 hover:text-red-500 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar Aplikasi</span>
        </button>
      </div>
    </header>
  );
}
