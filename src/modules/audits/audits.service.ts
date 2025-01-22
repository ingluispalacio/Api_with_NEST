import { Injectable } from '@nestjs/common';
import { CreateAuditDto } from 'src/modules/audits/dto/create-audit.dto';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class AuditsService {
  constructor(private prisma: PrismaService) {}
  
  async create(createLogDto: CreateAuditDto) {
    try {
      const log = await this.prisma.logger.create({
        data: createLogDto,
      });
      return log;
    } catch (error) {
      console.error('Error creating log:', error.message);
      throw error;
    }
  
  }
  
  async findAll(skip: number = 0, take: number = 10) {
    return await this.prisma.logger.findMany({
      skip,
      take,
    });
  }

  async findByUserId(userId: string) {
    return await this.prisma.logger.findMany({
      where: { userId }
    });
  }
}
