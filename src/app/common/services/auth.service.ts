import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _httpClient: HttpClient,
    private router: Router
  ) { }

  baseUrl = environment.baseUrl;
  user = new ReplaySubject();
  user$ = this.user.asObservable();



  register(userDto: any) {
    return this._httpClient.post<any>(this.baseUrl + 'auth/register', userDto)
  }
  login(userDto: any) {
    return this._httpClient.post<any>(this.baseUrl + 'auth/login', userDto)
  }
  getCurrentUser() {
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      let user: any = jwtDecode(access_token);
      return user;
    }
    return;
  }
  getToken() {
    let access_token = localStorage.getItem("a_access_token");
    if (access_token) {

      return access_token;
    }
    return null;
  }
  logout(): void {
    localStorage.removeItem("access_token");
    this.router.navigate(['/login']);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  setCurrentUser() { }

}
