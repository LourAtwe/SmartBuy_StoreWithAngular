import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  providers: [CurrencyPipe]
})
export class CartPageComponent implements OnInit {

  cart: any[] = [];
  fullName: string = '';
  address: string = '';
  creditCard: string = '';

  paymentDone: boolean = false;  // للتحكم بما يظهر بعد الدفع
  successMessage: string = '';

  constructor(
    private productService: ProductService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.cart = this.productService.cart1;
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
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

    const totalFormatted = this.currencyPipe.transform(this.getTotal(), 'USD');

    // الرسالة الاحترافية بعد الدفع مع اسم المستخدم والمبلغ والإيموجي
    this.successMessage = `🎉 Congratulations, ${this.fullName}! Your payment was successful. 💳 The total amount charged to your account is ${totalFormatted}. Thank you for shopping with us! 🛒`;
    this.paymentDone = true;

    // مسح السلة والحقول
    this.cart = [];
    this.productService.cart1 = [];
    this.fullName = '';
    this.address = '';
    this.creditCard = '';
  }
}
