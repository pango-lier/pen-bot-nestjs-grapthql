import { Module } from '@nestjs/common';
import { GroupDto } from './dto/group.dto';
import { Group } from './entities/group.entity';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';

@Module({
  providers: [],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Group])],
      resolvers: [
        {
          DTOClass: GroupDto,
          EntityClass: Group,
        },
      ],
    }),
  ],
})
export class GroupsModule { }
