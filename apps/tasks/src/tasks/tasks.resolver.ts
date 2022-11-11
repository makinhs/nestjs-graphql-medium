import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import {TasksService} from './tasks.service';
import {Task} from './entities/task.entity';
import {CreateTaskInput} from './dto/create-task.input';
import {UpdateTaskInput} from './dto/update-task.input';
import {createParamDecorator} from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: string, ctx: GraphQLExecutionContext) => {
  try {
    const headers = ctx.getArgs()[2].req.headers;
    if (headers.user) {
      return JSON.parse(headers.user);
    }
  } catch (err) {
    return null;
  }
});

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {
  }

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput, @CurrentUser() loggedUser) {
    console.log(loggedUser);
    return this.tasksService.create(createTaskInput);
  }

  @Query(() => [Task], {name: 'tasks'})
  findAll() {
    return this.tasksService.findAll();
  }

  @Query(() => Task, {name: 'task'})
  findOne(@Args('id', {type: () => Int}) id: number) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask(@Args('id', {type: () => Int}) id: number) {
    return this.tasksService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): Task {
    return this.tasksService.findById(reference.id);
  }
}
