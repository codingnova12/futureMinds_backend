import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './infrastructure/configration/appConfig.service';
import { AllExceptionsFilter } from './infrastructure/filters/allExceptions.filter';
import { CloudinaryService } from './shared/services/cloudinary/cloudinary.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.Interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));

        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  const appConfigService = app.get(AppConfigService);
  const cloudinaryServ = app.get(CloudinaryService);
  app.enableCors({ origin: '*' });
  const port = process.env.PORT;
  cloudinaryServ.init();
  await app.listen(port);
}
bootstrap();
