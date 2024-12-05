import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
abstract class ICloudinaryConfig {
   
    abstract getCloudName(): string
    abstract getApiKey(): string
    abstract getApiSecret(): string
}
@Injectable()
export class CloudinaryConfigService extends ICloudinaryConfig{
    constructor(private readonly configService: ConfigService) {
        super()
    }
     getCloudName(): string {
         return this.configService.get<string>('CLOUD_NAME');
    }

    getApiKey(): string {
        return this.configService.get<string>('API_KEY');
    }
    getApiSecret(): string {
        return this.configService.get<string>('API_SECRET');
    }
}