import React from 'react';
import { BarChart, Clock, BookOpen } from 'lucide-react';
import { StudySession } from '../types/study';
import { calculateTotalStudyTime, calculateAverageStudyTime, getStudyTimeBySubject } from '../utils/statistics';
import TimeBasedStats from './TimeBasedStats';

interface StudyStatisticsProps {
  sessions: StudySession[];
}

export default function StudyStatistics({ sessions }: StudyStatisticsProps) {
  const totalTime = calculateTotalStudyTime(sessions);
  const averageTime = calculateAverageStudyTime(sessions);
  const timeBySubject = getStudyTimeBySubject(sessions);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BarChart className="w-6 h-6 text-blue-500" />
        학습 통계
      </h2>

      <TimeBasedStats sessions={sessions} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-700">
            <Clock className="w-5 h-5" />
            <h3 className="font-semibold">전체 학습 시간</h3>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-2">
            {Math.round(totalTime)} 분
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 text-green-700">
            <Clock className="w-5 h-5" />
            <h3 className="font-semibold">평균 학습 시간</h3>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-2">
            {Math.round(averageTime)} 분
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-500" />
          과목별 학습 시간
        </h3>
        <div className="space-y-2">
          {Object.entries(timeBySubject).map(([subject, time]) => (
            <div key={subject} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="font-medium">{subject}</span>
              <span className="text-gray-600">{Math.round(time)} 분</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}