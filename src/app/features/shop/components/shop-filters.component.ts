import { JsonPipe, NgClass } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ShopFilters } from '../../../model/shop-filters';

@Component({
  selector: 'app-shop-filters',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    NgClass
  ],
  template: `
    <div
      class="fixed w-96 top-0 right-0 h-full bg-slate-700 z-10 shadow-lg transition-all"
      [ngClass]="{
       'right-0': isOpen(),
       '-right-96': !isOpen(),
     }"
    >
      <form class="flex flex-col gap-4 m-6" [formGroup]="form">
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold">FILTERS</h1>
          <button (click)="close.emit()">❌</button>
        </div>
        
        <input
          type="text" placeholder="Search here" class="input input-bordered w-full"
          formControlName="text"
        />

        <!--COST FILTER-->
        <label class="font-bold">MAX PRICE Price (€ {{ form.get('cost')?.value }})</label>
        <input
          type="range" min="2" max="10" value="10" class="range" step="2"
          formControlName="cost"
        />
        <div class="w-full flex justify-between text-xs px-2">
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>

        <br>

        <!--MATERIAL FILTER-->
        <label class="font-bold">MATERIAL</label>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Wood</span>
            <input type="checkbox" checked="checked" class="checkbox" formControlName="wood"/>
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Plastic</span>
            <input type="checkbox" checked="checked" class="checkbox" formControlName="plastic"/>
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Paper</span>
            <input type="checkbox" checked="checked" class="checkbox" formControlName="paper"/>
          </label>
        </div>
      </form>

      <pre>{{ form.value | json }}</pre>

    </div>

  `,
  styles: ``
})
export class ShopFiltersComponent  {
  fb = inject(FormBuilder)
  changeFilters = output<Partial<ShopFilters>>()
  isOpen = input.required()
  filters = input.required<ShopFilters>() // NEW
  close = output()

  form = this.fb.nonNullable.group({
    text: '',
    cost: 2,
    wood: true,
    plastic: true,
    paper: false
  })

  constructor() {
    // NEW
    effect(() => {
      const filters = this.filters();
      if (filters) {
        this.form.patchValue(filters, { emitEvent: false });
      }
    });

    this.form.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(data => {
        this.changeFilters.emit(this.form.value)
      })
  }
}
