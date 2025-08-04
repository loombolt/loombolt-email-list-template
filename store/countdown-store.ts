import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CountdownState {
  endDate: string;
  setEndDate: (date: Date) => void;
  isVisible: boolean;
  toggleVisibility: () => void;
}

export const useCountdownStore = create<CountdownState>()(
  persist(
    (set) => {
      // Default end date is 7 days from now
      const defaultEndDate = new Date();
      defaultEndDate.setDate(defaultEndDate.getDate() + 7);
      
      return {
        endDate: defaultEndDate.toISOString(),
        setEndDate: (date: Date) => set({ endDate: date.toISOString() }),
        isVisible: true,
        toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),
      };
    },
    {
      name: 'countdown-storage',
    }
  )
);
