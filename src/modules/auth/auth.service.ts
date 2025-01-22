import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);

    const checkPassword = await compare(pass, user?.password);

    if (!checkPassword) throw new UnauthorizedException();

    const payload = { sud: user.id, name: user.name };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      message: 'Authentication Successful',
      data: { access_token: access_token },
    };
  }
}
