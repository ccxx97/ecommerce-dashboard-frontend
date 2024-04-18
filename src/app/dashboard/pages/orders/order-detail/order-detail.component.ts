import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class OrderDetailComponent {

  order: any = {};

  constructor() { }

  ngOnInit(): void {
    this.order = {
      customerName: 'John Doe',
      customerEmail: 'johndoe@example.com',
      customerPhone: '+1234567890',
      customerAddress: '123 Street, City, Country',
      status: 'pending',
      products: [
        { imageUrl: 'https://www.sporcueczane.com/image/cache/catalog/Optimum%20Nutrition/mass%202727-350x300.png', name: 'Product 1', quantity: 2, unitPrice: 50, totalPrice: 100 },
        { imageUrl: 'https://www.sporcueczane.com/image/cache/catalog/Optimum%20Nutrition/mass%202727-350x300.png', name: 'Product 2', quantity: 1, unitPrice: 75, totalPrice: 75 },
      ]
    };
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'danger';
      default:
        return 'default';
    }
  }

}
