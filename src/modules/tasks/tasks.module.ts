import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksController } from 'src/modules/tasks/tasks.controller';
import { TasksService } from 'src/modules/tasks/tasks.service';
import { LoggerMiddleware } from 'src/modules/tasks/logger/logger.middleware';
import { PrismaService } from 'src/common/database/prisma.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
  exports: [PrismaService],
})
export class TasksModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('tasks')
  }
}
