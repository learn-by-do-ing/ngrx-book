import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
      [pending]="pending()"
      [error]="error()"
      (openModal)="openModalToAddProduct()"
    />
    
    <app-cms-products-modal
      [isModalOpened]="isModalOpened()"
      [active]="active()"
      (saveProduct)="saveProduct($event)"
      (closeModal)="closeModal()"
    />

    <app-cms-products-list
      [products]="products()"
      (deleteProduct)="deleteProduct($event)"
      (openModal)="openModalToEditProduct($event)"
    />
  
  `,
  imports: [
    ReactiveFormsModule,
    CmsProductsBarComponent,
    CmsProductsListComponent,
    CmsProductsModalComponent
  ],
  styles: ``
})
export default class CmsComponent implements OnInit {
  store = inject(Store)
  error = this.store.selectSignal<boolean>(selectHasError);
  pending = this.store.selectSignal<boolean>(selectPending);
  products = this.store.selectSignal<Product[]>(selectList);
  isModalOpened = this.store.selectSignal<boolean>(selectIsPanelOpened);
  active = this.store.selectSignal<Partial<Product> | null>(selectActive);

  ngOnInit() {
    this.store.dispatch(ProductsActions.load())
  }

  deleteProduct(product: Product) {
    this.store.dispatch(ProductsActions.deleteProduct({ id: product.id }))
  }

  openModalToAddProduct() {
    this.store.dispatch(ProductsActions.openModalAdd())
  }

  openModalToEditProduct(product: Product) {
    this.store.dispatch(ProductsActions.openModalEdit({ item: product}))
  }

  closeModal() {
    this.store.dispatch(ProductsActions.closeModal())
  }

  saveProduct(product: Partial<Product>) {
    this.store.dispatch(ProductsActions.save({ item: product}))
  }

}
