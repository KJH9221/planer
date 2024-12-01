import React from 'react';
import { BarChart as BarChartIcon } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { StudySession } from '../types/study';

interface StudyChartsProps {
  sessions: StudySession[];
}

export default function StudyCharts({ sessions }: StudyChartsProps) {
  // 과목별 학습 시간 데이터 준비
  const subjectData = sessions.reduce((acc: Record<string, number>, session) => {
    acc[session.subject] = (acc[session.subject] || 0) + session.duration;
    return acc;
  }, {});

  const barData = Object.entries(subjectData).map(([subject, duration]) => ({
    subject,
    duration,
  }));

  // 일별 학습 시간 데이터 준비
  const dailyData = sessions.reduce((acc: Record<string, number>, session) => {
    const date = new Date(session.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + session.duration;
    return acc;
  }, {});

  const lineData = Object.entries(dailyData).map(([date, duration]) => ({
    date,
    duration,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BarChartIcon className="w-6 h-6 text-blue-500" />
        학습 통계 그래프
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">과목별 학습 시간</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="duration" name="학습 시간 (분)" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">일별 학습 시간 추이</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="duration"
                  name="학습 시간 (분)"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}