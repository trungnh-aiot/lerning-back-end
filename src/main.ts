import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setGlobalLogger } from './common/decorators/log-method.decorator';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api');
  const logger = app.get(LoggerService);

  setGlobalLogger(logger);

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
