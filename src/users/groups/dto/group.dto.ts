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
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { AccountDto } from 'src/users/accounts/dto/account.dto';
import { GroupEnum } from '../entities/group.enum';

@InputType('GroupDtoInput')
@ObjectType()
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  defaultSort: [{ field: 'id', direction: SortDirection.DESC }],
})
@FilterableRelation('accounts', () => AccountDto, { nullable: true })
export class GroupDto {
  @IDField(() => ID)
  id?: number;

  @IsNotEmpty()
  @IsString()
  @FilterableField(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @FilterableField(() => GroupEnum, { defaultValue: GroupEnum.NONE })
  groupType: GroupEnum;

  @IsString()
  @FilterableField(() => String, { nullable: true })
  secretName?: string;

  @IsString()
  @FilterableField(() => String, { nullable: true })
  secretKey?: string;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  createdAt?: Date;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  updatedAt?: Date;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  deletedAt?: Date;

  @FilterableField(() => ID, { nullable: true })
  @IsInt()
  userId: number;
}
