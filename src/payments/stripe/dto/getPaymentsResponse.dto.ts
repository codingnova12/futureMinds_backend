
export interface IPaymentIntent{
    id:string
    amount_received: number;
    created_at:string;
    currency:string
    status:string
}
export class getPaymentsResponsetDto  {
     data: IPaymentIntent[]
  }
  