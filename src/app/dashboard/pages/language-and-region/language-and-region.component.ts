import { Component, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { CountryService } from 'src/app/common/services/country.service';

@Component({
  selector: 'app-language-and-region',
  templateUrl: './language-and-region.component.html',
  styleUrl: './language-and-region.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class LanguageAndRegionComponent {

  constructor(
    private _countryService:CountryService,
    private messageService:MessageService
  ){}
  countries: any[] = [];
  loading : boolean = true;

  ngOnInit(){
    this.getAllCountry();
  }

  async getAllCountry(){
    const res = await lastValueFrom(this._countryService.getAllCountry());
    if(res && res.data){
      this.loading = false;
      this.countries = res.data;
    }
  }


  updateCountryStatus(countryId: number, event: any): void {
    const isActive = event.checked;

    this._countryService.updateCountryStatus(countryId, isActive).subscribe({
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

