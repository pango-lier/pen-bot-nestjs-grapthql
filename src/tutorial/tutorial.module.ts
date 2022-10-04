import { Module } from '@nestjs/common';
import { TutorialService } from './tutorial.service';
import { TutorialResolver } from './tutorial.resolver';

@Module({
  providers: [TutorialResolver, TutorialService]
})
export class TutorialModule {}
