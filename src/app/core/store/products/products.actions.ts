import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../../model/product';

export const ProductsActions = createActionGroup({
  source: 'Products API',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ items: Product[] }>(),
    'Load Fail': emptyProps(),
  }
});
