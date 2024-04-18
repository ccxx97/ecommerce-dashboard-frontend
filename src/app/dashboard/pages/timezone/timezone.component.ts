import { Component, ViewEncapsulation } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { TimezoneService } from 'src/app/common/services/timezone.service';

interface Timezone {
  id: number;
  name: string;
  offset: string;
}

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrl: './timezone.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class TimezoneComponent {

  timezones: Timezone[] = [];
  loading:boolean = true;

  constructor(
    private _timezoneService:TimezoneService
  ){}

  ngOnInit(){
    this.getAllTimezone();
  }


  async getAllTimezone(){
    const res = await lastValueFrom(this._timezoneService.getAllTimezone())
    if(res && res.data){
      this.loading = false;
      this.timezones = res.data;
    }
  }

}
