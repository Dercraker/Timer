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

  TickTimers: () => void;
  PauseTimer: (timerId: string) => void;
  StartTimer: (timerId: string) => void;
  CalculateAllRealTimeLeft: () => void;
  ReloadEndAt: (timerId: string) => void;
  RestartTimer: (timerId: string) => void;

  ChangeName: (timerId: string, newName: string) => void;
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
          const isTimeLeft = timer.timeLeft >= 0;
          const shouldContinue = timer.isRunning && isTimeLeft;

          return shouldContinue
            ? {
                ...timer,
                timeLeft: timer.timeLeft - 1000,
              }
            : timer.timeLeft < 0
              ? {
                  ...timer,
                  timeLeft: 0,
                  isRunning: false,
                }
              : {
                  ...timer,
                  isRunning: false,
                };
        }),
      }));
    },

    PauseTimer(timerId) {
      set((state) => ({
        timers: state.timers.map((timer) => {
          if (timer.id === timerId) {
            return { ...timer, isRunning: false };
          }
          return timer;
        }),
      }));
    },

    StartTimer(timerId) {
      set((state) => ({
        timers: state.timers.map((timer) => {
          if (timer.id === timerId) {
            return { ...timer, isRunning: true };
          }
          return timer;
        }),
      }));
    },

    CalculateAllRealTimeLeft() {
      set((state) => ({
        timers: state.timers.map((timer) => {
          const currentTime = moment();
          const timeLeft = moment(timer.endAt).diff(
            currentTime,
            'milliseconds'
          );
          return { ...timer, timeLeft };
        }),
      }));
    },

    ReloadEndAt(timerId) {
      set((state) => ({
        timers: state.timers.map((timer) => {
          if (timer.id === timerId && timer.timeLeft !== 0) {
            return {
              ...timer,
              endAt: moment()
                .add(timer.timeLeft, 'milliseconds')
                .toDate()
                .getTime(),
            };
          }
          return timer;
        }),
      }));
    },

    RestartTimer(timerId) {
      set((state) => ({
        timers: state.timers.map((timer) => {
          if (timer.id === timerId) {
            return {
              ...timer,
              timeLeft: timer.duration,
              endAt: moment()
                .add(timer.duration, 'milliseconds')
                .toDate()
                .getTime(),
            };
          }
          return timer;
        }),
      }));
    },

    ChangeName(timerId, newName) {
      set((state) => ({
        timers: state.timers.map((timer) => {
          if (timer.id === timerId) {
            return { ...timer, name: newName };
          }
          return timer;
        }),
      }));
    },
  }))
);
