import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

import { AuthProviderType } from '../types/auth-provider.type';

export class SignUpDto {
  @IsEnum(AuthProviderType)
  provider: AuthProviderType;

  @ValidateIf((o: SignUpDto) => o.provider === AuthProviderType.local)
  @IsEmail()
  email?: string;

  @ValidateIf((o: SignUpDto) => o.provider === AuthProviderType.local)
  @Match('password', { message: 'Passwords do not match' })
  password?: string;

  @ValidateIf((o: SignUpDto) => o.provider === AuthProviderType.local)
  @IsString()
  @MinLength(6)
  confirmPassword?: string;

  @ValidateIf((o: SignUpDto) => o.provider !== AuthProviderType.local)
  @IsString()
  providerUserId?: string;

  @ValidateIf((o: SignUpDto) => o.provider !== AuthProviderType.local)
  @IsString()
  token?: string;
}
