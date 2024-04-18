import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) { }
  baseUrl = environment.baseUrl;

  

  getAllCurrency(){
   return this._httpClient.get<any>(this.baseUrl+'currency')
  }
  getCurrency(id:any){
    return this._httpClient.get<any>(this.baseUrl+`currency/${id}`)
  }
  deleteCurrency(currencyId:any){
    return this._httpClient.delete<any>(this.baseUrl+`currency/${currencyId}`)
  }
  createCurrency(currencyDto:any){
    return  this._httpClient.post<any>(this.baseUrl+'currency',currencyDto)
  }
  updateCurrency(updateCurrencyDto:any,updateCurrencyId:any){
    return this._httpClient.put<any>(this.baseUrl+`currency/${updateCurrencyId}`,updateCurrencyDto)
  }

}
