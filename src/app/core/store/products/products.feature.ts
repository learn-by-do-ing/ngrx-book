import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../../model/product';
import { ProductsActions } from './products.actions';

export interface ProductsState {
  hasError: boolean;
  pending: boolean;
  list: Product[];
}

export const initialState: ProductsState = {
  hasError: false,
  pending: false,
  list: []
};
export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,
    on(ProductsActions.load, (state): ProductsState => ({
      ...state, pending: true, hasError: false
    })),
    on(ProductsActions.loadSuccess, (state, action): ProductsState => ({
      ...state, list: [...action.items],
      pending: false,
      hasError: false
    })),
    on(ProductsActions.loadFail, (state): ProductsState => ({
      ...state,
      hasError: true,
      pending: false
    })),
  ),
});

export const {
  selectHasError,
  selectPending,
  selectList
} = productsFeature;
