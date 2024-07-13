import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { cartFeature } from './core/store/cart/cart.feature';
import * as productsEffects from './core/store/products/products.effects';
import * as cartEffects from './core/store/cart/cart.effects';
import { productsFeature } from './core/store/products/products.feature';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({}, {
        runtimeChecks: {
            strictStateSerializability: true,
            strictActionSerializability: true,
            strictActionTypeUniqueness: true
        }
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState({ name: productsFeature.name, reducer: productsFeature.reducer }),
    provideState({ name: 'cart', reducer: cartFeature.reducer }),
    provideEffects([
      productsEffects,
      cartEffects
    ])
  ]
};
