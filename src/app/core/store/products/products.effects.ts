import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
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
            map(() =>
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


export const addProduct = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(ProductsActions.addProduct),
      mergeMap((action) =>
        http.post<Product>(`http://localhost:3001/products`, action.item)
          .pipe(
            map((item) =>
              ProductsActions.addProductSuccess({ item })
            ),
            catchError(() =>
              of(ProductsActions.addProductFail())
            )
          )
      )
    );
  },
  { functional: true}
);



export const editProduct = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(ProductsActions.editProduct),
      mergeMap((action) =>
        http.patch<Product>(`http://localhost:3001/products/${action.item.id}`, action.item)
          .pipe(
            map((item) =>
              ProductsActions.editProductSuccess({ item })
            ),
            catchError(() =>
              of(ProductsActions.editProductFail())
            )
          )
      )
    );
  },
  { functional: true}
);
