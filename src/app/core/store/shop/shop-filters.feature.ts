import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ShopFilters } from '../../../model/shop-filters';
import { selectList } from '../products/products.feature';
import { ShopFiltersActions } from './shop-filters.actions';

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
    on(ShopFiltersActions.update, (state, action): ShopFilters => ({
      ...state, ...action.filters
    })),
  ),
  extraSelectors: ({ selectShopFiltersState }) => ({
    selectFilteredList: createSelector(
      selectList,
      selectShopFiltersState,
      (list, filters) => list
        .filter(p => p.name.toLowerCase().includes(filters.text.toLowerCase()))
        .filter(p => p.cost <= filters.cost)
        .filter(p => {
          return (filters.wood && p.type === 'wood') ||
            (filters.paper && p.type === 'paper') ||
            (filters.plastic && p.type === 'plastic')
        })
    )
  })

});

export const {
  selectText,
  selectCost,
  selectWood,
  selectPlastic,
  selectPaper,
  selectShopFiltersState,
  selectFilteredList
} = shopFiltersFeature;
