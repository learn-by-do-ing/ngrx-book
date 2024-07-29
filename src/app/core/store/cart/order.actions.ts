import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from '../../../model/cart-item';
import { OrderUserForm } from '../../../model/order-user-form';

export const OrderActions = createActionGroup({
  source: 'Order',
  events: {
    'Send': props<{ user: OrderUserForm, cart: CartItem[] }>(),
    'Send Success': emptyProps(),
    'Send Fail': emptyProps(),
  }
});
