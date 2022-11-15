import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ArticleDto } from './dto/article.dto';
import { Article } from './entities/article.entity';

@Module({
  providers: [],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Article])],
      resolvers: [
        {
          DTOClass: ArticleDto,
          EntityClass: Article,
        },
      ],
    }),
  ],
})
export class ArticlesModule { }
