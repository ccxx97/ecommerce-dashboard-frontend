import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { LanguageDto } from 'src/app/common/models/dto/languageDto';
import { LanguagesService } from 'src/app/common/services/languages.service';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrl: './add-language.component.scss'
})
export class AddLanguageComponent {

  constructor(
    private _languagesService: LanguagesService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  updateMode: boolean = false;
  updateLanguageCode: string = '';

  languageForm = new FormGroup({
    name: new FormControl(""),
    code: new FormControl(""),
    isDefault: new FormControl<boolean>(false),
  })


  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (param) => {
        if (param["code"]) {
          this.getLanguageByCode(param["code"])
          this.updateLanguageCode = param["code"];
          this.updateMode = true;
        }
      }
    })
  }

  async getLanguageByCode(code: any) {
    let res = await lastValueFrom(this._languagesService.getLanguage(code));

    if (res && res.data) {
      let language: LanguageDto = res.data;
      this.languageForm.patchValue({
        name: language.name,
        code: language.code,
        isDefault: language.isDefault,
      })      
    }
  }

  updateLanguage() {
    this._languagesService.updateLanguage(this.languageForm.value, this.updateLanguageCode).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Languages'])
        }
      },
      error: (errors) => {
        if (errors.error.message.length > 1) {
          let errorsList: [] = errors.error.message;
          errorsList.forEach((err) => {
            this.messageService.add({ severity: 'warn', detail: err });
          })
        }
        else {
          this.messageService.add({ severity: 'warn', detail: errors.error.message });
        }

      }
    })
  }

  addLanguage() {
    if (this.updateMode) {
      this.updateLanguage();
      return;
    }

    this._languagesService.createLanguage(this.languageForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Languages'])
        }
      },
      error: (errors) => {
        if (errors.error.message.length > 1) {
          let errorsList: [] = errors.error.message;
          errorsList.forEach((err) => {
            this.messageService.add({ severity: 'warn', detail: err });
          })
        }
        else {
          this.messageService.add({ severity: 'warn', detail: errors.error.message });
        }

      }
    })
  }

  deleteLanguage(){
    this._languagesService.deleteLanguage(this.updateLanguageCode).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.router.navigate(['/Languages'])
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
