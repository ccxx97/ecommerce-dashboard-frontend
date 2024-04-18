import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) { }
  baseUrl = environment.baseUrl;

  

  getAllLanguage(){
   return this._httpClient.get<any>(this.baseUrl+'languages')
  }
  getLanguage(languageCode:any){
    return this._httpClient.get<any>(this.baseUrl+`languages/${languageCode}`)
  }
  deleteLanguage(languageId:any){
    return this._httpClient.delete<any>(this.baseUrl+`languages/${languageId}`)
  }
  createLanguage(languageDto:any){
    return  this._httpClient.post<any>(this.baseUrl+'languages',languageDto)
  }
  updateLanguage(updateLanguageDto:any,updateLanguageId:any){
    return this._httpClient.put<any>(this.baseUrl+`languages/${updateLanguageId}`,updateLanguageDto)
  }
  updateDefaultJson(json:any){
    return this._httpClient.put<any>(this.baseUrl+`languages/updateDefaultJson`,json)
  }
  updateTranslateList(code:any,json:any){
    return this._httpClient.put<any>(this.baseUrl+`languages/updateTranslateList/${code}`,json)
  }
}
