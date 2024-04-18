export interface UpdateProductDto {
    title:string,
    description:string,
    price:number,
    discountedPrice?:number,
    variants?:[],
    stock:number,
    isAcive:boolean,
    images:Array<string>;
}