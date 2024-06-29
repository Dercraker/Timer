import { z } from 'zod';

export const TimerSchema = z.object({
  hour: z.number().min(0),
  minute: z.number().min(0).max(59),
  second: z.number().min(0).max(59),
});

export type TimerSchema = z.infer<typeof TimerSchema>;
