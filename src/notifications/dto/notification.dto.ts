import { SortDirection } from '@nestjs-query/core';
import {
  Authorize,
  FilterableField,
  IDField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { GraphQLISODateTime, ID, InputType, ObjectType } from '@nestjs/graphql';

import { IsInt, IsOptional } from 'class-validator';
import { NotificationsAuthorizer } from '../notifactions.authorizer';

@InputType('notificationInput')
@ObjectType('notification')
@Authorize(NotificationsAuthorizer)
@KeySet(['id'])
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  defaultSort: [{ field: 'id', direction: SortDirection.DESC }],
})
export class NotificationDto {
  @IDField(() => ID)
  id: number;

  @FilterableField(() => String, { defaultValue: 'notifications' })
  @IsOptional()
  type?: string;

  @FilterableField(() => ID, { defaultValue: null, nullable: true })
  @IsOptional()
  notifiableId?: number;

  @FilterableField(() => String, { nullable: true })
  @IsOptional()
  status?: string;

  @FilterableField(() => String)
  title: string;

  @FilterableField(() => String, { nullable: true })
  @IsOptional()
  message?: string;

  @FilterableField(() => String, { nullable: true })
  @IsOptional()
  data?: string;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  readId?: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  createdAt?: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  updatedAt?: Date;

  @FilterableField(() => ID, { nullable: true })
  @IsOptional()
  @IsInt()
  userId?: number;
}
