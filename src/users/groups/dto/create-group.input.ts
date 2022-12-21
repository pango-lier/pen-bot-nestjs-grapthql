import { InputType, Int, Field, OmitType } from '@nestjs/graphql';
import { GroupDto } from './group.dto';

@InputType()
export class CreateGroupInput extends OmitType(GroupDto, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {}
