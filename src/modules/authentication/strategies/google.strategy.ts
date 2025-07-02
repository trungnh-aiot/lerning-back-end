import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { ERROR_MESSAGES } from 'src/common/constants/messages.constants';
import { DatabaseService } from 'src/database/database.service';

import { LoginDto } from '../dto/login.dto';
import { LoginStrategy } from '../types/login-strategy.interface';

@Injectable()
export class GoogleStrategy implements LoginStrategy {
  constructor(private databaseService: DatabaseService) {}
  async validate(dto: LoginDto): Promise<User> {
    const user = await this.databaseService.user.findUnique({
      where: {
        provider_providerUserId: {
          provider: dto.provider,
          providerUserId: dto.providerUserId!,
        },
      },
    });
    if (!user) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.AUTHENTICATION.GOOGLE_USER_NOT_FOUND,
      );
    }
    return user;
  }
}
