import { Controller, Get, Post,  Param, UseGuards } from '@nestjs/common';
import { AuditsService } from 'src/modules/audits/audits.service';
import { AuthzGuard } from 'src/common/guards/authz/authz.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token') 
@Controller('audits')
@UseGuards(AuthzGuard)
export class AuditsController {
  constructor(private readonly auditsService:AuditsService) {}

  @Get()
  findAll() {
    return this.auditsService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.auditsService.findByUserId(userId);
  }

}
