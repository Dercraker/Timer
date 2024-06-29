import { z } from 'zod';

export const TimerSchema = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.number(),
  timeLeft: z.number(),
  endAt: z.number(),
  isRunning: z.boolean(),
});

export type TimerSchema = z.infer<typeof TimerSchema>;
