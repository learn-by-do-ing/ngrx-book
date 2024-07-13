import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CounterActions = createActionGroup({
  source: 'Counter',
  events: {
    'Increment': emptyProps(),
    'Decrement': props<{ value: number }>(),
    'Reset': emptyProps(),
    'Update Multiplier': props<{ value: number }>(),
  }
});
