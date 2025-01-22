import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from 'src/modules/roles/dto/create-role.dto';
import { UpdateRoleDto } from 'src/modules/roles/dto/update-role.dto';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.prisma.role.create({
        data: createRoleDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Error creating role. Ensure the data is valid.',
      );
    }
  }

  async findAll(skip: number = 0, take: number = 10) {
    return await this.prisma.role.findMany({
      where: { deletedAt: null }, 
      skip,
      take,
    });
  }

  async findById(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException(`Rol with id ${id} not found`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.prisma.role.update({
        where: { id },
        data: updateRoleDto,
      });
    } catch (error) {
      throw new NotFoundException(`Rol with id ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.role.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`Rol with id ${id} not found`);
    }
  }
}
