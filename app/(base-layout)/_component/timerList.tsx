'use client';

import { useTimerStore } from '@/store/timerStore';
import { Group } from '@mantine/core';
import { useEffect } from 'react';
import { TimerCard } from './timerCard';

export type TimerListProps = {};

export const TimerList = ({}: TimerListProps) => {
  const allTimers = useTimerStore((s) => s.timers);
  const TickTimers = useTimerStore((s) => s.TickTimers);
  const RemoveTimer = useTimerStore((s) => s.RemoveTimer);

  useEffect(() => {
    const internalClock = setInterval(() => {
      console.debug('🚀 ~ TimerList ~ allTimers:', allTimers);
      TickTimers();
    }, 1000);
    if (!allTimers.length) clearInterval(internalClock);

    return () => clearInterval(internalClock);
  }, [allTimers]);

  return (
    <Group align="center" justify="center">
      {allTimers.map((timer) => (
        <TimerCard
          key={timer.id}
          timer={timer}
          onClick={() => RemoveTimer(timer.id)}
        />
      ))}
    </Group>
  );
};
