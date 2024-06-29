import { z } from 'zod';

export const TimerInputSchema = z.object({
  hour: z.number().min(0),
  minute: z.number().min(0).max(59),
  second: z.number().min(0).max(59),
});

export type TimerInputSchema = z.infer<typeof TimerInputSchema>;
