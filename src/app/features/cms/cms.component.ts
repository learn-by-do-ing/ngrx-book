import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../core/store/products/products.actions';
import {
  selectActive,
  selectHasError,
  selectIsPanelOpened,
  selectList,
  selectPending
} from '../../core/store/products/products.feature';
import { Product } from '../../model/product';
import { CmsProductsBarComponent } from './components/cms-products-bar.component';
import { CmsProductsListComponent } from './components/cms-products-list.component';
import { CmsProductsModalComponent } from './components/cms-products-modal.component';

@Component({
  selector: 'app-cms',
  standalone: true,
  template: `

    <app-cms-products-bar
      [error]="error()"
      [pending]="pending()"
      (addProduct)="openModalToAddProduct()"
    />
    <app-cms-products-modal
      [isModalOpened]="isModalOpened()"
      [active]="active()"
      (saveProduct)="saveProduct($event)"
      (closeModal)="closeModal()"
    />

    <app-cms-products-list
      [products]="products()"
      (openModalToEditProduct)="openModalToEditProduct($event)"
      (deleteProduct)="deleteProduct($event)"
    />

  `,
  imports: [
    ReactiveFormsModule,
    CmsProductsListComponent,
    CmsProductsModalComponent,
    CmsProductsBarComponent
  ],
  styles: ``
})
export default class CmsComponent implements OnInit {
  store = inject(Store)

  error = this.store.selectSignal(selectHasError);
  pending = this.store.selectSignal(selectPending);
  products = this.store.selectSignal(selectList);
  isModalOpened = this.store.selectSignal(selectIsPanelOpened);
  active = this.store.selectSignal(selectActive);

  ngOnInit() {
    this.store.dispatch(ProductsActions.load())
  }

  deleteProduct(product: Product) {
    this.store.dispatch(ProductsActions.deleteProduct({ id: product.id }))
  }

  openModalToAddProduct() {
    this.store.dispatch(ProductsActions.openModalAdd())
    // this.form.reset()
  }

  // NEW
  openModalToEditProduct(product: Product) {
    this.store.dispatch(ProductsActions.openModalEdit({ item: product}))
    // this.form.patchValue(product)
  }

  closeModal() {
    this.store.dispatch(ProductsActions.closeModal())
  }

  saveProduct(product: Partial<Product>) {
    this.store.dispatch(ProductsActions.save({ item: product }))
  }

}

