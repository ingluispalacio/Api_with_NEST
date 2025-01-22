import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerHelper } from './common/helpers/logger.helper';
import { PrismaService } from './common/database/prisma.service';
import { HttpCatchErrorFilter } from './common/filters/http-catch-error.filter';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { LogsModule } from './modules/logs/logs.module';

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
