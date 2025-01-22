import { Body, Controller, Delete, Get, Param, Request, Patch, Post, UseGuards} from '@nestjs/common';
import { TasksService } from 'src/modules/tasks/tasks.service';
import { CreateTaskDto } from 'src/modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/modules/tasks/dto/update-task.dto';
import { AuthzGuard } from 'src/common/guards/authz/authz.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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
