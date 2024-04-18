import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class OrdersComponent {

  orders: any[] = [
    { id: 1, customerName: 'John Doe', orderDate: new Date(), totalAmount: 100, status: 'pending' },
    { id: 2, customerName: 'Jane Smith', orderDate: new Date(), totalAmount: 200, status: 'shipped' },
  ];

  getSeverity(status: string): string {
    return status === 'pending' ? 'warning' : 'success';
  }

}
