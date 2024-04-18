import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) { }
  baseUrl = environment.baseUrl;

  

  getAllDiscount(){
   return this._httpClient.get<any>(this.baseUrl+'discounts')
  }
  getDiscount(discountId:any){
    return this._httpClient.get<any>(this.baseUrl+`discounts/${discountId}`)
  }
  deleteDiscount(discountId:any){
    return this._httpClient.delete<any>(this.baseUrl+`discounts/${discountId}`)
  }
  createDiscount(discountDto:any){
    return  this._httpClient.post<any>(this.baseUrl+'discounts',discountDto)
  }
  updateDiscount(updateDiscountDto:any,updateDiscountId:any){
    return this._httpClient.put<any>(this.baseUrl+`discounts/${updateDiscountId}`,updateDiscountDto)
  }


}
