import { Module } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { UsersController } from 'src/modules/users/users.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { CacheManagerModule } from 'src/common/cache-manager/cache-manager.module';

@Module({
  imports:[CacheManagerModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService], 
})
export class UsersModule {}
