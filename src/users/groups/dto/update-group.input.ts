import { CreateGroupInput } from './create-group.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {
  @Field(() => Int)
  id: number;
}
