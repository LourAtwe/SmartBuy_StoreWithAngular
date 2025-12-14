import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { RouterModule } from '@angular/router';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CheckoutFormComponent],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cart: Product[] = [];
  paymentDone = false;
  successMessage = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.cart = this.productService.cart1;
  }

  getTotal(): number {
    return this.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
    this.productService.cart1 = this.cart;
  }
    goHome() {
    this.router.navigate(['/']);
  }

  // ✅ استقبال البيانات من الابن
  onPaymentSuccess(name: string) {
    this.successMessage = `🎉 Congratulations, ${name}! Payment successful.`;
    this.paymentDone = true;

    this.cart = [];
    this.productService.cart1 = [];
  }
}
