import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-cms-products-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <!--FORM EDIT / ADD-->
    <dialog class="modal bg-black bg-opacity-85" [open]="isModalOpened()">
      <div class="modal-box">
        <h3 class="font-bold text-2lg m-3">
          ADD ITEM
        </h3>
        <form 
          [formGroup]="form" 
          (submit)="saveProduct.emit(form.value)"
          class="flex flex-col gap-3"
        >
          <input
            type="text" placeholder="Product name" class="input input-bordered w-full max-w-xs"
            formControlName="name"
          />
          <div class="flex gap-2">
            <button class="btn" type="button" (click)="closeModal.emit()">Close</button>
            <button class="btn" type="submit" [disabled]="form.invalid">Save</button>
          </div>
        </form>
      </div>
    </dialog>
  `,
  styles: ``
})
export class CmsProductsModalComponent {
  isModalOpened = input.required<boolean>()
  active = input.required<Partial<Product> | null >()
  saveProduct = output<Partial<Product>>()
  closeModal = output()

  fb = inject(FormBuilder)

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]]
  })

  constructor() {
    effect(() => {
      const active = this.active();
      if (active) {
        this.form.patchValue(active)
      } else {
        this.form.reset()
      }
    });
  }
}
