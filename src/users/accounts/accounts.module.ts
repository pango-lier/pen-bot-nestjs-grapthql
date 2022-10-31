import { Module } from '@nestjs/common';
import { AccountDto } from './dto/account.dto';
import { Account } from './entities/account.entity';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

@Module({
  providers: [],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Account])],
      resolvers: [
        {
          DTOClass: AccountDto,
          EntityClass: Account,
        },
      ],
    }),
  ],
})
export class AccountsModule { }

