import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="join justify-center flex my-4">
      <button class="btn btn-info join-item" routerLink="shop" routerLinkActive="btn-active">shop</button>
      <button class="btn btn-info join-item" routerLink="cart" routerLinkActive="btn-active">cart</button>
      <button class="btn btn-info join-item" routerLink="counter" routerLinkActive="btn-active">counter</button>
    </div>
  `,
  styles: ``
})
export class NavBarComponent {

}
