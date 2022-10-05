import { pubSubToken } from '@nestjs-query/query-graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { Provider } from '@nestjs/common';
import * as env from 'env-var';

export class RedisPubSubProvider {
  static provider(): Provider {
    return {
      provide: pubSubToken(),
      useValue: new RedisPubSub({
        connection: {
          host: env.get('REDIS_HOST').asString(),
          port: parseInt(env.get('REDIS_PORT').asString()),
        },
      }),
    };
  }
}
