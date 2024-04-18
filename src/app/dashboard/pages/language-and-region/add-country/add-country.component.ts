import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { CountryService } from 'src/app/common/services/country.service';
import { CurrencyService } from 'src/app/common/services/currency.service';
import { LanguagesService } from 'src/app/common/services/languages.service';
import { TimezoneService } from 'src/app/common/services/timezone.service';

export interface Country {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
  languageId: any;
  currencyId: any;
  timezoneId: any;
}


@Component({
  selector: 'app-add-region',
  templateUrl: './add-country.component.html',
  styleUrl: './add-country.component.scss'
})
export class AddRegionComponent {

  languages: Array<any>= [];
  timezones: Array<any>= [];
  currencies: Array<any>= [];
  countries: any = [];
  updateMode:boolean = false;
  updateCountryId:any = null;

  constructor(
    private _httpClient:HttpClient,
    private _languagesService:LanguagesService,
    private _timezoneService:TimezoneService,
    private _countryService:CountryService,
    private _currencyService:CurrencyService,
    private messageService:MessageService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ){}

  countryForm = new FormGroup({
    name:new FormControl(""),
    code:new FormControl(""),
    languageId:new FormControl(""),
    currencyId:new FormControl(""),
    timezoneId:new FormControl(""),
    isActive:new FormControl(false)
  })

  ngOnInit(){
    this.getAllCountries();
    this.getAllTimezone();
    this.getAllCurrency();
    this.getAllLanguages();

    this.activatedRoute.params.subscribe({
      next:(param)=>{
        if(param["id"]){
          this.getCountryById(param["id"])
          this.updateMode = true;
        }
      }
    })
  }

  async getCountryById(countryId:any){
    this.updateCountryId = countryId;
    let res = await lastValueFrom(this._countryService.getCountry(countryId))

    if(res && res.data){
      let country : Country = res.data;
      this.countryForm.patchValue({
        name:country.name,
        languageId:country.languageId,
        timezoneId:country.timezoneId,
        code:country.code,
        currencyId:country.currencyId,
        isActive:country.isActive
      })
    }
  }

  addCountry(){

    if(this.updateMode){
      this.updateCountry()
      return;
    }
  
    this._countryService.createCountry(this.countryForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Countries'])
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

  updateCountry(){
    this._countryService.updateCountry(this.countryForm.value,this.updateCountryId).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Countries'])
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
  
  deleteCountry(){
    this._countryService.deleteCountry(this.updateCountryId).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Countries'])
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

  countryChange(event:any){
    const countryCCA2 = event.target.value;
    let findCountry = this.countries.find((x : any) => x.cca2 == countryCCA2);
    this.countryForm.controls.name.setValue(findCountry.name.common)
  }


  async getAllLanguages(){
    const res = await lastValueFrom(this._languagesService.getAllLanguage());
    if(res && res.data){
      this.languages = res.data;
      this.countryForm.controls.languageId.setValue(this.languages[0].id)
    }
  }
  async getAllCurrency(){
    const res = await lastValueFrom(this._currencyService.getAllCurrency());
    if(res && res.data){
      this.currencies = res.data;
    }
  }
  async getAllTimezone(){
    const res = await lastValueFrom(this._timezoneService.getAllTimezone());
    if(res && res.data){
      this.timezones = res.data;
    }
  }
  getAllCountries(){
    this._httpClient.get('https://restcountries.com/v3.1/all?fields=name,cca2').subscribe({
      next:(res)=>{
        this.countries = res;
        
      }
    })
  }
}
