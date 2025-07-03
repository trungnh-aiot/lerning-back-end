import { IsEmail, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @Match('password', { message: 'Passwords do not match' })
  password?: string;

  @IsString()
  @MinLength(6)
  confirmPassword?: string;

  @IsString()
  name: string;
}
