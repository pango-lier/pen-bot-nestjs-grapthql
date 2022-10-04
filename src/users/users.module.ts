import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([User])],
      services: [UsersService],
      dtos: [{ DTOClass: UserDto }],
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
