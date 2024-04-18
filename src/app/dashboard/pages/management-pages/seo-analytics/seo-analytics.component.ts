import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { SiteSettingsService } from 'src/app/common/services/site-settings.service';

@Component({
  selector: 'app-seo-analytics',
  templateUrl: './seo-analytics.component.html',
  styleUrl: './seo-analytics.component.scss'
})
export class SeoAnalyticsComponent {
  constructor(
    private _siteSettingsService:SiteSettingsService,
    private messageService:MessageService
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
