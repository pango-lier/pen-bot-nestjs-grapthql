import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSocialInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
