import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configrations } from './config';
import { AppConfigService } from './APPconfig.service';
import { DbConfigService } from './DBconfig.service';
import { CloudinaryConfigService } from './cloudinaryConfig.service';

@Module({
    imports: [
        ConfigModule.forRoot({load:[...configrations],isGlobal:true}),
    ],
    providers: [AppConfigService, DbConfigService,CloudinaryConfigService],
    exports:[AppConfigService, DbConfigService,CloudinaryConfigService]
})
export class ConfigrationModule {}
