import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissionsService } from 'src/modules/permissions/permissions.service';
import { CreatePermissionDto } from 'src/modules/permissions/dto/create-permission.dto';
import { UpdatePermissionDto } from 'src/modules/permissions/dto/update-permission.dto';
import { AuthzGuard } from 'src/common/guards/authz/authz.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token') 
@Controller('permissions')
@UseGuards(AuthzGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionsService.create(createPermissionDto);
  }

  @Get()
  async findAll() {
    return await this.permissionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return await this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.permissionsService.remove(id);
  }
}
