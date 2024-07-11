import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CounterActions = createActionGroup({
  source: 'Counter',
  events: {
    'Increment': emptyProps(),
    'decrement': props<{ value: number }>(),
    'Reset': emptyProps(),
  }
});
