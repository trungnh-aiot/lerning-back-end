import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacebookService } from './authentication/facebook/facebook.service';
import { validate } from './configs/environment-variables.config';
import { DatabaseModule } from './database/database.module';
import { FacebookService } from './facebook/facebook.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { JwtGuard } from './modules/authentication/guards/jwt.guard';
import { ResponseInterceptor } from './modules/authentication/interceptors/response.interceptor';
import { UserModule } from './modules/user/user.module';
import { GoogleService } from './src/modules/authentication/google/google.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    DatabaseModule,
    AuthenticationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    FacebookService,
    GoogleService,
  ],
})
export class AppModule {}
