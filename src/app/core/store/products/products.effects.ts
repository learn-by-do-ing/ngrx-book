import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, delay, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Product } from '../../../model/product';
import { ProductsActions } from './products.actions';

export const loadProducts = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(ProductsActions.load),
      mergeMap(() =>
        http.get<Product[]>('http://localhost:3001/products')
          .pipe(
            map((items) =>
              ProductsActions.loadSuccess({ items })
            ),
            catchError(() =>
              of(ProductsActions.loadFail())
            )
          )
      )
    );
  },
  { functional: true}
);


export const deleteProduct = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      mergeMap((action) =>
        http.delete(`http://localhost:3001/products/${action.id}`)
          .pipe(
            delay(1000),
            map((items) =>
              ProductsActions.deleteProductSuccess({ id: action.id })
            ),
            catchError(() =>
              of(ProductsActions.deleteProductFail())
            )
          )
      )
    );
  },
  { functional: true}
);
