import { Component, ViewEncapsulation } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CustomerService } from 'src/app/common/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class CustomersComponent {

  customers: any[] = [];
  loading:boolean = true;

  constructor(
    private _customerService:CustomerService
  ){}

  ngOnInit(){
    this.getAllCustomer();
  }

  async getAllCustomer(){
    const res = await lastValueFrom(this._customerService.getAllCustomer())
    if(res.data && res) {
      this.customers = res.data;
      this.loading = false;
    }
  }

  getSeverity(status: boolean): string {
    return status === true ? 'success' : 'danger';
  }

}
