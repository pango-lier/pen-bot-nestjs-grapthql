import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
import { InputType, OmitType } from '@nestjs/graphql';
import { UserContext } from 'src/auth/interface/user-context.interface';
import { NotificationDto } from './notification.dto';

@InputType()
@BeforeCreateOne(
  (
    input: CreateOneInputType<CreateNotificationInput>,
    context: UserContext,
  ) => {
    const { id: userId } = context.req.user;
    return { input: { ...input.input, userId } };
  },
)
@BeforeCreateMany(
  (
    input: CreateManyInputType<CreateNotificationInput>,
    context: UserContext,
  ) => {
    const { id: userId } = context.req.user;
    return { input: input.input.map((c) => ({ ...c, userId })) };
  },
)
export class CreateNotificationInput extends OmitType(NotificationDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
