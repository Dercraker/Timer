'use client';

import { useTimerStore } from '@/store/timerStore';
import {
  Button,
  Center,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconCursorText,
  IconShare,
  IconVolume,
  IconX,
} from '@tabler/icons-react';
import moment from 'moment';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export type TimerModalProps = {
  opened: boolean;
  close: () => void;

  timerId: string;
};

export const TimerModal = ({ opened, close, timerId }: TimerModalProps) => {
  const GetTimer = useTimerStore((s) => s.GetTimer);

  const currentTimer = GetTimer(timerId);

  if (!currentTimer) {
    return close();
  }
  const { duration, endAt, id, isRunning, name, timeLeft } = currentTimer;

  return (
    <Modal.Root opened={opened} onClose={close} centered radius="xl">
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Title>{name}</Title>
          </Modal.Title>
          <Modal.CloseButton icon={<IconX />} />
        </Modal.Header>
        <Modal.Body>
          <Stack justify="center" align="center">
            <Center>
              <Text fw={700} fz="h2">
                {moment(endAt).format('YYYY MMMM DD, HH:mm:ss')}
              </Text>
            </Center>
            <Group align="center" justify="center">
              {moment.duration(duration, 'milliseconds').days() !== 0 && (
                <CountdownCircleTimer
                  isPlaying={isRunning}
                  duration={
                    86400 * moment.duration(duration, 'milliseconds').asDays()
                  }
                  initialRemainingTime={moment
                    .duration(timeLeft, 'milliseconds')
                    .asSeconds()}
                  colors="#7950f2"
                  rotation="counterclockwise"
                  onComplete={(totalElapsedTime) => ({
                    shouldRepeat:
                      moment.duration(timeLeft, 'milliseconds').asDays() -
                        totalElapsedTime >
                      60,
                  })}
                >
                  {({ color }) => (
                    <Text fw={700} fz="h3" c={color}>
                      {moment.duration(timeLeft, 'milliseconds').days()} days
                    </Text>
                  )}
                </CountdownCircleTimer>
              )}

              <CountdownCircleTimer
                isPlaying={isRunning}
                duration={86400}
                initialRemainingTime={moment
                  .duration(timeLeft, 'milliseconds')
                  .asSeconds()}
                colors="#D14081"
                rotation="counterclockwise"
                onComplete={(totalElapsedTime) => ({
                  shouldRepeat:
                    moment.duration(timeLeft, 'milliseconds').asHours() -
                      totalElapsedTime >
                    60,
                })}
              >
                {({ color }) => (
                  <Text fw={700} fz="h3" c={color}>
                    {moment.duration(timeLeft, 'milliseconds').hours()} hours
                  </Text>
                )}
              </CountdownCircleTimer>
              <CountdownCircleTimer
                isPlaying={isRunning}
                duration={3600}
                initialRemainingTime={moment
                  .duration(timeLeft, 'milliseconds')
                  .asSeconds()}
                colors="#EF798A"
                rotation="counterclockwise"
                onComplete={(totalElapsedTime) => ({
                  shouldRepeat:
                    moment.duration(timeLeft, 'milliseconds').asMinutes() -
                      totalElapsedTime >
                    60,
                })}
              >
                {({ color }) => (
                  <Text fw={700} fz="h3" c={color}>
                    {moment.duration(timeLeft, 'milliseconds').minutes()}{' '}
                    minutes
                  </Text>
                )}
              </CountdownCircleTimer>
              <CountdownCircleTimer
                isPlaying={isRunning}
                duration={60}
                initialRemainingTime={moment
                  .duration(timeLeft, 'milliseconds')
                  .seconds()}
                colors="#218380"
                rotation="counterclockwise"
                onComplete={(totalElapsedTime) => ({
                  shouldRepeat:
                    moment.duration(timeLeft, 'milliseconds').asSeconds() -
                      totalElapsedTime >
                    0,
                })}
              >
                {({ remainingTime, color }) => (
                  <Text fw={700} fz="h3" c={color}>
                    {remainingTime} Seconds
                  </Text>
                )}
              </CountdownCircleTimer>
            </Group>
            <Group>
              <Button variant="outline" disabled leftSection={<IconVolume />}>
                Change sound
              </Button>
              <Button
                variant="outline"
                disabled
                leftSection={<IconCursorText />}
              >
                Change Name
              </Button>
            </Group>
            <Group>
              <Button variant="outline" disabled leftSection={<IconShare />}>
                Share
              </Button>
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
