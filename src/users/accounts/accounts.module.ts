import { Module } from '@nestjs/common';
import { AccountDto } from './dto/account.dto';
import { Account } from './entities/account.entity';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';

@Module({
  providers: [AccountsResolver, AccountsService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Account])],
      services: [AccountsService],
      dtos: [{ DTOClass: AccountDto }],
    }),
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
