// app.routes.ts
import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { counterFeature } from './features/counter/store/counter.feature';

export const routes: Routes = [
  { path: 'shop', loadComponent: () => import('./features/shop/shop.component')},
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component')},
  {
    path: 'counter',
    loadComponent: () => import('./features/counter/counter.component'),
    providers: [
      provideState({ name: counterFeature.name, reducer: counterFeature.reducer }),
    ]
  },
  { path: '', redirectTo: 'shop', pathMatch: 'full' }
];
