export interface CreateDiscountDto {
    minPurchaseAmount: number;
    startDate: Date;
    endDate: Date;
    discountAmount: number;
    discountCode: string;
    isActive:boolean;
}