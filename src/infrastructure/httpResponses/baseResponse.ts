export class BaseResponse {
  statusCode: number;
  status: string;
  constructor(statusCode: number,status:string) {
    this.statusCode = statusCode;
    this.status=status
  }
}
