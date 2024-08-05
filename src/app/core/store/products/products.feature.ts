import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../../model/product';
import { ProductsActions } from './products.actions';

export interface ProductsState {
  hasError: boolean;
  pending: boolean;
  list: Product[];
  isPanelOpened: boolean; // NEW
}

export const initialState: ProductsState = {
  hasError: false,
  pending: false,
  list: [],
  isPanelOpened: false // NEW
};

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,
    // UI
    on(ProductsActions.openModalAdd, (state) => ({ ...state, isPanelOpened: true })),
    on(ProductsActions.openModalEdit, (state, action) => ({ ...state, isPanelOpened: true, active: action.item })),
    on(ProductsActions.closeModal, (state, action) => ({ ...state, isPanelOpened: false, active: null })),
    // LOAD
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
    // DELETE
    on(ProductsActions.deleteProduct, (state): ProductsState => ({ ...state, hasError: false, pending: true})),
    on(ProductsActions.deleteProductSuccess, (state, action): ProductsState => ({
      ...state,
      list: state.list.filter(item => item.id !== action.id),
      hasError: false,
      pending: false
    })),
    on(ProductsActions.deleteProductFail, (state): ProductsState => ({
      ...state,
      hasError: true,
      pending: false
    })),

    on(ProductsActions.addProduct, (state) => ({
      ...state,
      hasError: false,
      pending: true
    })),
    on(ProductsActions.addProductSuccess, (state, action) => ({
      ...state,
      list: [...state.list, action.item],
      hasError: false,
      pending: false,
      isPanelOpened: false
    })),
    on(ProductsActions.addProductFail, (state) => ({
      ...state,
      hasError: true,
      pending: false,
      isPanelOpened: false
    })),


  ),
});

export const {
  selectHasError,
  selectPending,
  selectList,
  selectIsPanelOpened
} = productsFeature;
