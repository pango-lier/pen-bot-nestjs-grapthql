import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import { Exclude, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType('UserDtoInput')
@ObjectType()
export class UserDto {
  @IDField(() => ID)
  id?: number;

  @IsNotEmpty()
  @IsString()
  @FilterableField(() => String)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @FilterableField(() => String)
  email: string;

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

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  createdAt: Date;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  updatedAt: Date;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  deletedAt?: Date;
}
