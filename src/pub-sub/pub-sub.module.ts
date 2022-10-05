import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisPubSubProvider } from './redis-pub-sub.provider';

@Module({
  imports: [ConfigService],
  providers: [RedisPubSubProvider],
  exports: [RedisPubSubProvider],
})
export class PubSubModule {}
