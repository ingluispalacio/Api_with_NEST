import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/modules/tasks/dto/update-task.dto';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(task: CreateTaskDto) {
    try {
      return await this.prisma.task.create({
        data: task
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Error creating task. Ensure the data is valid.',
      );
    }
  }

  async findAll(userId: string ='', isAdmin: boolean= true, skip: number = 0, take: number = 10) {
    const whereCondition = isAdmin
      ? { deletedAt: null } // Para administradores, obtén todas las tareas no eliminadas
      : { deletedAt: null, userId }; // Para usuarios normales, filtra por su ID
  
    return await this.prisma.task.findMany({
      where: whereCondition,
      skip,
      take,
    });
  }
  

  async findById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

   async update(id: string, task: UpdateTaskDto) {
      try {
        return await this.prisma.task.update({
          where: { id },
          data: task,
        });
      } catch (error) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
    }
  
   
    async remove(id: string) {
      try {
        return await this.prisma.task.update({
          where: { id },
          data: { deletedAt: new Date() },
        });
      } catch (error) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
    }
}
