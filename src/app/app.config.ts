import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { authInterceptor } from './core/auth/auth.interceptor';
import { authFeature } from './core/store/auth/auth.feature';
import { cartFeature } from './core/store/cart/cart.feature';
import * as productsEffects from './core/store/products/products.effects';
import * as cartEffects from './core/store/cart/cart.effects';
import * as orderEffects from './core/store/cart/order.effects';
import * as authEffects from './core/store/auth/auth.effects';
import { productsFeature } from './core/store/products/products.feature';
import { shopFiltersFeature } from './core/store/shop/shop-filters.feature';
import { UIFeature } from './core/store/ui/ui.feature';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([ authInterceptor ])
    ),
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
    //provideState({ name: productsFeature.name, reducer: productsFeature.reducer }),
    provideState(productsFeature),
    provideState({ name: authFeature.name, reducer: authFeature.reducer }), // NEW
    provideState({ name: cartFeature.name, reducer: cartFeature.reducer }),
    provideState({ name: shopFiltersFeature.name, reducer: shopFiltersFeature.reducer }),
    provideState({ name: UIFeature.name, reducer: UIFeature.reducer }),
    provideEffects([
      productsEffects,
      cartEffects,
      orderEffects,
      authEffects
    ])
  ]
};
