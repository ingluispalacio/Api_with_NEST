import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule, 
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY, // Agrega un valor por defecto en caso de que no esté definida
      signOptions: { expiresIn: process.env.EXPIRES_IN}, // Agrega valor por defecto para expirar en una hora
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}



