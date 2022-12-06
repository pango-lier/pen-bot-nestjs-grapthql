import { SortDirection } from '@nestjs-query/core';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  BeforeUpdateMany,
  BeforeUpdateOne,
  FilterableField,
  FilterableOffsetConnection,
  FilterableRelation,
  IDField,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { GraphQLISODateTime, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Exclude, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { AccountDto } from '../accounts/dto/account.dto';
import {
  HashPasswordCreateManyHook,
  HashPasswordCreateOneHook,
  HashPasswordUpdateManyHook,
  HashPasswordUpdateOneHook,
} from '../hooks/hash-password.hook';

@InputType('UserDtoInput')
@ObjectType()
@BeforeCreateOne(HashPasswordCreateOneHook)
@BeforeCreateMany(HashPasswordCreateManyHook)
@BeforeUpdateOne(HashPasswordUpdateOneHook)
@BeforeUpdateMany(HashPasswordUpdateManyHook)
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  defaultSort: [{ field: 'id', direction: SortDirection.DESC }],
})
@FilterableOffsetConnection('groups', () => AccountDto, {
  enableTotalCount: true,
  nullable: true,
})
export class UserDto {
  @IDField(() => ID)
  id?: number;

  @IsString()
  @FilterableField(() => String, { nullable: true })
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  @FilterableField(() => String)
  email: string;

  @FilterableField(() => String, { nullable: true })
  username?: string;

  @IsString()
  @MinLength(6)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  @Exclude({ toPlainOnly: true })
  @FilterableField(() => String)
  password: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   @IsMatchWith('password')
  //   @Expose({ name: 'passwordConfirm' })
  //   @FilterableField()
  //   passwordConfirm: string;

  @Exclude({ toPlainOnly: true })
  rememberToken?: string;

  @Exclude({ toPlainOnly: true })
  refreshToken?: string;

  @IsOptional()
  @IsBoolean()
  @FilterableField(() => Boolean, { defaultValue: true })
  active?: boolean;

  @FilterableField(() => Number, { defaultValue: true })
  rolesId?: number;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  createdAt?: Date;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  updatedAt?: Date;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  deletedAt?: Date;
}
