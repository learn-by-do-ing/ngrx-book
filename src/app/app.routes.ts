// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'shop', loadComponent: () => import('./features/shop/shop.component')},
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component')},
  { path: 'counter', loadComponent: () => import('./features/counter/counter.component')},
  { path: '', redirectTo: 'shop', pathMatch: 'full' }
];
