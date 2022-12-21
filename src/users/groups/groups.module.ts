import { Module } from '@nestjs/common';
import { GroupDto } from './dto/group.dto';
import { Group } from './entities/group.entity';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';

@Module({
  providers: [GroupsService, GroupsResolver],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Group])],
      services: [GroupsService],
      dtos: [{ DTOClass: GroupDto }],
    }),
  ],
})
export class GroupsModule {}
