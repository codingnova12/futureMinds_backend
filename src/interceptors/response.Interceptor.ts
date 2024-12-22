import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResponse } from 'src/infrastructure/httpResponses/sucessResponse';
export interface StandardResponse<T> {
  status: string;
  statusCode: number;
  data?: T;
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardResponse<T>> {
      const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => (new SuccessResponse(response.statusCode,data))),
    );
  }
}
