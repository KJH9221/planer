export interface StudySession {
  id: string;
  studentId: string;
  subject: string;
  duration: number; // in minutes
  date: string;
  notes?: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
}