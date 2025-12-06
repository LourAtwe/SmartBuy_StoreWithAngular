import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
@Component({
  selector: 'app-root',
  standalone: true,
    imports: [
    RouterModule,
    CartComponent,
    ProductDetailsComponent
  ],
  template: `<router-outlet></router-outlet>`  // هنا ستظهر جميع الصفحات
})
export class AppComponent {}
