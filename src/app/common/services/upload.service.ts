import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) { }
  baseUrl = environment.baseUrl;

  uploadFile(file:any){
    const formdata = new FormData();
    formdata.append("file",file);
  return  this._httpClient.post<any>(this.baseUrl+'upload',formdata)
  }

  
}
