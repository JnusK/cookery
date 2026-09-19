import type { Time } from '../types.ts';

export interface Step {
  note?: string;
  text: string;
  time: Time;
}
