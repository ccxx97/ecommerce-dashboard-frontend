import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { UploadService } from 'src/app/common/services/upload.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(
    private _userService:UserService,
    private messageService:MessageService,
    private _uploadService:UploadService
  ){}
  changePasswordActive:boolean = false;
  changePasswordForm = {
    newPassword:'',
    newPasswordAgain:''
  }
  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    birthdate: new FormControl(null),
    gender: new FormControl(''),
    profileImage: new FormControl(null),
    email: new FormControl(''),
    password: new FormControl('')
  });


  ngOnInit(){
    this.getUserProfile();
  }

  changePassword(){
    if(this.changePasswordForm.newPassword !== this.changePasswordForm.newPasswordAgain){
      this.messageService.add({ severity: 'warn', detail: 'Passwords do not match'});
      return;
    }
    this._userService.changePassword({newPassword:this.changePasswordForm.newPassword}).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
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
  
      },
      complete:()=>{
        this.changePasswordActive = false;
        this.changePasswordForm.newPassword = '';
        this.changePasswordForm.newPasswordAgain = '';
      }
    })
  }

  async onBasicUploadAuto(event:any){

    const file = event.target.files[0]
    const uploadRes = await lastValueFrom(this._uploadService.uploadFile(file));
    if(uploadRes && uploadRes.data){
      const filename = uploadRes.data.filename;
      this.userForm.controls.profileImage.setValue(filename);

    }

  }

  getUserProfile(){
    this._userService.getProfile().subscribe({
      next:(res)=>{
       if(res && res.data){
        const user = res.data;
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          birthdate: user.birthdate,
          gender: user.gender,
          profileImage: user.profileImage
        });
       }
      }
    })
  }

  updateProfile(){
    this._userService.updateProfile(this.userForm.value,).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
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
