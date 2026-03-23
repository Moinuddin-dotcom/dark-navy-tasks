import { useState, useEffect } from 'react';
import type { User } from '@/lib/types';

const AUTH_KEY = 'kanban_user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData: User) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  return { user, login, logout };
}
