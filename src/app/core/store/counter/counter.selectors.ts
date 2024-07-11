// core/store/counter/counter.selectors.ts

import { AppState } from '../../../app.config';

export const selectCounterValue = (state: AppState) => state.counter.value;
