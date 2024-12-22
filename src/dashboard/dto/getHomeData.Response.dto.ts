import { IPaymentIntent } from "src/payments/stripe/dto/getPaymentsResponse.dto";

export class GetHomeDataResponseDto{
    
        lastTransaction:Partial<IPaymentIntent>   
}