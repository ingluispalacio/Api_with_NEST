import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from 'src/modules/permissions/dto/create-permission.dto';
import { UpdatePermissionDto } from 'src/modules/permissions/dto/update-permission.dto';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      return await this.prisma.permission.create({
        data: createPermissionDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Error creating permission. Ensure the data is valid.',
      );
    }
  }

 async findAll(skip: number = 0, take: number = 10) {
     return await this.prisma.permission.findMany({
       where: { deletedAt: null }, 
       skip,
       take,
     });
   }
 
   async findById(id: string) {
     const permission = await this.prisma.permission.findUnique({
       where: { id },
     });
     if (!permission) {
       throw new NotFoundException(`Permission with id ${id} not found`);
     }
     return permission;
   }
 
   async update(id: string, updatePermissionDto: UpdatePermissionDto) {
     try {
       return await this.prisma.permission.update({
         where: { id },
         data: updatePermissionDto,
       });
     } catch (error) {
       throw new NotFoundException(`Permission with id ${id} not found`);
     }
   }
 
   async remove(id: string) {
     try {
       return await this.prisma.permission.delete({
         where: { id }
       });
     } catch (error) {
       throw new NotFoundException(`Permission with id ${id} not found`);
     }
   }
}
