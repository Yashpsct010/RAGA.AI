import { create } from 'zustand';
import type { User } from 'firebase/auth';

interface AppState {
  user: User | null;
  isLoadingAuth: boolean;
  setUser: (user: User | null) => void;
  setLoadingAuth: (loading: boolean) => void;
  // UI Preferences
  patientViewMode: 'grid' | 'list';
  setPatientViewMode: (mode: 'grid' | 'list') => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null, // Will hold the authenticated user
  isLoadingAuth: true,
  setUser: (user) => set({ user, isLoadingAuth: false }),
  setLoadingAuth: (loading) => set({ isLoadingAuth: loading }),
  
  patientViewMode: 'grid',
  setPatientViewMode: (mode) => set({ patientViewMode: mode }),
}));
