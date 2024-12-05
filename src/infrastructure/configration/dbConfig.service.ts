import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
abstract class IDbConfig {
  
    abstract getDatabaseName(): string;
    abstract getDatabaseHost(): string;
    abstract getDatabasePort(): number;
    abstract getDatabaseUser(): string;
    abstract getDatabasePassword(): string;
    abstract getDatabaseSchema(): string;
}
@Injectable()
export class DbConfigService extends IDbConfig{
  constructor(private readonly configService: ConfigService) {super() }
    getDatabaseHost(): string {
        return this.configService.get<string>('DATABASE_HOST');
      }
    
      getDatabasePort(): number {
        return this.configService.get<number>('DATABASE_PORT');
      }
    
      getDatabaseUser(): string {
        return this.configService.get<string>('DATABASE_USER');
      }
    
      getDatabasePassword(): string {
        return this.configService.get<string>('DATABASE_PASSWORD');
      }
    
      getDatabaseName(): string {
        return this.configService.get<string>('DATABASE_NAME');
      }
    
      getDatabaseSchema(): string {
        return this.configService.get<string>('DATABASE_SCHEMA');
      }
    
}