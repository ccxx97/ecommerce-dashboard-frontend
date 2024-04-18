import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';
import { CreateProductDto } from '../models/dto/createProductDto';
import { UpdateProductDto } from '../models/dto/updateProductDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _authService:AuthService,
    private _httpClient:HttpClient
  ) { }
  baseUrl = environment.baseUrl;

  

  createProduct(createProductDto:CreateProductDto){
   return this._httpClient.post<any>(this.baseUrl+'Product',createProductDto);
  }
  updateProduct(updateProductDto:UpdateProductDto,productId:any){
   return this._httpClient.patch<any>(this.baseUrl+`Product/${productId}`,updateProductDto);
  }
  getAllProduct(){
   return this._httpClient.get<any>(this.baseUrl+'Product');
  }
  getProductWithId(productId:any){
   return this._httpClient.get<any>(this.baseUrl+`Product/${productId}`);
  }
  deleteProduct(productId:any){
   return this._httpClient.delete<any>(this.baseUrl+`Product/${productId}`);
  }
  deleteProductComment(productId:any,commentId:any){
    return this._httpClient.delete<any>(this.baseUrl+`Product/${productId}/comments/${commentId}`);
  }
}
