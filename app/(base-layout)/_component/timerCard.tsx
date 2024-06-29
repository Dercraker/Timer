'use client';

import { TimerSchema } from '@/types/Timer.schema';
import { Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconBellRinging } from '@tabler/icons-react';
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

  return (
    <Paper
      withBorder
      radius="xl"
      shadow="xl"
      p="xl"
      className="cursor-pointer select-none transition-transform duration-200 ease-in-out transform hover:translate-y-1 hover:bg-mantine-color-default-hover"
      onClick={onClick}
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
      </Stack>
    </Paper>
  );
};
