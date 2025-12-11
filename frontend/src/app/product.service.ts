import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

 cart = [
    { name: "HeadPhones", price: 100, qty: 1, image: '/assets/Airpod.jpg' },
    { name: "Labtob", price: 1500, qty: 1, image: '/assets/Lab.jpeg' },
    { name: "Airbods", price: 50, qty: 1, image: '/assets/airpods.jpeg' },
    { name: "iPhone 15 Pro_Max", price: 1000, qty: 1, image: '/assets/iphone3.jpg' },
    { name: "Apple Watch", price: 600, qty: 1, image: '/assets/watch.jpg' },
    { name: "iphone 13 Pro_Max", price: 1000, qty: 1, image: '/assets/iphone13.jpg' },
    { name: "iPad", price: 900, qty: 1, image: '/assets/Ipad.jpg'},
    { name: "Apple USB cable (1 m)", price: 10, qty: 1, image: '/assets/Usb.jpg' },
    { name: "iPhone 15 ", price: 1000, qty: 1, image: '/assets/iphone2.jpg' },
    { name: "Stylus Pen", price: 200, qty: 1, image: '/assets/StylusPen.jpg' },
    { name: "Labtob", price: 500, qty: 1, image: '/assets/Lab2.jpg' },
  ];

  cart1: Product[] = [];

  getProduct(index: number): Product {
    return this.cart[index];
  }

  addItem(item: Product) {
    const exists = this.cart1.find(p => p.name === item.name);
    if (!exists) {
      this.cart1.push({ ...item });
    } else {
      exists.qty = item.qty;
    }
  }
}
