import { UpdateManyResponse, Filter } from '@nestjs-query/core';
import {
  CRUDResolver,
  FilterType,
  UpdateManyResponseType,
} from '@nestjs-query/query-graphql';
import { Resolver, Args, Mutation, ID } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDto } from './dto/user.dto';

import { UsersService } from './users.service';

@Resolver(() => UserDto)
export class UsersResolver extends CRUDResolver(UserDto, {
  CreateDTOClass: CreateUserInput,
  UpdateDTOClass: UpdateUserInput,
}) {
  constructor(readonly service: UsersService) {
    super(service);
  }

  @Mutation(() => UserDto)
  restoreOneUser(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<UserDto> {
    return this.service.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyUsers(
    @Args('input', { type: () => FilterType(UserDto) }) filter: Filter<UserDto>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}
