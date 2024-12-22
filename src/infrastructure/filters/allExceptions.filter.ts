import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorResponse } from '../httpResponses/errorResponse';

export interface HttpExceptionError {
  statusCode: number;
  message: string | [];
  error?: string;
}
@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();
    const status = exception.getStatus();
    const error = exception.getResponse() as HttpExceptionError;
    console.log(error);
    const responseData = {
      code: error.error ?? (error.message as string),
      message: error.message ?? null,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(new ErrorResponse(status, responseData));
  }
}
