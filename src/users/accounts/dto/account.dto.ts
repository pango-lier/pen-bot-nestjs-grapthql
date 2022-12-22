import { SortDirection } from '@nestjs-query/core';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { GraphQLISODateTime, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { GroupDto } from 'src/users/groups/dto/group.dto';

@InputType('AccountDtoInput')
@ObjectType()
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  defaultSort: [{ field: 'id', direction: SortDirection.DESC }],
})
@FilterableRelation('group', () => GroupDto, { nullable: true })
export class AccountDto {
  @IDField(() => ID)
  id?: number;

  @IsNotEmpty()
  @IsString()
  @FilterableField(() => String)
  name: string;

  @IsOptional()
  @IsBoolean()
  @FilterableField(() => Boolean, { defaultValue: true })
  active?: boolean;

  @IsString()
  @FilterableField(() => String, { nullable: true })
  proxyId?: string;

  @IsString()
  @FilterableField(() => String, { nullable: true })
  proxyType?: string;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  createdAt?: Date;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  expiresAt?: Date;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  updatedAt?: Date;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;

  @FilterableField(() => ID, { nullable: true })
  @IsInt()
  groupId?: number;
}
