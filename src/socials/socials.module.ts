import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { SocialDto } from './dto/social.dto';
import { Social } from './entities/social.entity';

@Module({
  providers: [],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Social])],
      resolvers: [
        {
          DTOClass: SocialDto,
          EntityClass: Social,
        },
      ],
    }),
  ],
})
export class SocialsModule { }
