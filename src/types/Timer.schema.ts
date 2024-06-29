import moment from 'moment';
import { z } from 'zod';

const DurationType = z.custom((data) => {
  if (
    data &&
    typeof data === 'object' &&
    typeof data.asMilliseconds === 'function'
  ) {
    return data;
  }
  throw new Error('La valeur doit être de type moment.duration.');
});

const MomentType = z.custom((data) => {
  if (moment.isMoment(data)) {
    return data;
  }
  throw new Error('La valeur doit être de type Moment.');
});
export const TimerSchema = z.object({
  id: z.string(),
  duration: DurationType,
  timeLeft: DurationType,
  endAt: MomentType,
  isRunning: z.boolean(),
});

export type TimerSchema = z.infer<typeof TimerSchema>;
