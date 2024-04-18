import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  constructor(
    private _userService:UserService,
    private messageService:MessageService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ){}

  updateMode:boolean = false;
  updateUserId:any = null;
  showPassword:boolean = false;

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    birthdate: new FormControl(null),
    gender: new FormControl(''),
    profileImage: new FormControl(null),
    email: new FormControl(''),
    password: new FormControl(''),
  });



  ngOnInit(){
    this.activatedRoute.params.subscribe({
      next:(param)=>{
        if(param["id"]){
          this.getUserWithId(param["id"])
          this.updateMode = true;
        }
      }
    })
  }


  async getUserWithId(userId:any){
    this.updateUserId = userId;
    let res = await lastValueFrom(this._userService.getUser(userId))

    if(res && res.data){
      let user: any = res.data;
      this.userForm.patchValue({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        birthdate: user.birthdate || null,
        gender: user.gender || '',
        profileImage: user.profileImage || null,
        email: user.email || '',
        password: user.password || ''
      });
    }
  }


  addUser(){

    if(this.updateMode){
      this.updateUser()
      return;
    }
  
    this._userService.createUser(this.userForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Users'])
        }
      },
      error: (errors) => {
        if (errors.error.message.length > 1) {
          let errorsList: [] = errors.error.message;
          errorsList.forEach((err) => {
            this.messageService.add({ severity: 'warn', detail: err });
          })
        }
        else
        {
          this.messageService.add({ severity: 'warn', detail: errors.error.message});
        }
  
      }
    })
  }

  updateUser(){
    this._userService.updateUser(this.userForm.value,this.updateUserId).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Users'])
        }
      },
      error: (errors) => {
        if (errors.error.message.length > 1) {
          let errorsList: [] = errors.error.message;
          errorsList.forEach((err) => {
            this.messageService.add({ severity: 'warn', detail: err });
          })
        }
        else
        {
          this.messageService.add({ severity: 'warn', detail: errors.error.message});
        }
  
      }
    })

  }
  
  deleteUser(){
    this._userService.deleteUser(this.updateUserId).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Users'])
        }
      },
      error: (errors) => {
        if (errors.error.message.length > 1) {
          let errorsList: [] = errors.error.message;
          errorsList.forEach((err) => {
            this.messageService.add({ severity: 'warn', detail: err });
          })
        }
        else
        {
          this.messageService.add({ severity: 'warn', detail: errors.error.message});
        }
  
      }
    })
  }

}
