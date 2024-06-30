'use client';

import { useTimerStore } from '@/store/timerStore';
import { Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { TimerCard } from './timerCard';
import { TimerModal } from './timerModal';

export type TimerListProps = {};

export const TimerList = ({}: TimerListProps) => {
  const allTimers = useTimerStore((s) => s.timers);
  const TickTimers = useTimerStore((s) => s.TickTimers);
  const CalculateAllRealTimeLeft = useTimerStore(
    (s) => s.CalculateAllRealTimeLeft
  );

  const [selectedTimer, setSelectedTimer] = useState<string | null>(null);
  const [timerModalOpened, { open: openTimerModal, close: closeTimerModal }] =
    useDisclosure(false);

  useEffect(() => CalculateAllRealTimeLeft(), []);

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

  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      <Group align="center" justify="center">
        {allTimers.map((timer) => (
          <TimerCard
            key={timer.id}
            timer={timer}
            onClick={() => handleOpenModal(timer.id)}
            onComplete={() => {
              console.log('aaaaaaa');
              audioRef.current?.play();
              setTimeout(() => audioRef.current?.pause(), 3000);
            }}
          />
        ))}
      </Group>
      <audio
        ref={audioRef}
        src="/assets/clock-alarm-8761.mp3"
        preload="auto"
      ></audio>
      <TimerModal
        opened={timerModalOpened}
        close={closeTimerModal}
        timerId={selectedTimer!}
      />
    </>
  );
};
