import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './articles.resolver';

@Module({
  providers: [ArticlesResolver, ArticlesService]
})
export class ArticlesModule {}
