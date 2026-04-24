import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock login logic for preview stability
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === 'admin123') {
        setUser({
          id: '1',
          name: 'Administrator',
          email: 'admin@gmail.com',
          role: 'admin',
          createdAt: new Date().toISOString()
        });
        navigate('/app/dashboard');
      } else if (email === 'guru@gmail.com' && password === 'guru123') {
        setUser({
          id: '2',
          name: 'Bpk. Budi Santoso',
          email: 'guru@gmail.com',
          role: 'guru',
          createdAt: new Date().toISOString()
        });
        navigate('/app/dashboard');
      } else if (email === 'siswa@gmail.com' && password === 'siswa123') {
        setUser({
          id: '3',
          name: 'Ahmad Fauzi',
          email: 'siswa@gmail.com',
          role: 'siswa',
          createdAt: new Date().toISOString()
        });
        navigate('/app/dashboard');
      } else {
        setError('Email atau password salah. Coba: admin@gmail.com / admin123');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-[-20deg] translate-x-1/2"></div>
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
          <div className="p-10 pt-12 text-center bg-slate-50 border-b border-slate-100">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-red-200 group-hover:rotate-12 transition-transform">
                <GraduationCap className="text-white w-7 h-7" />
              </div>
            </Link>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Selamat Datang</h1>
            <p className="text-slate-500 font-medium">Masuk ke Portal CBT Prima Unggul</p>
          </div>

          <form onSubmit={handleLogin} className="p-10 space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm font-medium"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Sekolah</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kata Sandi</label>
                <a href="#" className="text-xs font-bold text-primary hover:underline">Lupa Sandi?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-xl shadow-red-200 hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:pointer-events-none group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Masuk Sekarang
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="px-10 pb-10 text-center">
            <p className="text-slate-500 text-sm font-medium">Bukan Siswa Prima Unggul? <a href="#" className="text-primary font-bold hover:underline">Hubungi Admin</a></p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-slate-400 text-sm font-medium">
          Dikelola oleh Tim IT SMK Prima Unggul &copy; 2024
        </p>
      </motion.div>
    </div>
  );
}
