import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { SiteSettingsService } from 'src/app/common/services/site-settings.service';
import { UploadService } from 'src/app/common/services/upload.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {

  constructor(
    private _uploadService:UploadService,
    private _siteSettingsService:SiteSettingsService,
    private messageService:MessageService
  ){}

  addSliderPopupVisible = false;
  addSliderForm = new FormGroup({
    title:new FormControl(""),
    description:new FormControl(""),
    image:new FormControl("")
  })


  carouselItems : Array<any> = [];
  carouselItemIds : any = []
  ngOnInit(){
    this.getAllSlider();
  }

  updateOrder(){
    const ids = this.carouselItemIds;
    const newOrders = this.carouselItems.map(x => x.id);

    const body = {
      ids:ids,
      newOrders:newOrders
    }

    this._siteSettingsService.updateSliderOrder(body).subscribe({
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
    })

  }

  async getAllSlider(){
    const res = await lastValueFrom(this._siteSettingsService.getAllByOrder());
    if(res && res.data){
      const sliders : Array<any>  = res.data;
      this.carouselItems = sliders;
      this.carouselItemIds = sliders.map(x => x.id);
      console.log(this.carouselItemIds);
      
    }
  }

  deleteSliderImage(imageId:any){
    this._siteSettingsService.deleteSliderImage(imageId).subscribe({
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
        this.getAllSlider();
      }
    })
  }

  async onBasicUploadAuto(event:any){

    const file = event.target.files[0]
    const uploadRes = await lastValueFrom(this._uploadService.uploadFile(file));
    if(uploadRes && uploadRes.data){
      const filename = uploadRes.data.filename;
      this.addSliderForm.controls.image.setValue(filename);

    }

  }

  addImage(){
    this._siteSettingsService.addSliderImage(this.addSliderForm.value).subscribe({
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
        this.addSliderPopupVisible = false;
        this.addSliderForm.reset();
        this.getAllSlider();
      }
    })
  }

}
