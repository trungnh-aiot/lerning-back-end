import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { configuration } from 'src/configs/configuration';
import { DatabaseService } from 'src/database/database.service';

import { LoginDto } from './dto/login.dto';
import { PublicUserDto } from './dto/public-user.dto';
import { LoginStrategyFactory } from './factory/login-strategy.factory';

@Injectable()
export class AuthenticationService {
  constructor(
    private databaseService: DatabaseService,
    private loginStrategyFactory: LoginStrategyFactory,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const loginStrategy = this.loginStrategyFactory.getStrategy(
      loginDto.provider,
    );
    const user = await loginStrategy.validate(loginDto);
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload, {
        privateKey: configuration.authentication.accessToken,
        expiresIn: configuration.authentication.accessTokenExpiresIn,
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: configuration.authentication.refreshToken,
        expiresIn: configuration.authentication.refreshTokenExpiresIn,
      }),
      user: plainToInstance(PublicUserDto, user, {
        excludeExtraneousValues: true,
      }),
    };
  }
}
