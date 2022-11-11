import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserToken {
  @Field(() => String)
  accessToken: string;
}
