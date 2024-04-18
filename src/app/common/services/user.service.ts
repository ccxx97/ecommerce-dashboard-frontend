import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface User {
  userId:any,
  email:string,
  profileImage:string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) { }
  baseUrl = environment.baseUrl;
  private currentUser: any;

  

  getAllUser(){
   return this._httpClient.get<any>(this.baseUrl+'user')
  }
  getUser(id:any){
    return this._httpClient.get<any>(this.baseUrl+`user/${id}`)
  }
  getProfile(){
    return this._httpClient.get<any>(this.baseUrl+`user/profile`,{headers:this.getHeaders()})
  }
  updateProfile(profileDto:any){
    return this._httpClient.put<any>(this.baseUrl+`user/profile`,profileDto,{headers:this.getHeaders()})
  }
  deleteUser(userId:any){
    return this._httpClient.delete<any>(this.baseUrl+`user/${userId}`)
  }
  createUser(userDto:any){
    return  this._httpClient.post<any>(this.baseUrl+'user',userDto)
  }
  changePassword(changePasswordDto:any){
    return  this._httpClient.post<any>(this.baseUrl+'user/change-password',changePasswordDto,{headers:this.getHeaders()})
  }
  login(loginDto:any){
    return  this._httpClient.post<any>(this.baseUrl+'user/login',loginDto)
  }
  updateUser(updateUserDto:any,updateUserId:any){
    return this._httpClient.put<any>(this.baseUrl+`user/${updateUserId}`,updateUserDto)
  }
  getCurrentUser() : User {
    return jwtDecode(localStorage["a_access_token"]);
  }

  getHeaders() {

    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._authService.getToken()
    })
    return headers;
  }
}
