import React, { useState } from 'react';
import { Clock, Book, User, FileText } from 'lucide-react';
import { StudySession } from '../types/study';

interface StudyFormProps {
  onSubmit: (session: Omit<StudySession, 'id'>) => void;
}

export default function StudyForm({ onSubmit }: StudyFormProps) {
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    duration: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      duration: Number(formData.duration),
      date: new Date().toISOString(),
    });
    setFormData({ studentId: '', subject: '', duration: '', notes: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Record Study Session</h2>
      
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <User className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            placeholder="Student ID"
            className="flex-1 p-2 border rounded-md"
            required
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <Book className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Subject"
            className="flex-1 p-2 border rounded-md"
            required
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="Duration (minutes)"
            className="flex-1 p-2 border rounded-md"
            required
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-gray-500" />
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Notes (optional)"
            className="flex-1 p-2 border rounded-md"
            rows={3}
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Record Session
      </button>
    </form>
  );
}