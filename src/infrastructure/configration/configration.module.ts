import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configrations } from './config';
import { AppConfigService } from './appconfig.service';
import { DbConfigService } from './dbconfig.service';
import { CloudinaryConfigService } from './cloudinaryConfig.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [...configrations], isGlobal: true })],
  providers: [AppConfigService, DbConfigService, CloudinaryConfigService],
  exports: [AppConfigService, DbConfigService, CloudinaryConfigService],
})
export class ConfigrationModule {}
