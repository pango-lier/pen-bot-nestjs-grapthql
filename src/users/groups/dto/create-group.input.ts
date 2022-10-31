import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
