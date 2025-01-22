import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { LogInDto } from 'src/modules/auth/dto/log-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() logInDto: LogInDto) {
    return await this.authService.logIn(logInDto.email, logInDto.password);
  }
}
