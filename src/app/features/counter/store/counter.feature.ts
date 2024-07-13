import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CounterActions } from './counter.actions';

export interface CounterState {
  value: number;
  multiplier: number;
}

const initialState: CounterState = { value: 0, multiplier: 2 }

export const counterFeature = createFeature({
  name: 'counter',
  reducer: createReducer(
    initialState,
    on(CounterActions.increment, (state): CounterState => ({ ...state, value: state.value + 1  })),
    // on(CounterActions.decrement, (state, action) => ({ value: state.value - action.value})),
    on(CounterActions.decrement, (state, action): CounterState => {
      const nextValue = state.value - action.value
      return {
        ...state,
        value: nextValue < 0 ? 0 : nextValue
      }
    }),

    on(CounterActions.reset, (state): CounterState => ({ ...state, value: 0})),
    on(CounterActions.updateMultiplier, (state, action) => ({ ...state, multiplier: action.value })),
  ),
  extraSelectors: ({ selectValue, selectMultiplier }) => ({
    selectTotal: createSelector(
      selectValue,
      selectMultiplier,
      (value, multiplier) => value * multiplier
    )
  })

})
export const {
  selectValue,
  selectMultiplier,
  selectTotal
} = counterFeature;
