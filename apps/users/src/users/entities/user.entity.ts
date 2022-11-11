import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  id: string;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
