import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from 'src/modules/roles/roles.service';
import { CreateRoleDto } from 'src/modules/roles/dto/create-role.dto';
import { UpdateRoleDto } from 'src/modules/roles/dto/update-role.dto';
import { AuthzGuard } from 'src/common/guards/authz/authz.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token') 
@Controller('roles')
@UseGuards(AuthzGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Get()
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.rolesService.remove(id);
  }
}
