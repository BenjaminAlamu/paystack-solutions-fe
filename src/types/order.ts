export interface IPaymentDetails {
    orderId: string;
    channel: string;
    amount: number;
    authorization_url?: string;
    offline_reference?: string;
    message: string;
  }
  
  export interface IOrder {
    id: string;
    orderRef: string;
    merchantId: string;
    userId: string;
    driverId: string | null;
    status: string;
    totalAmount: string;
    createdAt: Date;
  }

  export type OrderData = {
    paymentDetails: IPaymentDetails;
    order: IOrder
  }