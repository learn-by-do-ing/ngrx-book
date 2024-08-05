import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../core/store/products/products.actions';
import { selectHasError, selectList, selectPending } from '../../core/store/products/products.feature';
import { Product } from '../../model/product';

@Component({
  selector: 'app-cms',
  standalone: true,
  template: `

    <!--ERROR ALERT-->
    @if (error()) {
      <div class="alert alert-error">Server error</div>
    }

    <!--PENDING-->
    @if(pending()) {
      <span class="loading loading-spinner loading-md"></span>
    }

    <!--ADD-->
    <div class="m-6 cursor-pointer">
      <svg
        width="30"
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
    </div>

    <!--FORM EDIT / ADD-->
    <dialog class="modal " [open]="false">
      <div class="modal-box ">
        <h3 class="font-bold text-2lg">
          ADD / EDIT item
        </h3>
        <div class="modal-action modal-backdrop" >
          <form class="modal-backdrop">
            <button class="btn">Save</button>
          </form>
        </div>
      </div>
    </dialog>

    <!--LIST-->
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
        <tr>
          <th>Preview</th>
          <th>Name</th>
          <th>Type</th>
          <th>Cost</th>
        </tr>
        </thead>

        <tbody>
          @for(product of products(); track product.id) {
            <tr>
              <th>
                <img [src]="product.image" alt="" width="50">
              </th>
              <td>{{product.name}}</td>
              <td>{{ product.type }}</td>
              <td>
                € {{product.cost}}
                <button
                  class="btn ml-2"
                  (click)="deleteProduct(product)">Delete</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>

  `,
  styles: ``
})
export default class CmsComponent implements OnInit {
  store = inject(Store)

  error = this.store.selectSignal(selectHasError);
  pending = this.store.selectSignal(selectPending);
  products = this.store.selectSignal(selectList);

  ngOnInit() {
    this.store.dispatch(ProductsActions.load())
  }

  // NEW
  deleteProduct(product: Product) {
    this.store.dispatch(ProductsActions.deleteProduct({ id: product.id }))
  }

}

