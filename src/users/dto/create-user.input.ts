import { InputType, OmitType } from '@nestjs/graphql';
import { UserDto } from './user.dto';

@InputType()
export class CreateUserInput extends OmitType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
