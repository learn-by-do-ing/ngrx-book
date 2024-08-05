import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../../model/product';
import { ProductsActions } from './products.actions';

export interface ProductsState {
  hasError: boolean;
  pending: boolean;
  list: Product[];
  isPanelOpened: boolean;
  active: Partial<Product> | null;
}

export const initialState: ProductsState = {
  hasError: false,
  pending: false,
  list: [],
  isPanelOpened: false,
  active: null
};

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,
    // UI
    on(ProductsActions.openModalAdd, (state): ProductsState => ({ ...state, isPanelOpened: true })),
    on(ProductsActions.openModalEdit, (state, action): ProductsState => ({ ...state, isPanelOpened: true, active: action.item })),
    on(ProductsActions.closeModal, (state): ProductsState => ({ ...state, isPanelOpened: false, active: null })),
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

    on(ProductsActions.addProduct, (state): ProductsState => ({
      ...state,
      hasError: false,
      pending: true
    })),
    on(ProductsActions.addProductSuccess, (state, action): ProductsState => ({
      ...state,
      list: [...state.list, action.item],
      hasError: false,
      pending: false,
      isPanelOpened: false
    })),
    on(ProductsActions.addProductFail, (state): ProductsState => ({
      ...state,
      hasError: true,
      pending: false,
      isPanelOpened: false
    })),

    // EDIT
    on(ProductsActions.editProduct, (state): ProductsState => ({
      ...state,
      hasError: false,
      pending: true
    })),
    on(ProductsActions.editProductSuccess, (state, action): ProductsState => ({
      ...state,
      list: state.list.map(item => {
        return item.id === action.item.id ? action.item : item
      }),
      hasError: false,
      pending: false,
      isPanelOpened: false,
      active: null
    })),
    on(ProductsActions.editProductFail, (state): ProductsState => ({
      ...state,
      hasError: true,
      isPanelOpened: false,
      pending: false
    })),


  ),
});

export const {
  selectHasError,
  selectPending,
  selectList,
  selectIsPanelOpened,
  selectActive // NEW
} = productsFeature;
