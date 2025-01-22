import { Module } from '@nestjs/common';
import { PermissionsService } from 'src/modules/permissions/permissions.service';
import { PermissionsController } from 'src/modules/permissions/permissions.controller';
import { PrismaService } from 'src/common/database/prisma.service';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PrismaService],
  exports: [PrismaService],
})
export class PermissionsModule {}
