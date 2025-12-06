import { CommonModule,CurrencyPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { RouterModule } from '@angular/router';


interface CartItem {
  name: string;
  price: number;
  qty: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: any[];   // عرف فقط بدون قيمة هنا

  quantities: number[] = [1,2,3,4,5,6,7,8,9,10];

  constructor(private productService: ProductService, private router: Router) {
    this.cart = this.productService.cart;  // هنا يتم تهيئتها بعد استدعاء الـ service
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
  }



  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  goToDetails(index: number) {
    this.router.navigate(['/product', index]);
  }
  addToCart(product: any) {
  this.productService.addItem(product);
  this.router.navigate(['/cart-page']); // يروح مباشرة لصفحة السلة
}


}