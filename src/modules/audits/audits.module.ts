import { Module } from '@nestjs/common';
import { AuditsService } from 'src/modules/audits/audits.service';
import { AuditsController } from 'src/modules/audits/audits.controller';
import { PrismaService } from 'src/common/database/prisma.service';

@Module({
  controllers: [AuditsController],
  providers: [AuditsService, PrismaService],
  exports: [PrismaService],
})
export class AuditsModule {}
