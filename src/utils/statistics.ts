import { StudySession } from '../types/study';
import { isToday, isThisWeek, isThisMonth } from './dateUtils';

export const calculateTotalStudyTime = (sessions: StudySession[]): number => {
  return sessions.reduce((total, session) => total + session.duration, 0);
};

export const calculateAverageStudyTime = (sessions: StudySession[]): number => {
  if (sessions.length === 0) return 0;
  return calculateTotalStudyTime(sessions) / sessions.length;
};

export const getStudyTimeBySubject = (sessions: StudySession[]): Record<string, number> => {
  return sessions.reduce((acc, session) => {
    acc[session.subject] = (acc[session.subject] || 0) + session.duration;
    return acc;
  }, {} as Record<string, number>);
};

export const getDailyStudyTime = (sessions: StudySession[]): number => {
  return calculateTotalStudyTime(sessions.filter(session => isToday(session.date)));
};

export const getWeeklyStudyTime = (sessions: StudySession[]): number => {
  return calculateTotalStudyTime(sessions.filter(session => isThisWeek(session.date)));
};

export const getMonthlyStudyTime = (sessions: StudySession[]): number => {
  return calculateTotalStudyTime(sessions.filter(session => isThisMonth(session.date)));
};