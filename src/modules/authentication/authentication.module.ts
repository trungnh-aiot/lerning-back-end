import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LoginStrategyFactory } from './factory/login-strategy.factory';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LoginStrategyFactory,
    LocalStrategy,
    FacebookStrategy,
    GoogleStrategy,
  ],
})
export class AuthenticationModule {}
