import { CreateTutorialInput } from './create-tutorial.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTutorialInput extends PartialType(CreateTutorialInput) {
  @Field(() => Int)
  id: number;
}
