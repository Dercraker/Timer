import { TimerSchema } from '@/types/Timer.schema';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { StateCreator, create } from 'zustand';
import { persist } from 'zustand/middleware';

type TimerStore = {
  timers: TimerSchema[];
  AddTimer: (timer: TimerSchema) => void;
  RemoveTimer: (timerId: string) => void;
  CreateTimer: ({ duration }: { duration: moment.Duration }) => TimerSchema;
  GetTimer: (timerId: string) => TimerSchema | null;
  GetAllTimers: () => TimerSchema[];
};

const timerMiddlewares = (f: StateCreator<TimerStore>) =>
  persist(f, { name: 'timers' });

export const useTimerStore = create<TimerStore>()(
  timerMiddlewares((set, get) => ({
    timers: [],

    AddTimer(timer: TimerSchema) {
      set((state) => ({
        timers: [...state.timers, timer],
      }));
    },

    RemoveTimer(timerId: string) {
      set((state) => ({
        timers: state.timers.filter((timer) => timer.id !== timerId),
      }));
    },

    GetTimer(timerId: string): TimerSchema | null {
      return get().timers.find((timer) => timer.id === timerId) || null;
    },

    CreateTimer({ duration }) {
      const timer: TimerSchema = {
        id: nanoid(11),
        duration: duration,
        timeLeft: duration,
        endAt: moment().add(duration, 'milliseconds'),
        isRunning: false,
      };

      get().AddTimer(timer);

      return timer;
    },

    GetAllTimers(): TimerSchema[] {
      return get().timers;
    },
  }))
);
