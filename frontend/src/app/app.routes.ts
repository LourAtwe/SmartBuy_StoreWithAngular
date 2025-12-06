import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartPageComponent } from './cart_page/cart-page.component';

export const routes: Routes = [
  { path: '', component: CartComponent },               // صفحة الكارت الرئيسية
  { path: 'product/:index', component: ProductDetailsComponent },  // صفحة التفاصيل
  { path: 'cart-page', component: CartPageComponent },
  { path: 'cart', component: CartPageComponent }

   
];
