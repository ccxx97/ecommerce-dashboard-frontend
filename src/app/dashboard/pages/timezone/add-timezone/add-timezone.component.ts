import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { TimezoneService } from 'src/app/common/services/timezone.service';

interface Timezone {
  id: number;
  name: string;
  offset: string;
}


@Component({
  selector: 'app-add-timezone',
  templateUrl: './add-timezone.component.html',
  styleUrl: './add-timezone.component.scss'
})
export class AddTimezoneComponent {

  updateMode:boolean = false;
  updateTimezoneId:any = null;

  timezoneForm = new FormGroup({
    name:new FormControl(""),
    offset:new FormControl(""),
  })
  constructor(
    private _timezoneService:TimezoneService,
    private messageService:MessageService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ){}


  ngOnInit(){
    this.activatedRoute.params.subscribe({
      next:(param)=>{
        if(param["id"]){
          this.getTimezoneWithId(param["id"])
          this.updateMode = true;
        }
      }
    })
  }


  async getTimezoneWithId(timezoneId:any){
    this.updateTimezoneId = timezoneId;
    let res = await lastValueFrom(this._timezoneService.getTimezone(timezoneId))

    if(res && res.data){
      let timezone : Timezone = res.data;
      this.timezoneForm.patchValue({
        name:timezone.name,
        offset:timezone.offset
      })
    }
  }


  addTimezone(){

    if(this.updateMode){
      this.updateTimezone()
      return;
    }
  
    this._timezoneService.createTimezone(this.timezoneForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Timezone'])
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

  updateTimezone(){
    this._timezoneService.updateTimezone(this.timezoneForm.value,this.updateTimezoneId).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Timezone'])
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
  
  deleteTimezone(){
    this._timezoneService.deleteTimezone(this.updateTimezoneId).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Timezone'])
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
