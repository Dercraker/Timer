'use client';

import { useTimerStore } from '@/store/timerStore';
import { Button, Popover, TextInput } from '@mantine/core';
import { IconCursorText } from '@tabler/icons-react';

export type ChangeTimerNameProps = {
  timerId: string;
  timerName: string;
};

export const ChangeTimerName = ({
  timerId,
  timerName,
}: ChangeTimerNameProps) => {
  const ChangeName = useTimerStore((s) => s.ChangeName);

  return (
    <Popover width={300} trapFocus position="top" shadow="md">
      <Popover.Target>
        <Button variant="outline" leftSection={<IconCursorText />}>
          Change Name
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <TextInput
          label="Timer Name"
          withAsterisk
          placeholder="Name"
          value={timerName}
          size="xs"
          onChange={(e) => ChangeName(timerId, e.target.value)}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
