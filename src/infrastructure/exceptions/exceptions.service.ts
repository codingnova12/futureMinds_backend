import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

export interface IException {
    badRequestException(data: IFormatExceptionMessage): void;
    internalServerErrorException(data?: IFormatExceptionMessage): void;
    forbiddenException(data?: IFormatExceptionMessage): void;
    UnauthorizedException(data?: IFormatExceptionMessage): void;
}
export interface IFormatExceptionMessage {
    message: string;
}
@Injectable({})
export class ExceptionsService implements IException{
    badRequestException(data: IFormatExceptionMessage): void {
        throw new BadRequestException(data);
      }
      internalServerErrorException(data?: IFormatExceptionMessage): void {
        throw new InternalServerErrorException(data);
      }
      forbiddenException(data?: IFormatExceptionMessage): void {
        throw new ForbiddenException(data);
      }
      UnauthorizedException(data?: IFormatExceptionMessage): void {
        throw new UnauthorizedException(data);
      }
}