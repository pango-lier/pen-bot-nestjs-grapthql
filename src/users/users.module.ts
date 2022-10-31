import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

import { RolesModule } from './roles/roles.module';
import { AccountsModule } from './accounts/accounts.module';

import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsModule } from 'src/notifications/notifications.module';


@Module({
  providers: [UsersResolver, UsersService, NotificationsService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([User])],
      services: [UsersService],
      dtos: [{ DTOClass: UserDto }],
    }),
    RolesModule,
    AccountsModule,
    NotificationsModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
