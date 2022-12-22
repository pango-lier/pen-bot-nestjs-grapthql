import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { AccountDto } from './dto/account.dto';
import {
  CRUDResolver,
  FilterType,
  UpdateManyResponseType,
} from '@nestjs-query/query-graphql';
import { Filter, UpdateManyResponse } from '@nestjs-query/core';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';

@Resolver(() => AccountDto)
export class AccountsResolver extends CRUDResolver(AccountDto, {
  CreateDTOClass: CreateAccountInput,
  UpdateDTOClass: UpdateAccountInput,
}) {
  constructor(readonly service: AccountsService) {
    super(service);
  }

  @Mutation(() => AccountDto)
  restoreOne(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<AccountDto> {
    return this.service.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreMany(
    @Args('input', { type: () => FilterType(AccountDto) })
    filter: Filter<AccountDto>,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreMany(filter);
  }
}
