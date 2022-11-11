import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String)
  username: string;
  @Field(() => String)
  password: string;
}
