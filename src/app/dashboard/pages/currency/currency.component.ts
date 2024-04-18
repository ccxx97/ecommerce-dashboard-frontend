import { Component, ViewEncapsulation } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CurrencyService } from 'src/app/common/services/currency.service';

interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class CurrencyComponent {

  currencies: Currency[] = [];
  loading : boolean = true;


  constructor(
    private _currencyService:CurrencyService
  ){}

  ngOnInit(){
    this.getAllCurrency();
  }


  async getAllCurrency(){
    const res = await lastValueFrom(this._currencyService.getAllCurrency())
    if(res && res.data){
      this.currencies = res.data;
    }
    this.loading = false;

    
  }


}
