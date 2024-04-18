import { Component, ViewEncapsulation } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SiteSettingsService } from 'src/app/common/services/site-settings.service';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrl: './site-settings.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class SiteSettingsComponent {


  constructor(
    private _siteSettings:SiteSettingsService
  ) { }

  ngOnInit(){
    this.getSiteSettings();
  }

  async getSiteSettings(){
    const res = await lastValueFrom(this._siteSettings.getSiteSettings());
   
    console.log(res);
  }

}
