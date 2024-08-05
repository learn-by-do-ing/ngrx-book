import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cms-products-bar',
  standalone: true,
  imports: [],
  template: `

    <!--ERROR ALERT-->
    @if (error()) {
      <div class="alert alert-error">Server error</div>
    }


    <div class="flex items-center gap-1">
      <!--ADD-->
      <button
        class="m-6 cursor-pointer"
        (click)="addProduct.emit()"
      >
        <svg
          width="30"
          viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#ffffff" stroke-width="1.5"
                  stroke-linecap="round"></path>
            <path
              d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
              stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path>
          </g>
        </svg>
      </button>

      <!--PENDING-->
      @if (pending()) {
        <span class="loading loading-spinner loading-md"></span>
      }
    </div>

  `,
  styles: ``
})
export class CmsProductsBarComponent {
  error = input.required<boolean>()
  pending = input.required<boolean>()

  addProduct = output()
}
