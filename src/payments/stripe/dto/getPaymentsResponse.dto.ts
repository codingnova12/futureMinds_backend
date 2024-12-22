import { PaginatedData } from "src/utils/pagination.utils";

export class IPaymentIntent {
  id: string;
  amount_received: number;
  created_at: string;
  currency: string;
  status: string;
}
export class getPaymentsResponsetDto extends PaginatedData<{ id: string;
  amount_received: number;
  created_at: string;
  currency: string;
  status: string;}> {
}
