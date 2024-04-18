import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { CreateProductDto } from 'src/app/common/models/dto/createProductDto';
import { ProductService } from 'src/app/common/services/product.service';
import { UploadService } from 'src/app/common/services/upload.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class AddProductComponent {

  constructor(
    private uploadService: UploadService,
    private _productService: ProductService,
    private messageService: MessageService,
    private router: Router
  ) { }
  public Editor = ClassicEditor;
  editorData: any;
  productName: string = '';
  responsiveOptions: any[] | undefined;
  uploadedFiles: any[] = [];


  addProductForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    price: new FormControl(0),
    discountedPrice: new FormControl(0),
    variants: new FormControl([]),
    stock: new FormControl(0),
    isActive: new FormControl<boolean>(true),
    images: new FormControl<any>([]),
  })





  async addProduct(dto: any) {
    let createProductDto: CreateProductDto = dto;
    createProductDto.images = [];

    if (this.uploadedFiles.length > 0) {
      await Promise.all(this.uploadedFiles.map(async (file) => {
        let res = await lastValueFrom(this.uploadService.uploadFile(file));
        if (res && res.data) {
          let image: any = res.data.filename;
          createProductDto.images.push(image);
        }
      }));
    }

    setTimeout(() => {
      this._productService.createProduct(createProductDto).subscribe({
        next: (res) => {
          if (res) {
            this.messageService.add({ severity: 'success', detail: res.data.message });
            this.router.navigate(['/Products'])
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
    }, 3000);

  }

  onUpload(event: any) {
    for (let file of event.files) {
      if(!this.uploadedFiles.includes(file)){
        this.uploadedFiles.push(file);
      }
    }
  }

}
