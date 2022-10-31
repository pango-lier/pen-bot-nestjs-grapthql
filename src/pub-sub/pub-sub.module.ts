import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisPubSubProvider } from './redis-pub-sub.provider';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  providers: [RedisPubSubProvider, ConfigService],
  exports: [RedisPubSubProvider],
})
export class PubSubModule {}
