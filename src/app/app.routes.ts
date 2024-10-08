import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { provideState, Store } from '@ngrx/store';
import { authGuard } from './core/auth/auth.guard';
import { selectIsCartEmpty } from './core/store/cart/cart.feature';
import { counterFeature } from './features/counter/store/counter.feature';

export const routes: Routes = [
  { path: 'shop', loadComponent: () => import('./features/shop/shop.component')},
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component')},
  {
    path: 'cms',
    loadComponent: () => import('./features/cms/cms.component'),
    canActivate: [authGuard],
  },
  { path: 'login', loadComponent: () => import('./features/login/login.component')},
  {
    path: 'order-form',
    loadComponent: () => import('./features/shop-order-form/shop-order-form.component'),
    canActivate: [
      () => {
        const store = inject(Store)
        const router = inject(Router)
        const isCartEmpty = store.selectSignal(selectIsCartEmpty)
        if (isCartEmpty()) {
          router.navigateByUrl('shop')
        }
        return !isCartEmpty()
      }
    ]
  },
  {
    path: 'counter',
    loadComponent: () => import('./features/counter/counter.component'),
    providers: [
      provideState({ name: counterFeature.name, reducer: counterFeature.reducer }),
    ]
  },
  { path: '', redirectTo: 'shop', pathMatch: 'full' }
];
