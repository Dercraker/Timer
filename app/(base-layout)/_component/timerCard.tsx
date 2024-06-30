'use client';

import { useTimerStore } from '@/store/timerStore';
import { TimerSchema } from '@/types/Timer.schema';
import {
  ActionIcon,
  ActionIconGroup,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBellRinging,
  IconPlayerPause,
  IconPlayerPlay,
  IconRepeat,
  IconTrashX,
} from '@tabler/icons-react';
import moment from 'moment';
import { useMemo } from 'react';

export type TimerCardProps = {
  timer: TimerSchema;
  onClick?: () => void;
};

export const TimerCard = ({
  timer: { id, isRunning, duration, endAt, name, timeLeft },
  onClick,
}: TimerCardProps) => {
  const leftDuration = useMemo(
    () => moment.duration(timeLeft, 'milliseconds'),
    [timeLeft]
  );
  const timeLeftDays = useMemo(() => leftDuration.days(), [leftDuration]);
  const timeLeftHours = useMemo(() => leftDuration.hours(), [leftDuration]);
  const timeLeftMinutes = useMemo(() => leftDuration.minutes(), [leftDuration]);
  const timeLeftSeconds = useMemo(() => leftDuration.seconds(), [leftDuration]);

  const RemoveTimer = useTimerStore((s) => s.RemoveTimer);
  const PauseTimer = useTimerStore((s) => s.PauseTimer);
  const StartTimer = useTimerStore((s) => s.StartTimer);
  const ReloadEndAt = useTimerStore((s) => s.ReloadEndAt);
  const RestartTimer = useTimerStore((s) => s.RestartTimer);

  return (
    <Paper
      withBorder
      radius="xl"
      shadow="xl"
      p="xl"
      className="cursor-pointer select-none hover:bg-mantine-color-default-hover"
      onClick={onClick}
      onMouseOver={() => (!isRunning ? ReloadEndAt(id) : null)}
      w="18.75em"
    >
      <Stack>
        <Title order={3} ta="center" td="underline">
          {name}
        </Title>
        <Group gap="xs">
          {moment.duration(duration).days() > 0 && (
            <>
              <Text fz="h3">{timeLeftDays} d</Text>
              <Text fz="h3">:</Text>
            </>
          )}
          <Text fz="h3">{timeLeftHours} h</Text>
          <Text fz="h3">:</Text>
          <Text fz="h3">{timeLeftMinutes}m</Text>
          <Text fz="h3">:</Text>
          <Text fz="h3">{timeLeftSeconds}s</Text>
        </Group>
        <Group gap="0" c="dimmed" fs="italic">
          <IconBellRinging />
          <Text>{moment(endAt).format('YYYY/MM/DD, HH:mm:ss')}</Text>
        </Group>

        <Group justify="space-between">
          <ActionIcon
            variant="outline"
            color="var(--mantine-color-red-5)"
            onClick={(e) => {
              e.stopPropagation();
              RemoveTimer(id);
            }}
          >
            <IconTrashX />
          </ActionIcon>
          <ActionIconGroup>
            {isRunning ? (
              <ActionIcon
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  PauseTimer(id);
                }}
              >
                <IconPlayerPause />
              </ActionIcon>
            ) : (
              <ActionIcon
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  StartTimer(id);
                }}
              >
                <IconPlayerPlay />
              </ActionIcon>
            )}

            <ActionIcon
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                RestartTimer(id);
              }}
            >
              <IconRepeat />
            </ActionIcon>
          </ActionIconGroup>
        </Group>
      </Stack>
    </Paper>
  );
};
