import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ExamList from './pages/ExamList';
import TakeExam from './pages/TakeExam';
import Results from './pages/Results';
import QuestionManagement from './QuestionManagement';
import AppLayout from './components/layout/AppLayout';

// Other pages (stubs)
const AdminUsers = () => <div className="p-8"><h1 className="text-2xl font-black text-slate-900 tracking-tight">Manajemen User</h1><p className="text-slate-500 font-medium">Halaman manajemen user sedang dikembangkan.</p></div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ujian" element={<ExamList />} />
          <Route path="ujian/:id" element={<TakeExam />} />
          <Route path="hasil" element={<Results />} />
          
          {/* Admin/Guru Only Routes */}
          <Route path="admin/exams" element={<ExamList />} />
          <Route path="admin/questions" element={<QuestionManagement />} />
          <Route path="admin/users" element={<AdminUsers />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
