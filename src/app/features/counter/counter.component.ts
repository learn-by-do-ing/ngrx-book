import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions } from '../../core/store/counter/counter.actions';
import { selectTotal , selectMultiplier, selectValue } from '../../core/store/counter/counter.feature';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
      <div class="text-xl my-4">Counter: {{counter()}}</div>
      <div class="text-xl my-4">Multiplier: {{multiplier()}}</div>
      <div class="text-xl my-4">Total: {{total()}}</div>
      
      <button (click)="inc()" class="btn">+</button>
      <button (click)="dec()" class="btn">-</button>
      <button (click)="resetToZero()" class="btn">Reset</button>
      <button (click)="changeMultiplier(5)" class="btn">Multiplier: 5</button>
      <button (click)="changeMultiplier(10)" class="btn">Multiplier: 10</button>
  `,
})
export default class CounterComponent {
  store = inject(Store)
  counter = this.store.selectSignal(selectValue)
  multiplier = this.store.selectSignal(selectMultiplier)
  total = this.store.selectSignal(selectTotal)

  inc() {
    this.store.dispatch(CounterActions.increment())
  }

  dec() {
    this.store.dispatch(CounterActions.decrement({ value: 2}))
  }

  resetToZero() {
    this.store.dispatch(CounterActions.reset())
  }

  changeMultiplier(value: number) {
    this.store.dispatch(CounterActions.updateMultiplier({ value }))
  }
}
