import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Tutorial } from './entities/tutorial.entity';
import { TutorialDto } from './dto/tutorial.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryTypeOrmModule to register the entity with typeorm
      // and provide a QueryService
      imports: [NestjsQueryTypeOrmModule.forFeature([Tutorial])],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: TutorialDto, EntityClass: Tutorial }],
    }),
  ],
})
export class TutorialModule {}
