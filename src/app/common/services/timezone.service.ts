import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) { }
  baseUrl = environment.baseUrl;

  

  getAllTimezone(){
   return this._httpClient.get<any>(this.baseUrl+'timezones')
  }
  getTimezone(id:any){
    return this._httpClient.get<any>(this.baseUrl+`timezones/${id}`)
  }
  deleteTimezone(timezoneId:any){
    return this._httpClient.delete<any>(this.baseUrl+`timezones/${timezoneId}`)
  }
  createTimezone(timezoneDto:any){
    return  this._httpClient.post<any>(this.baseUrl+'timezones',timezoneDto)
  }
  updateTimezone(updateTimezoneDto:any,updateTimezoneId:any){
    return this._httpClient.put<any>(this.baseUrl+`timezones/${updateTimezoneId}`,updateTimezoneDto)
  }
}
