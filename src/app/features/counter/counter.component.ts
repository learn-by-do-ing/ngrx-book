import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions } from '../../core/store/counter/counter.actions';
import { selectValue } from '../../core/store/counter/counter.feature';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
      <div class="text-xl my-4">Counter: {{counter()}}</div>
      
      <button (click)="inc()" class="btn">+</button>
      <button (click)="dec()" class="btn">-</button>
      <button (click)="resetToZero()" class="btn">Reset</button>
  `,
})
export default class CounterComponent {
  store = inject(Store)
  counter = this.store.selectSignal(selectValue)

  inc() {
    this.store.dispatch(CounterActions.increment())
  }

  dec() {
    this.store.dispatch(CounterActions.decrement({ value: 2}))
  }

  resetToZero() {
    this.store.dispatch(CounterActions.reset())
  }
}
