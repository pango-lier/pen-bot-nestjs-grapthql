import { InputType, OmitType } from '@nestjs/graphql';
import { AccountDto } from './account.dto';

@InputType()
export class CreateAccountInput extends OmitType(AccountDto, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {}
