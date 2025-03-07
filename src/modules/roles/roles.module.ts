import { Module } from '@nestjs/common';
import { RolesService } from 'src/modules/roles/roles.service';
import { RolesController } from 'src/modules/roles/roles.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { CacheManagerModule } from 'src/common/cache-manager/cache-manager.module';

@Module({
  imports:[CacheManagerModule],
  controllers: [RolesController],
  providers: [RolesService, PrismaService],
  exports: [PrismaService],
})
export class RolesModule {}
