import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Product[] = [];
  quantities = [1,2,3,4,5,6,7,8,9,10];

  constructor(
    public productService: ProductService,
    private router: Router
  ) {
    // إضافة خاصية error لكل عنصر
    this.cart = this.productService.cart.map(item => ({
      ...item,
      qtyError: false
    }));
  }

  validateQty(item: any) {
    item.qtyError = item.qty < 1;
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
  }

  getTotal(): number {
    return this.cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }

  goToDetails(index: number) {
    this.router.navigate(['/product', index]);
  }

  addToCart(product: Product) {
    this.productService.addItem(product);
    this.router.navigate(['/cart']);
  }
}
