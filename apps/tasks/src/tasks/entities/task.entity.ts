import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Task {
  @Field((type) => ID)
  id: number;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
