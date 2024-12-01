import React from 'react';
import { Calendar, Clock, CalendarDays, CalendarRange } from 'lucide-react';
import { StudySession } from '../types/study';
import { getDailyStudyTime, getWeeklyStudyTime, getMonthlyStudyTime } from '../utils/statistics';

interface TimeBasedStatsProps {
  sessions: StudySession[];
}

export default function TimeBasedStats({ sessions }: TimeBasedStatsProps) {
  const dailyTime = getDailyStudyTime(sessions);
  const weeklyTime = getWeeklyStudyTime(sessions);
  const monthlyTime = getMonthlyStudyTime(sessions);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Clock className="w-5 h-5 text-indigo-500" />
        시간별 학습 통계
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center gap-2 text-indigo-700">
            <Calendar className="w-5 h-5" />
            <h4 className="font-semibold">오늘 학습량</h4>
          </div>
          <p className="text-2xl font-bold text-indigo-900 mt-2">
            {Math.round(dailyTime)} 분
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2 text-purple-700">
            <CalendarDays className="w-5 h-5" />
            <h4 className="font-semibold">이번 주 학습량</h4>
          </div>
          <p className="text-2xl font-bold text-purple-900 mt-2">
            {Math.round(weeklyTime)} 분
          </p>
        </div>

        <div className="p-4 bg-pink-50 rounded-lg">
          <div className="flex items-center gap-2 text-pink-700">
            <CalendarRange className="w-5 h-5" />
            <h4 className="font-semibold">이번 달 학습량</h4>
          </div>
          <p className="text-2xl font-bold text-pink-900 mt-2">
            {Math.round(monthlyTime)} 분
          </p>
        </div>
      </div>
    </div>
  );
}