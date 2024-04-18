import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { JsonEditorOptions, JsonEditorComponent } from 'ang-jsoneditor';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { LanguagesService } from 'src/app/common/services/languages.service';


interface Language {
  name: string;
  code: string;
  default:boolean;
}

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class LanguagesComponent {
  public editorOptions!: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false }) editor!: JsonEditorComponent;

  constructor(
    private messageService:MessageService,
    private _languagesService:LanguagesService
  ){
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.mode = 'code';
    this.editorOptions.enableSort = false;
    this.editorOptions.enableTransform = false;
    this.editorOptions.enableSort = false;
    this.editorOptions.modes = ['code'];
  }

  languages: Array<any> = [];
  loading:boolean = true;

  keywordsList  : any = {}
  visible: boolean = false;

  languageTranslateListVisible : boolean = false;
  translateList:any = {};
  updatedTranslationList:any = {};
  translateListCode:any = null;

  ngOnInit(){
    this.getAllLanguages();
    this.getKeywordList();
  }

  changeEditorData(value: any) {
    if (typeof value === 'object' && value.constructor !== Event) {
      this.updatedTranslationList = value;
    }
  }
  
  saveTranslateList(){
    this._languagesService.updateTranslateList(this.translateListCode,this.updatedTranslationList).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', detail: res.data.message });
          this.updatedTranslationList = {};
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
    })
  }

  openTranslateList(code:any){
    this.getLanguageTranslateList(code);
    this.languageTranslateListVisible = true;
    this.translateListCode = code;
  }

  saveDefaultKeywords(){
    this._languagesService.updateDefaultJson(this.keywordsList).subscribe({
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

  getLanguageTranslateList(code:any){
    fetch(`http://localhost:3000/public/languages/${code}.json`).then(res => res.json())
    .then(res => {
      const mergedList = { ...this.keywordsList, ...res };
      this.translateList = mergedList;
    })
  }

  getKeywordList(){
    fetch('http://localhost:3000/public/languages/default.json').then(res => res.json())
    .then(res => {
      this.keywordsList = res;
    })
  }

  async getAllLanguages(){
    const res = await lastValueFrom(this._languagesService.getAllLanguage())
    if(res){
      this.loading = false;
      this.languages = res.data;
    }
  }

  stringifyKeywords(){
    return JSON.stringify(this.keywordsList, null, 2);
  }
  stringifyTranslateList(){
    return JSON.stringify(this.translateList, null, 2);
  }

  addKeyword(keyword: string) {
    if (!this.keywordsList.hasOwnProperty(keyword)) {
      this.keywordsList[keyword] = '';
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Keyword Error',
        detail: `${keyword} already exists in the list.`,
      });
    }
  }


  showDialog() {
      this.visible = true;
  }

  editLanguage(language: Language) {
    console.log('Edit language:', language);
  }

  deleteLanguage(language: Language) {
    console.log('Delete language:', language);
  }
}
