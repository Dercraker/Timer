'use client';

import { Button, Group, NumberInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrashX } from '@tabler/icons-react';
import { zodResolver } from 'mantine-form-zod-resolver';
import styles from './mainTimer.module.css';
import { TimerSchema } from './timer.schema';

export type MainTimerProps = {};

export const MainTimer = ({}: MainTimerProps) => {
  const timerForm = useForm<TimerSchema>({
    mode: 'controlled',
    initialValues: {
      hour: 0,
      minute: 0,
      second: 0,
    },
    validateInputOnChange: true,
    validate: zodResolver(TimerSchema),
  });

  const isTimeZero = () =>
    timerForm.values.hour == 0 &&
    timerForm.values.minute == 0 &&
    timerForm.values.second == 0;
  const canClearMany = () =>
    (timerForm.values.hour !== 0 && timerForm.values.minute !== 0) ||
    (timerForm.values.hour !== 0 && timerForm.values.second !== 0) ||
    (timerForm.values.minute !== 0 && timerForm.values.second !== 0);

  const handleResetHours = () => timerForm.setFieldValue('hour', 0);
  const handleResetMinutes = () => timerForm.setFieldValue('minute', 0);
  const handleResetSecond = () => timerForm.setFieldValue('second', 0);
  const handleResetAll = () =>
    timerForm.setValues({
      hour: 0,
      minute: 0,
      second: 0,
    });

  return (
    <Group justify="center">
      <Stack>
        <Group>
          <NumberInput
            label={timerForm.values.hour > 0 ? 'Hours' : 'Hour'}
            min={0}
            suffix=" h"
            allowDecimal={false}
            thousandSeparator=" "
            hideControls
            defaultValue={0}
            classNames={{ label: styles.label, input: styles.input }}
            {...timerForm.getInputProps('hour')}
            rightSection={
              timerForm.values.hour > 0 && (
                <IconTrashX
                  color="var(--mantine-color-red-5)"
                  onClick={handleResetHours}
                />
              )
            }
          />
          <NumberInput
            label={timerForm.values.minute > 0 ? 'Minutes' : 'Minute'}
            min={0}
            max={59}
            suffix=" m"
            allowDecimal={false}
            thousandSeparator=" "
            hideControls
            defaultValue={0}
            classNames={{ label: styles.label, input: styles.input }}
            {...timerForm.getInputProps('minute')}
            rightSection={
              timerForm.values.minute > 0 && (
                <IconTrashX
                  color="var(--mantine-color-red-5)"
                  onClick={handleResetMinutes}
                />
              )
            }
          />
          <NumberInput
            label={timerForm.values.second > 0 ? 'Seconds' : 'Second'}
            min={0}
            max={59}
            suffix=" s"
            allowDecimal={false}
            thousandSeparator=" "
            hideControls
            defaultValue={0}
            classNames={{ label: styles.label, input: styles.input }}
            {...timerForm.getInputProps('second')}
            rightSection={
              timerForm.values.second > 0 && (
                <IconTrashX
                  color="var(--mantine-color-red-5)"
                  onClick={handleResetSecond}
                />
              )
            }
          />
        </Group>
        <Group>
          <Button
            disabled={!canClearMany()}
            fullWidth
            variant="outline"
            flex={1}
            color="var(--mantine-color-red-5)"
            leftSection={<IconTrashX />}
            onClick={handleResetAll}
          >
            Clear All
          </Button>
          <Button
            disabled={!timerForm.isValid() || isTimeZero()}
            fullWidth
            flex={2}
          >
            Create Timer
          </Button>
        </Group>
      </Stack>
    </Group>
  );
};
