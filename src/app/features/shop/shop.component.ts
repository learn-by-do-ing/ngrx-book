import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartActions } from '../../core/store/cart/cart.actions';
import { ProductsActions } from '../../core/store/products/products.actions';
import { selectList } from '../../core/store/products/products.feature';
import { Product } from '../../model/product';
import { ShopFilters } from '../../model/shop-filters';
import { ShopFiltersComponent } from './components/shop-filters.component';
import { ShopFiltersActions } from './store/shop-filters';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ShopFiltersComponent
  ],
  template: `
    <app-shop-filters (changeFilters)="updateFilter($event)" />
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      @for (product of products(); track product.id) {
        <div class="card bg-slate-900 shadow-xl">
          <figure>
            <img [src]="product.image" [alt]="product.name"/></figure>
          <div class="card-body">
            <h2 class="card-title">{{ product.name }}</h2>
            <div class="card-actions justify-end">
              <button
                class="btn btn-outline btn-primary"
                (click)="addProductToCart(product)"
              >
                Add to Cart | € {{ product.cost }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export default class ShopComponent implements OnInit {
  store = inject(Store)
  products = this.store.selectSignal(selectList)

  ngOnInit() {
    this.store.dispatch(ProductsActions.load())
  }

  addProductToCart(product: Product) {
    this.store.dispatch(CartActions.add({item:  product}))
  }

  updateFilter(filters: Partial<ShopFilters>) {
    this.store.dispatch(ShopFiltersActions.update({ filters }))
  }
}
