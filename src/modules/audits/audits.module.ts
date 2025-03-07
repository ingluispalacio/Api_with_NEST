import { Module } from '@nestjs/common';
import { AuditsService } from 'src/modules/audits/audits.service';
import { AuditsController } from 'src/modules/audits/audits.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { CacheManagerModule } from 'src/common/cache-manager/cache-manager.module';

@Module({
  imports:[CacheManagerModule],
  controllers: [AuditsController],
  providers: [AuditsService, PrismaService],
  exports: [PrismaService],
})
export class AuditsModule {}
