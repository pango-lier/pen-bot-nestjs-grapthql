import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { GraphQLISODateTime, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@InputType('RoleDtoInput')
@ObjectType()
export class RoleDto {
  @IDField(() => ID)
  id?: number;

  @FilterableField(() => String)
  name: string;

  @FilterableField(() => String)
  key: string;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  createdAt?: Date;

  @Type(() => Date)
  @FilterableField(() => GraphQLISODateTime)
  updatedAt?: Date;
}
