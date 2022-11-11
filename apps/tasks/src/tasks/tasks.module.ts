import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';

@Module({
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
