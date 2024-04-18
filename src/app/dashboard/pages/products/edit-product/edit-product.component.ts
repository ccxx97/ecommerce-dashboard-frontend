import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { lastValueFrom } from 'rxjs';
import { UpdateProductDto } from 'src/app/common/models/dto/updateProductDto';
import { ProductService } from 'src/app/common/services/product.service';
import { UploadService } from 'src/app/common/services/upload.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditProductComponent {
  constructor(
    private _productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private uploadService: UploadService,
  ) { }


  public Editor = ClassicEditor;
  editorData: any;
  productName: string = '';
  responsiveOptions: any[] | undefined;
  loading:boolean = false;

  uploadedFiles: any[] = [];
  previewUrls: string[] = [];
  productId: any = null;
  comments = [];


  addProductForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    price: new FormControl(0),
    discountedPrice: new FormControl(0),
    variants: new FormControl([]),
    stock: new FormControl(""),
    isActive: new FormControl(null),
    images: new FormControl<any>([]),
  })


  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (res) => {
        if (res["id"]) {
          this.productId = res["id"];
          this.getProduct(res["id"])
        }
      }
    })
  }

  async getProduct(productId: any) {
    const res = await lastValueFrom(this._productService.getProductWithId(productId));
    const product = res.data;
    if (product) {
      this.addProductForm.patchValue({
        title: product.title,
        description: product.description,
        discountedPrice:parseInt(product.discountedPrice),
        price: parseInt(product.price),
        isActive: product.isActive,
        stock: product.stock
      })
      if(product.comments && product.comments.length > 0){
        this.comments = product.comments
      }

      if (product.images) {

        this.fetchAndShowImages(product);

      }
    }
  }

  fetchAndShowImages(product: any) {
    product.images.forEach((img: any) => {
      const url = 'http://localhost:3000/public/images/' + img;
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Image not found');
          }
          return response.blob();
        })
        .then(blob => {
          const file = new File([blob], img, { type: 'image/jpeg' });
          this.uploadedFiles.push(file);
          const url = this.getPreviewUrl(file);
          this.previewUrls.push(url);
        })
        .catch(error => {
          console.error('Error fetching image:', error);
          return;
        });
    });
  }

  async updateProduct(dto: any) {
    let updateProductDto: UpdateProductDto = dto;
    updateProductDto.images = [];
    if (this.uploadedFiles.length > 0) {
      await Promise.all(this.uploadedFiles.map(async (file) => {
        let res = await lastValueFrom(this.uploadService.uploadFile(file));
        if (res && res.data) {
          let image: any = res.data.filename;
          updateProductDto.images.push(image);
        }
      }));
    }

    this._productService.updateProduct(updateProductDto, this.productId).subscribe({
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
        else {
          this.messageService.add({ severity: 'warn', detail: errors.error.message });
        }

      }
    })
  }

  deleteImage(index: number) {
    this.uploadedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }

  deleteProduct() {
    this._productService.deleteProduct(this.productId).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', detail: res.data.message });
        this.router.navigate(['/Products'])
      },
      error: (errors) => {
        this.messageService.add({ severity: 'warn', detail: errors.error.message });
      }
    })
  }

  deleteProductComment(commentId:any) {
    this._productService.deleteProductComment(this.productId,commentId).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', detail: res.data.message });
      },
      error: (errors) => {
        this.messageService.add({ severity: 'warn', detail: errors.error.message });
      },
      complete:()=>{
        this.getProduct(this.productId);
      }
    })
  }

  getPreviewUrl(file: File): string {
    if (file) {
      return URL.createObjectURL(file);
    }
    return 'https://placehold.co/100';
  }


  onUpload(event: any, fileUpload: FileUpload) {
    for (let file of event.files) {
      if (!this.uploadedFiles.includes(file)) {
        this.uploadedFiles.push(file);
        this.previewUrls.push(URL.createObjectURL(file))
        fileUpload.clear();
      }
    }
  }

}
