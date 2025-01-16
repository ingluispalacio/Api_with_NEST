import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './resources/auth/auth.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { UsersModule } from './resources/users/users.module';
import { RolesModule } from './resources/roles/roles.module';
import { PermissionsModule } from './resources/permissions/permissions.module';
import { LogsModule } from './resources/logs/logs.module';
import { LoggerHelper } from './common/helpers/logger.helper';
import { PrismaService } from './common/database/prisma.service';
import { HttpCatchErrorFilter } from './common/filters/http-catch-error.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permite que el módulo sea accesible en toda la aplicación
    }),
    AuthModule,
    TasksModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    LogsModule,
  ],
  controllers: [],
  providers: [
    LoggerHelper,  // Registrar LoggerHelper
    PrismaService, // Registrar PrismaService
    HttpCatchErrorFilter,  // Registrar el filtro para que NestJS lo maneje
  ],
})
export class AppModule {}
