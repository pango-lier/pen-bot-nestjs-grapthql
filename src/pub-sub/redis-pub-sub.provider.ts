import { pubSubToken } from '@nestjs-query/query-graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { Injectable, Provider } from '@nestjs/common';
import * as env from 'env-var';

@Injectable()
export class RedisPubSubProvider {
  static provider(): Provider {
    return {
      provide: pubSubToken(),
      useValue: new RedisPubSub({
        connection: {
          host: 'redis',
          port: 6379,
        },
      }),
    };
  }
}
