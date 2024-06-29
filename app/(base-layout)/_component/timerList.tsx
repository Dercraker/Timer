'use client';

import { useTimerStore } from '@/store/timerStore';
import { Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { TimerCard } from './timerCard';
import { TimerModal } from './timerModal';

export type TimerListProps = {};

export const TimerList = ({}: TimerListProps) => {
  const allTimers = useTimerStore((s) => s.timers);
  const TickTimers = useTimerStore((s) => s.TickTimers);

  const [selectedTimer, setSelectedTimer] = useState<string | null>(null);
  const [timerModalOpened, { open: openTimerModal, close: closeTimerModal }] =
    useDisclosure(false);

  useEffect(() => {
    const internalClock = setInterval(() => {
      TickTimers();
    }, 1000);
    if (!allTimers.length) clearInterval(internalClock);

    return () => clearInterval(internalClock);
  }, [allTimers]);

  const handleOpenModal = (timerId: string) => {
    setSelectedTimer(timerId);
    openTimerModal();
  };

  return (
    <>
      <Group align="center" justify="center">
        {allTimers.map((timer) => (
          <TimerCard
            key={timer.id}
            timer={timer}
            onClick={() => handleOpenModal(timer.id)}
          />
        ))}
      </Group>
      <TimerModal
        opened={timerModalOpened}
        close={closeTimerModal}
        timerId={selectedTimer as string}
      />
    </>
  );
};
