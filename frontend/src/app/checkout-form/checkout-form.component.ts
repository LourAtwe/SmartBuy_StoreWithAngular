import { Product } from '../product.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent {

  // ✅ Parent → Child
  @Input() total!: number;
  @Input() cartItems: Product[] = [];

  // ✅ Child → Parent
  @Output() paymentSuccess = new EventEmitter<string>();

  // 📝 حقول النموذج
  fullName = '';
  address = '';
  creditCard = '';

  // ✅ متغيرات الأخطاء
  fullNameError = false;
  addressError = false;
  creditCardError = false;

  // ✅ تحقق من المدخلات عند كل تغيير
  validateFullName() {
    this.fullNameError = this.fullName.trim().length < 3;
  }

  validateAddress() {
    this.addressError = this.address.trim().length < 5;
  }

  validateCreditCard() {
    this.creditCardError = !/^\d{16}$/.test(this.creditCard);
  }

  submitPayment() {
    // تحقق قبل الإرسال
    this.validateFullName();
    this.validateAddress();
    this.validateCreditCard();

    if (this.fullNameError || this.addressError || this.creditCardError) {
      return; // تمنع الإرسال إذا فيه أخطاء
    }

    this.paymentSuccess.emit(this.fullName);
  }
}
