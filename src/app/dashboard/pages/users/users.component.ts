import { Component, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class UsersComponent {

  constructor(
    private _userService:UserService,
    private messageService:MessageService
  ){}

  users = [];
  loading:boolean = false;


  ngOnInit(){
    this.getAllUser();
  }

  deleteUser(userId:any){
    this._userService.deleteUser(userId).subscribe({
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
        this.getAllUser();
      }
    })
  }


  async getAllUser(){
    const res = await lastValueFrom(this._userService.getAllUser())
    if(res && res.data){
      this.loading = false;
      this.users = res.data;
    }
  }
}
