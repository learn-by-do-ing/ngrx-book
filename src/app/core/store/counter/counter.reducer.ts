// not used anymore
// this file has been replaced by counter.feature
import { createReducer, on } from '@ngrx/store';
import { decrement, increment, reset } from './counter.actions';

export interface CounterState {
  value: number
}

const initialState: CounterState = { value: 0 }

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({  value: state.value + 1  })),
  on(decrement, (state, action) => ({ value: state.value - action.value})),
  on(reset, () => ({ value: 0})),
)
