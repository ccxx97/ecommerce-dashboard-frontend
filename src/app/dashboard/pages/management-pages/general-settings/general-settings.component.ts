import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { SiteSettingsService } from 'src/app/common/services/site-settings.service';
import { UploadService } from 'src/app/common/services/upload.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.scss'
})
export class GeneralSettingsComponent {

  constructor(
    private _siteSettingsService:SiteSettingsService,
    private messageService:MessageService,
    private _uploadService:UploadService
  ){}
  siteSettingsForm = new FormGroup({
    siteTitle: new FormControl('', ),
    seoKeywords: new FormControl('', ),
    siteDescription: new FormControl('', ),
    siteLogoUrl: new FormControl('', ),
    siteFaviconUrl: new FormControl('', ),
    metaTitle: new FormControl('', ),
    metaDescription: new FormControl('', ),
    metaKeywords: new FormControl('', ),
  });
  previewLogoUrl = null;
  previewFaviconUrl = null;

  ngOnInit(){
    this.getSiteSettings();
  }

  async getSiteSettings() {
    const res = await lastValueFrom(this._siteSettingsService.getSiteSettings()) 

    if(res && res.data) {
      const response = res.data;
      this.siteSettingsForm.patchValue({
        siteTitle: response.siteTitle,
        seoKeywords: response.seoKeywords,
        siteDescription: response.siteDescription,
        siteLogoUrl: response.siteLogoUrl,
        siteFaviconUrl: response.siteFaviconUrl,
        metaTitle: response.metaTitle,
        metaDescription: response.metaDescription,
        metaKeywords: response.metaKeywords,
      });
    }
  }

  async onBasicUploadAuto(event:any,type:any){

    const file = event.target.files[0]
    const uploadRes = await lastValueFrom(this._uploadService.uploadFile(file));
    if(uploadRes && uploadRes.data){
      const filename = uploadRes.data.filename;
      switch(type){
        case('logo'):
          this.siteSettingsForm.controls.siteLogoUrl.setValue(filename);
          console.log(this.siteSettingsForm.value)
        break;
        case('favicon'):
        this.siteSettingsForm.controls.siteFaviconUrl.setValue(filename);
        break;
      }
    }

  }

  updateSiteSettings(){
    this._siteSettingsService.updateSiteSettings(this.siteSettingsForm.value).subscribe({
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
