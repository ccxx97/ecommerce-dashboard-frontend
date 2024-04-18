import { Component, ViewEncapsulation } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DiscountService } from 'src/app/common/services/discount.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrl: './discounts.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class DiscountsComponent {
  discounts: any[] = [];
  loading:boolean = true;

  constructor(
    private _discountService:DiscountService
  ){}

  ngOnInit(){
    this.getAllDiscount();
  }

  async getAllDiscount(){
    const res = await lastValueFrom(this._discountService.getAllDiscount())
    if(res){
      this.loading = false;
      this.discounts = res.data;
    }
  }

  getSeverity(status: boolean): string {
    return status === true ? 'success' : 'danger';
  }

}
