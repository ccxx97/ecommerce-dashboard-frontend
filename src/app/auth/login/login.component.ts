import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = {
    email:'',
    password:''
  }
  loading:boolean = false;

  constructor(
    private router:Router,
    private messageService:MessageService,
    private _userService:UserService
  ){}
ngOnInit(){
  if(localStorage["a_access_token"]){
    this.router.navigate([''])
  }
}
login(){
  this.loading = true;
  this._userService.login(this.loginForm).subscribe({
    next: (res) => {
      if (res) {
       if(res && res.data){
        localStorage.setItem("a_access_token",res.data);
        this.loading = false;
        setTimeout(() => {
          this.router.navigate([''])
        }, 1000);
       }
      }
    },
    error: (errors) => {
      this.loading = false;
        this.messageService.add({ severity: 'warn', detail: errors.error.message});
  },
})


  // localStorage.setItem("a_access_token",'sa');
  // this.router.navigate([''])

}

}
