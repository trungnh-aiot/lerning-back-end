import { Body, Controller, Post } from '@nestjs/common';
import { SUCCESS_MESSAGES } from 'src/common/constants/messages.constants';

import { AuthenticationService } from './authentication.service';
import { Public } from './decorators/public.decorator';
import { ResponseMessage } from './decorators/response-message.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('login')
  @Public()
  @ResponseMessage(SUCCESS_MESSAGES.AUTHENTICATION.LOGIN)
  async login(@Body() loginDto: LoginDto) {
    const res = await this.authenticationService.login(loginDto);
    return res;
  }
}
