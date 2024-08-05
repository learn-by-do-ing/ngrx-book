import { Component, input, output } from '@angular/core';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-cms-products-list',
  standalone: true,
  imports: [],
  template: `
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
          @for (product of products(); track product.id) {
            <tr
              (click)="openModalToEditProduct.emit(product)"
              class="hover:bg-base-200 cursor-pointer"
            >
              <th>
                <img [src]="product.image" alt="" width="50">
              </th>
              <td>{{ product.name }}</td>
              <td>{{ product.type }}</td>
              <td>
                € {{ product.cost }}
                <button
                  class="btn ml-2"
                  (click)="deleteProductHandler(product, $event)">Delete
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``
})
export class CmsProductsListComponent {
  products = input.required<Product[]>()
  deleteProduct = output<Product>()
  openModalToEditProduct = output<Product>()

  deleteProductHandler(product: Product, event: MouseEvent) {
    event.stopPropagation()
    this.deleteProduct.emit(product)
  }
}
