import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { CurrencyService } from 'src/app/common/services/currency.service';

interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
  exchangeRate?:number;
}

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrl: './add-currency.component.scss'
})
export class AddCurrencyComponent {


  updateMode:boolean = false;
  updateCurrencyId:any = null;

  currencyForm = new FormGroup({
    name:new FormControl(""),
    code:new FormControl(""),
    symbol:new FormControl(""),
    exchangeRate:new FormControl(0),
  })
  constructor(
    private _currencyService:CurrencyService,
    private messageService:MessageService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ){}


  ngOnInit(){
    this.activatedRoute.params.subscribe({
      next:(param)=>{
        if(param["id"]){
          this.getCurrencyWithId(param["id"])
          this.updateMode = true;
        }
      }
    })
  }


  async getCurrencyWithId(currencyId:any){
    this.updateCurrencyId = currencyId;
    let res = await lastValueFrom(this._currencyService.getCurrency(currencyId))

    if(res && res.data){
      let currency : Currency = res.data;
      this.currencyForm.patchValue({
        name:currency.name,
        symbol:currency.symbol,
        code:currency.code,
        exchangeRate:0
      })
    }
  }


  addCurrency(){

    if(this.updateMode){
      this.updateCurrency()
      return;
    }
  
    this._currencyService.createCurrency(this.currencyForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Currency'])
        }
      },
      error: (errors) => {
        if (errors.error.message.length > 1) {
          let errorsList: [] = errors.error.message;
          errorsList.forEach((err) => {
            this.messageService.add({ severity: 'warn', detail: err });
          })
        }
        else
        {
          this.messageService.add({ severity: 'warn', detail: errors.error.message});
        }
  
      }
    })
  }

  updateCurrency(){
    this._currencyService.updateCurrency(this.currencyForm.value,this.updateCurrencyId).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Currency'])
        }
      },
      error: (errors) => {
        if (errors.error.message.length > 1) {
          let errorsList: [] = errors.error.message;
          errorsList.forEach((err) => {
            this.messageService.add({ severity: 'warn', detail: err });
          })
        }
        else
        {
          this.messageService.add({ severity: 'warn', detail: errors.error.message});
        }
  
      }
    })

  }
  
  deleteCurrency(){
    this._currencyService.deleteCurrency(this.updateCurrencyId).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Currency'])
        }
      },
      error: (errors) => {
        if (errors.error.message.length > 1) {
          let errorsList: [] = errors.error.message;
          errorsList.forEach((err) => {
            this.messageService.add({ severity: 'warn', detail: err });
          })
        }
        else
        {
          this.messageService.add({ severity: 'warn', detail: errors.error.message});
        }
  
      }
    })
  }

}
