import React, { useState, useEffect } from 'react';
import { StudySession } from './types/study';
import StudyForm from './components/StudyForm';
import StudyStatistics from './components/StudyStatistics';
import StudyCharts from './components/StudyCharts';
import AuthWrapper from './components/AuthWrapper';
import UserProfile from './components/UserProfile';
import { GraduationCap, LogOut, User } from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUserId(session?.user.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    setUserId(session?.user.id || null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserId(null);
  };

  if (!isAuthenticated || !userId) {
    return <AuthWrapper onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">학습 관리 시스템</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <User className="w-4 h-4" />
              프로필
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {showProfile ? (
              <UserProfile userId={userId} />
            ) : (
              <>
                <StudyForm onSubmit={handleSubmitSession} />
                <StudyCharts sessions={sessions} />
              </>
            )}
          </div>
          <StudyStatistics sessions={sessions} />
        </div>
      </div>
    </div>
  );
}

export default App;