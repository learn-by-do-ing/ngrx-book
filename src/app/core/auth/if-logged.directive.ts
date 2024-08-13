
import { booleanAttribute, Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLogged } from '../store/auth/auth.feature';

@Directive({
  selector: '[appIfLogged]',
  standalone: true
})
export class IfLoggedDirective {
  hideIfLogged = input(false, { transform: booleanAttribute, alias: 'appIfLogged' })
  store = inject(Store);
  view = inject(ViewContainerRef)
  tpl = inject(TemplateRef)
  isLogged = this.store.selectSignal(selectIsLogged);

  constructor() {
    effect(() => {
      this.view.clear()

      if (this.isLogged() && !this.hideIfLogged())  {
        this.view.createEmbeddedView(this.tpl)
      }

      if (!this.isLogged() && this.hideIfLogged())  {
        this.view.createEmbeddedView(this.tpl)
      }
    });
  }
}
