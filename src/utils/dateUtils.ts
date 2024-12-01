import { StudySession } from '../types/study';

export const isToday = (date: string) => {
  const today = new Date();
  const sessionDate = new Date(date);
  return (
    sessionDate.getDate() === today.getDate() &&
    sessionDate.getMonth() === today.getMonth() &&
    sessionDate.getFullYear() === today.getFullYear()
  );
};

export const isThisWeek = (date: string) => {
  const today = new Date();
  const sessionDate = new Date(date);
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  firstDayOfWeek.setHours(0, 0, 0, 0);
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  lastDayOfWeek.setHours(23, 59, 59, 999);
  
  return sessionDate >= firstDayOfWeek && sessionDate <= lastDayOfWeek;
};

export const isThisMonth = (date: string) => {
  const today = new Date();
  const sessionDate = new Date(date);
  return (
    sessionDate.getMonth() === today.getMonth() &&
    sessionDate.getFullYear() === today.getFullYear()
  );
};