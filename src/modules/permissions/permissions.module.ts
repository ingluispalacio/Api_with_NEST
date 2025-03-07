import { Module } from '@nestjs/common';
import { PermissionsService } from 'src/modules/permissions/permissions.service';
import { PermissionsController } from 'src/modules/permissions/permissions.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { CacheManagerModule } from 'src/common/cache-manager/cache-manager.module';

@Module({
  imports:[CacheManagerModule],
  controllers: [PermissionsController],
  providers: [PermissionsService, PrismaService],
  exports: [PrismaService],
})
export class PermissionsModule {}
