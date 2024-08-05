import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Product } from '../../../model/product';
import { ProductsActions } from './products.actions';
import { selectActive } from './products.feature';
import { concatLatestFrom } from '@ngrx/operators';

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

export const saveProduct = createEffect((
    actions$ = inject(Actions),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(ProductsActions.save),
      concatLatestFrom(() => store.select(selectActive)),
      map(([action, active]) => {
        if (active?.id) {
          // edit
          const editedProduct = { ...action.item, id: active.id }
          return ProductsActions.editProduct({ item: editedProduct })
        }
        //add
        return ProductsActions.addProduct({ item: action.item })
      })
    );
  },
  { functional: true }
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


