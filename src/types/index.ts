export type UserRole = 'admin' | 'guru' | 'siswa';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Exam {
  id: string;
  title: string;
  description?: string;
  duration: number; // in minutes
  startTime: string;
  endTime: string;
  status: 'draft' | 'active' | 'completed';
  createdBy: string;
  createdAt: string;
}

export interface Question {
  id: string;
  examId: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface Answer {
  id: string;
  resultId: string;
  questionId: string;
  selectedOption: 'A' | 'B' | 'C' | 'D';
}

export interface Result {
  id: string;
  examId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  submittedAt: string;
}
