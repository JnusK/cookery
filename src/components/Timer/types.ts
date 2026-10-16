export interface TimerDefaultValue {
  hours: number;
  minutes: number;
  seconds: number;
}

export type TimerStatus = 'idle' | 'running' | 'paused';
