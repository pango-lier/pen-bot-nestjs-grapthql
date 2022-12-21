import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { GroupDto } from './dto/group.dto';
import {
  CRUDResolver,
  FilterType,
  UpdateManyResponseType,
} from '@nestjs-query/query-graphql';
import { Filter, UpdateManyResponse } from '@nestjs-query/core';

@Resolver(() => GroupDto)
export class GroupsResolver extends CRUDResolver(GroupDto, {
  CreateDTOClass: CreateGroupInput,
  UpdateDTOClass: UpdateGroupInput,
}) {
  constructor(readonly service: GroupsService) {
    super(service);
  }

  @Mutation(() => GroupDto)
  restoreOneUser(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<GroupDto> {
    return this.service.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyUsers(
    @Args('input', { type: () => FilterType(GroupDto) })
    filter: Filter<GroupDto>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}
