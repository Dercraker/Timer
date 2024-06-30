'use client';

import { useTimerStore } from '@/store/timerStore';
import { Button, Group, NumberInput, Stack, useMatches } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrashX } from '@tabler/icons-react';
import { zodResolver } from 'mantine-form-zod-resolver';
import moment from 'moment';
import styles from './mainTimer.module.css';
import { TimerInputSchema } from './timerInput.schema';

export type MainTimerProps = {};

export const MainTimer = ({}: MainTimerProps) => {
  const canGrow = useMatches({
    base: true,
    xs: true,
    sm: false,
  });

  const timerForm = useForm<TimerInputSchema>({
    mode: 'controlled',
    initialValues: {
      hour: 0,
      minute: 0,
      second: 0,
    },
    validateInputOnChange: true,
    validate: zodResolver(TimerInputSchema),
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

  const handleSaveTimer = () => {
    const duration = moment.duration({
      hours: timerForm.values.hour,
      minutes: timerForm.values.minute,
      seconds: timerForm.values.second,
    });

    useTimerStore.getState().CreateTimer({ duration });
    handleResetAll();
  };

  return (
    <Group justify="center">
      <Stack>
        <Group pb="xs" justify="center">
          <NumberInput
            label={timerForm.values.hour > 0 ? 'Hours' : 'Hour'}
            min={0}
            allowDecimal={false}
            thousandSeparator=" "
            hideControls
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
            allowDecimal={false}
            thousandSeparator=" "
            hideControls
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
            allowDecimal={false}
            thousandSeparator=" "
            hideControls
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
        <Group grow={canGrow}>
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
            onClick={handleSaveTimer}
          >
            Create Timer
          </Button>
        </Group>
      </Stack>
    </Group>
  );
};
