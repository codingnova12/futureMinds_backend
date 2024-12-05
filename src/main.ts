import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './infrastructure/configration/appconfig.service';
import { AllExceptionsFilter } from './infrastructure/filters/allExceptions.filter';
import { CloudinaryService } from './shared/services/cloudinary/cloudinary.service';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  const appConfigService = app.get(AppConfigService);
  const cloudinaryServ = app.get(CloudinaryService);
  app.enableCors({ origin: '*' });
  const port = 8080;
  cloudinaryServ.init();
  await app.listen(port);
}
bootstrap();
