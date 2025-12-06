import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../product.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule,CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  quantities: number[] = [1,2,3,4,5,6,7,8,9,10];

  constructor(private route: ActivatedRoute, private productService: ProductService,   private router: Router  ) {}

  ngOnInit(): void {
    const index = Number(this.route.snapshot.paramMap.get('index'));
    this.product = this.productService.cart[index];

    if (!this.product.qty) {
      this.product.qty = 1;  // 👈 تأكد من وجود qty
    }
  }
 addToCart(product: any) {
  this.productService.addItem(product);
  this.router.navigate(['/cart-page']); // يروح مباشرة لصفحة السلة
}


}