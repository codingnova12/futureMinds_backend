import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary/cloudinary.service';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';
import { ConfigrationModule } from 'src/infrastructure/configration/configration.module';

@Module({
    imports:[ExceptionsModule,ConfigrationModule],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class SharedModule {}
