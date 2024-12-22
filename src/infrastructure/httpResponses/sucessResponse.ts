import { BaseResponse } from './baseResponse';

export class SuccessResponse extends BaseResponse {
  data: any;
  constructor(statusCode: number, data: any) {
    super(statusCode,"success");
    this.data = data;
  }
}
