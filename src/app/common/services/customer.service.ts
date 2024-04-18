import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.development';
import { AddressDto } from '../models/dto/addressDto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) { }
  baseUrl = environment.baseUrl;


  getAdress(){
   return this._httpClient.get<any>(this.baseUrl+'customer/address/getAddress',{headers:this.getHeaders()})
  }
  updateAddress(addressDto:AddressDto){
   return this._httpClient.put<any>(this.baseUrl+'customer/address/update',addressDto,{headers:this.getHeaders()})
  }
  getAllCustomer(){
    return this._httpClient.get<any>(this.baseUrl+'customer/getAllCustomerForList',{headers:this.getHeaders()})
  }
  getCustomerDetails(customerId:number){
    return this._httpClient.get<any>(this.baseUrl+`customer/getCustomerDetails?id=${customerId}`,{headers:this.getHeaders()})
  }


  getHeaders() {

    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._authService.getToken()
    })
    return headers;
  }
}
