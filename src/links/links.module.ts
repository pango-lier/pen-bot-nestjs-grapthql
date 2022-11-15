import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Link } from './entities/link.entity';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { LinkDto } from './dto/link.dto';

@Module({
  providers: [],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Link])],
      resolvers: [
        {
          DTOClass: LinkDto,
          EntityClass: Link,
        },
      ],
    }),
  ],
})
export class LinksModule { }
