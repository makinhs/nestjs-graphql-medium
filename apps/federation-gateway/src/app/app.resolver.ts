import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateTaskInput } from '../../../tasks/src/tasks/dto/create-task.input';
import { CurrentUser } from '../../../tasks/src/tasks/tasks.resolver';
import { AppService } from './app.service';
import { UserToken } from '../../../users/src/users/entities/userToken.entity';
import { LoginInput } from '../../../users/src/users/dto/login.input';

@Resolver(() => UserToken)
export class AppResolver {
  constructor(private readonly appService: AppService) {}
}
