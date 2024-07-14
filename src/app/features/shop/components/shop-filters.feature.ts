import { createFeature, createReducer, on } from '@ngrx/store';
import { ShopFilters } from '../../../model/shop-filters';
import { ShopFiltersActions } from '../store/shop-filters';

export const initialState: ShopFilters = {
  text: '',
  cost: 2,
  wood: true,
  plastic: true,
  paper: true
}

export const shopFiltersFeature = createFeature({
  name: 'shopFilters',
  reducer: createReducer(
    initialState,
    on(ShopFiltersActions.update, (state, action) => ({
      ...state, ...action.filters
    })),
  ),
});

export const {
  selectText,
  selectCost,
  selectWood,
  selectPlastic,
  selectPaper,
  selectShopFiltersState,
} = shopFiltersFeature;
