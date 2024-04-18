import { Component, ViewEncapsulation } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { ProductService } from 'src/app/common/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class ProductsComponent {
  
  first: number = 0;
  rows: number = 10;

  constructor(
    private _productService:ProductService
  ){}
  productList : Array<any> = [];
  loading = true;

  ngOnInit(){
    this.getAllProduct();
  } 

  async getAllProduct(){
    let res =  await lastValueFrom(this._productService.getAllProduct())
    if(res){
      this.loading = false;
      this.productList = res.data;
    }

  }

  onPageChange(event: any) {
      this.first = event.first;
      this.rows = event.rows;
  }

  save(severity: string) {
  }


  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'warning';
    }
    return 'null';
  }

}
