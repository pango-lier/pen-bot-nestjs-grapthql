import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTutorialInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
