import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

import { CreateUserDto } from './dto/create-user.dto';
import { FindProviderUserDto } from './dto/find-provider-user.dto';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}
  async findByProvider(findProviderUserDto: FindProviderUserDto) {
    const user = await this.databaseService.user.findUnique({
      where: {
        provider_providerUserId: {
          provider: findProviderUserDto.provider,
          providerUserId: findProviderUserDto.providerUserId,
        },
      },
    });
    return user;
  }
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.databaseService.user.create({
      data: {
        ...createUserDto,
      },
    });
    return user;
  }
}
