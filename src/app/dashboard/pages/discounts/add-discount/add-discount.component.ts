import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { CreateDiscountDto } from 'src/app/common/models/dto/createDiscountDto';
import { DiscountService } from 'src/app/common/services/discount.service';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrl: './add-discount.component.scss'
})
export class AddDiscountComponent {

constructor(
  private activatedRoute:ActivatedRoute,
  private _discountService:DiscountService,
  private messageService:MessageService,
  private router:Router
){}
updateMode:boolean = false;
updateDiscountId:any= null;


discountForm = new FormGroup<CreateDiscountDto | any>({
  minPurchaseAmount: new FormControl(0, [Validators.required, Validators.min(0)]),
  startDate: new FormControl('', Validators.required),
  endDate: new FormControl('', Validators.required),
  discountAmount: new FormControl(0, [Validators.required, Validators.min(0)]),
  discountCode: new FormControl('', Validators.required),
  isActive: new FormControl(null, Validators.required)
})

ngOnInit(){
  this.activatedRoute.params.subscribe({
    next:(param)=>{
      if(param["id"]){
        this.getDiscountWithId(param["id"])
        this.updateMode = true;
      }
    }
  })
}

  async getDiscountWithId(discountId:any){
  this.updateDiscountId = discountId;
  let res = await lastValueFrom(this._discountService.getDiscount(discountId))

  if(res && res.data){
    let discount : CreateDiscountDto = res.data;
    this.discountForm.patchValue({
      discountAmount:discount.discountAmount,
      minPurchaseAmount:discount.minPurchaseAmount,
      discountCode:discount.discountCode,
      isActive:discount.isActive,
      startDate:discount.startDate,
      endDate:discount.endDate,
    })
  }
}


deleteDiscount(){
  this._discountService.deleteDiscount(this.updateDiscountId).subscribe({
    next: (res) => {
      if (res) {
        this.messageService.add({ severity: 'success', detail: res.data.message });
        this.router.navigate(['/Discounts'])
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

updateDiscount(){
  let discountDto : CreateDiscountDto = {
    discountAmount:this.discountForm.controls['discountAmount'].value,
    discountCode:this.discountForm.controls['discountCode'].value,
    minPurchaseAmount:this.discountForm.controls['minPurchaseAmount'].value,
    startDate:this.discountForm.controls['startDate'].value,
    endDate:this.discountForm.controls['endDate'].value,
    isActive:this.discountForm.controls['isActive'].value,
  }
  this._discountService.updateDiscount(discountDto,this.updateDiscountId).subscribe({
    next: (res) => {
      if (res) {
        this.messageService.add({ severity: 'success', detail: res.data.message });
        this.router.navigate(['/Discounts'])
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

createDiscount(){

  if(this.updateMode){
    this.updateDiscount()
    return;
  }

  let discountDto : CreateDiscountDto = {
    discountAmount:this.discountForm.controls['discountAmount'].value,
    discountCode:this.discountForm.controls['discountCode'].value,
    minPurchaseAmount:this.discountForm.controls['minPurchaseAmount'].value,
    startDate:this.discountForm.controls['startDate'].value,
    endDate:this.discountForm.controls['endDate'].value,
    isActive:this.discountForm.controls['isActive'].value,
  }
  this._discountService.createDiscount(discountDto).subscribe({
    next: (res) => {
      if (res) {
        this.messageService.add({ severity: 'success', detail: res.data.message });
        this.router.navigate(['/Discounts'])
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
