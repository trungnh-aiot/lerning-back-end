import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

import { AuthProviderType } from '../types/auth-provider.type';

export class LoginDto {
  @IsEnum(AuthProviderType)
  provider: AuthProviderType;

  @ValidateIf((o: LoginDto) => o.provider === AuthProviderType.local)
  @IsEmail()
  email?: string;

  @ValidateIf((o: LoginDto) => o.provider === AuthProviderType.local)
  @IsString()
  @MinLength(6)
  password?: string;

  @ValidateIf((o: LoginDto) => o.provider !== AuthProviderType.local)
  @IsString()
  providerUserId?: string;

  @ValidateIf((o: LoginDto) => o.provider !== AuthProviderType.local)
  @IsString()
  token?: string;
}
