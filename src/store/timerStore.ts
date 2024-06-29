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

  TickTimers: () => void;
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

    GetTimeLeft(timerId: string): number | null {
      const timer = get().timers.find((timer) => timer.id === timerId);
      return timer ? timer.timeLeft : null;
    },

    GetTimer(timerId: string): TimerSchema | null {
      return get().timers.find((timer) => timer.id === timerId) || null;
    },

    CreateTimer({ duration }) {
      const timer: TimerSchema = {
        id: nanoid(11),
        name: `Timer ${get().timers.length + 1}`,
        duration: duration.asMilliseconds(),
        timeLeft: duration.asMilliseconds(),
        endAt: moment().add(duration, 'milliseconds').toDate().getTime(),
        isRunning: true,
      };

      get().AddTimer(timer);

      return timer;
    },

    TickTimers() {
      set((state) => ({
        timers: state.timers.map((timer) => {
          const currentTime = moment();
          const isTimeLeft = timer.timeLeft !== 0;
          const isNotEnded = moment(timer.endAt + 1).isAfter(currentTime);
          const shouldContinue = timer.isRunning && isTimeLeft && isNotEnded;

          return shouldContinue
            ? {
                ...timer,
                timeLeft: timer.timeLeft - 1000,
              }
            : {
                ...timer,
                timeLeft: 0,
                isRunning: false,
              };
        }),
      }));
    },
  }))
);
