import { Module } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { SocialsResolver } from './socials.resolver';

@Module({
  providers: [SocialsResolver, SocialsService]
})
export class SocialsModule {}
