import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) { }
  baseUrl = environment.baseUrl;

  

  getAllCountry(){
   return this._httpClient.get<any>(this.baseUrl+'countries')
  }
  getCountry(id:any){
    return this._httpClient.get<any>(this.baseUrl+`countries/${id}`)
  }
  deleteCountry(countriesId:any){
    return this._httpClient.delete<any>(this.baseUrl+`countries/${countriesId}`)
  }
  createCountry(countriesDto:any){
    return  this._httpClient.post<any>(this.baseUrl+'countries',countriesDto)
  }
  updateCountry(updateCountryDto:any,updateCountryId:any){
    return this._httpClient.put<any>(this.baseUrl+`countries/${updateCountryId}`,updateCountryDto)
  }
  updateCountryStatus(countryId: number, isActive: boolean) {
    return this._httpClient.put<any>(this.baseUrl+`countries/status/${countryId}`, { isActive });
  }

}
