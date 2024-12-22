import { BaseResponse } from './baseResponse';
interface error {
  code: string;
  message: string | [];
  timestamp: string;
  path: string;
}
export class ErrorResponse extends BaseResponse {
  error: error;
  constructor(statusCode: number, error: error) {
    super(statusCode, 'error');
    this.error = error;
  }
}
