import { IPaymentIntent } from "src/payments/stripe/dto/getPaymentsResponse.dto";

export class GetHomeDataResponseDto{
    
    data: {
        lastTransaction:Partial<IPaymentIntent>   
    }
}