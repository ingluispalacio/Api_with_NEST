import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GLOBAL_PREFIX } from 'src/common/constants';
import { PrismaService } from 'src/common/database/prisma.service';
import { extractTokenFromHeader } from 'src/common/helpers/token.helper';

@Injectable()
export class AuthzGuard implements CanActivate {

     
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY, 
      });
    } catch (error) {
      throw new UnauthorizedException(`JWT verification failed: ${error.message}`);
    }

    // Obtener el usuario de la base de datos
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sud },
      select: {
        id: true,
        role: {
          select: {
            isConfigurator: true,
            permissions: { select: { endpoint: true, methods: true } },
          },
        },
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }
    
    request['user'] = user;

    const { method, route } = request;
    const endpoint = route.path;

    
    const hasPermission = user.role.permissions.some(
      (permission) =>
        GLOBAL_PREFIX + permission.endpoint === endpoint && permission.methods.includes(method),
    );

    if (!hasPermission && !user.role.isConfigurator) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
