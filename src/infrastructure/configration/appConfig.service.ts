import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
abstract class IAppConfig {
   
     abstract getApplicationPort(): number
}
@Injectable()
export class AppConfigService extends IAppConfig{
    constructor(private readonly configService: ConfigService) {
        super()
    }
     getApplicationPort(): number {
         return this.configService.get<number>('APP.port');
     }
}