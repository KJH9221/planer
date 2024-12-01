export interface User {
  id: string;
  email: string;
  name: string;
  grade?: string;
  school?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  userId: string;
  name: string;
  grade?: string;
  school?: string;
  bio?: string;
  subjects?: string[];
}