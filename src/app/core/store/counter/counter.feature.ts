import { createFeature, createReducer, on } from '@ngrx/store';
import { CounterActions } from './counter.actions';

export interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 }

export const counterFeature = createFeature({
  name: 'counter',
  reducer: createReducer(
    initialState,
    on(CounterActions.increment, (state) => ({  value: state.value + 1  })),
    // on(CounterActions.decrement, (state, action) => ({ value: state.value - action.value})),
    on(CounterActions.decrement, (state, action) => {
      const nextValue = state.value - action.value
      return {
        value: nextValue < 0 ? 0 : nextValue
      }
    }),

    on(CounterActions.reset, () => ({ value: 0})),
  )
})
export const {
  selectValue,
} = counterFeature;
