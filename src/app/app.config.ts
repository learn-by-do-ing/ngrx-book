import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { counterFeature, CounterState } from './core/store/counter/counter.feature';

export type AppState = {
  home: number[];
  counter: CounterState;
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState({ name: 'home', reducer: () => [1, 2, 3] }),
    // with createReducer
    // provideState({ name: 'counter', reducer: counterReducer }),
    // with createFeature
    provideState({ name: counterFeature.name, reducer: counterFeature.reducer }),
  ]
};
