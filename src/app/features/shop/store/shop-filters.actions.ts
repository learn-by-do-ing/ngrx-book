import { createActionGroup, props } from '@ngrx/store';
import { ShopFilters } from '../../../model/shop-filters';

export const ShopFiltersActions = createActionGroup({
  source: 'Shop Filters',
  events: {
    'update': props<{ filters: Partial<ShopFilters>}>(),
  }
});
