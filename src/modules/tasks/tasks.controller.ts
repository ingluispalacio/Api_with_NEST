import { Body, Controller, Delete, Get, Param, Request, Patch, Post, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthzGuard } from '../auth/guards/authz/authz.guard';

@ApiBearerAuth('access-token') 
@Controller('tasks')
@UseGuards(AuthzGuard)
export class TasksController {

    constructor(private tasksService: TasksService){}

    @Post()
    async create(@Body() task : CreateTaskDto){
        return await this.tasksService.create(task);
    }

    @Get()
    async get(@Request() req) {
        const isAdmin = req.user.role.isConfigurator; // Determina si el usuario es administrador
        const userId = req.user.id; // ID del usuario actual
        return await this.tasksService.findAll(userId, isAdmin);
    }


    @Get(':id')
    async getById(@Param('id')  id:string){
        return await this.tasksService.findById(id)
    }

    @Patch(':id')
    async update(@Param('id') id: string,@Body() task : UpdateTaskDto){
        return await this.tasksService.update(id, task);
    }

    @Delete(':id')
    async remove(@Param('id') id: string){
        return await this.tasksService.remove(id);
    }
}
