import React, { useState, useEffect } from 'react';
import { User, Settings, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { UserProfile as IUserProfile } from '../types/user';

interface UserProfileProps {
  userId: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [formData, setFormData] = useState<Partial<IUserProfile>>({});

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
      setFormData(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('user_profiles')
        .update(formData)
        .eq('user_id', userId);

      if (error) throw error;
      setProfile({ ...profile, ...formData } as IUserProfile);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <User className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold">프로필 관리</h2>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
        >
          <Settings className="w-5 h-5" />
          {editing ? '취소' : '수정'}
        </button>
      </div>

      <div className="space-y-4">
        {editing ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">이름</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">학년</label>
              <input
                type="text"
                value={formData.grade || ''}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">학교</label>
              <input
                type="text"
                value={formData.school || ''}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Save className="w-4 h-4" />
              저장
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
              <span className="font-medium w-24">이름:</span>
              <span>{profile?.name}</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
              <span className="font-medium w-24">학년:</span>
              <span>{profile?.grade || '-'}</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
              <span className="font-medium w-24">학교:</span>
              <span>{profile?.school || '-'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}