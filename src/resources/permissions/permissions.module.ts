import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PrismaService } from 'src/common/database/prisma.service';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PrismaService],
  exports: [PrismaService],
})
export class PermissionsModule {}
