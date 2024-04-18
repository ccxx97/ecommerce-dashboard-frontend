import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CustomerService } from 'src/app/common/services/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class CustomerDetailComponent {
  customer : any = {};

  recentOrders = [
    { id: 1, date: new Date('2022-03-10'), totalAmount: 100, status: 'Delivered' },
    { id: 2, date: new Date('2022-03-12'), totalAmount: 150, status: 'Processing' },
    { id: 3, date: new Date('2022-03-15'), totalAmount: 200, status: 'Shipped' }
  ];

  constructor(
    private _customerService:CustomerService,
    private activatedRoute:ActivatedRoute
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe({
      next:(res)=>{
        if(res["id"]){
          this.getCustomerDetails(res['id'])
        }
      }
    })
  }

  async getCustomerDetails(customerId:any){
    const res = await lastValueFrom(this._customerService.getCustomerDetails(customerId));
    if(res && res.data){
      this.customer = res.data;
    }
  }

  getSeverityCustomerStatus(status: boolean): string {
    return status === true ? 'success' : 'danger';
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'Processing':
        return 'info';
      case 'Shipped':
        return 'warning';
      default:
        return 'default';
    }
  }

}
