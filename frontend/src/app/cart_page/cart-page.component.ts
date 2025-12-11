import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule, RouterLink} from '@angular/router';


@Component({
  selector: 'app-cart-page',
  standalone: true,
 imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  providers: [CurrencyPipe]
})
export class CartPageComponent implements OnInit {
  @Output() paymentFinished = new EventEmitter<string>();

  cart: Product[] = [];
  fullName = '';
  address = '';
  creditCard = '';

  paymentDone = false;
  successMessage = '';

  constructor(
    private productService: ProductService,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {}

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

  submitPayment() {
    if (!this.fullName || !this.address || !this.creditCard) {
      this.successMessage = 'Please fill all payment fields!';
      return;
    }

    const total = this.currencyPipe.transform(this.getTotal(), 'USD');
    this.successMessage = `🎉 Congratulations, ${this.fullName}! Your payment was successful. Total is ${total}.`;

    this.paymentFinished.emit(this.fullName);
    this.paymentDone = true;

    // تنظيف السلة
    this.cart = [];
    this.productService.cart1 = [];
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
