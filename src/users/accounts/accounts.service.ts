import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryService } from '@nestjs-query/core';
import { Repository } from 'typeorm';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

@QueryService(Account)
export class AccountsService extends TypeOrmQueryService<Account> {
  constructor(@InjectRepository(Account) repo: Repository<Account>) {
    super(repo, { useSoftDelete: true });
  }
}
