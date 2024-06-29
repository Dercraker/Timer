'use client';

import { useTimerStore } from '@/store/timerStore';
import { Title } from '@mantine/core';

export type TimerListProps = {};

export const TimerList = ({}: TimerListProps) => {
  const allTimers = useTimerStore().GetAllTimers();

  return allTimers.map((timer) => <Title>{timer.id}</Title>);
};
