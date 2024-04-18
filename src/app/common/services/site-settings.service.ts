import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SiteSettingsService {

  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) { }
  baseUrl = environment.baseUrl;

  


  getSiteSettings(){
    return this._httpClient.get<any>(this.baseUrl+`siteSettings`)
  }
  updateSiteSettings(updateSiteSettingsDto:any){
    return this._httpClient.put<any>(this.baseUrl+`siteSettings/1`,updateSiteSettingsDto)
  }
  getAllSlider(){
    return this._httpClient.get<any>(this.baseUrl+`slider`)
  }
  getAllByOrder(){
    return this._httpClient.get<any>(this.baseUrl+`slider/getAllByOrder`)
  }
  deleteSliderImage(id:any){
    return this._httpClient.delete<any>(this.baseUrl+`slider/${id}`)
  }
  addSliderImage(sliderItemDto:any){
    return this._httpClient.post<any>(this.baseUrl+`slider`,sliderItemDto)
  }
  updateSliderOrder(data:any){
    return this._httpClient.patch<any>(this.baseUrl+`slider/order`,data)
  }
}
