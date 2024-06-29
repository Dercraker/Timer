import type { PageParams } from '@/types/next';
import { Stack } from '@mantine/core';
import { MainTimer } from './_component/mainTimer/mainTimer';
import { TimerList } from './_component/timerList';

const RoutePage = ({}: PageParams) => {
  return (
    <Stack>
      <MainTimer />
      <TimerList />
    </Stack>
  );
};

export default RoutePage;
