import { CreateNotificationInput } from './create-notification.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateNotificationInput extends PartialType(
  CreateNotificationInput,
) {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  id?: number;
}
