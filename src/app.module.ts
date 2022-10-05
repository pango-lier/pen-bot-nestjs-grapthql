import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule } from './database/database.module';
import { TutorialModule } from './tutorial/tutorial.module';
import { EnvModule } from './env/env.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';

import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bullmq';
import { join } from 'path';
import { QueueBullMqModule } from './queue-bull-mq/queue-bull-mq.module';
@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (headersRaw: Record<string, unknown>) => {
            // Lowercase each header key
            const headers = Object.keys(headersRaw).reduce((dest, key) => {
              dest[key.toLowerCase()] = headersRaw[key];
              return dest;
            }, {});
            return {
              req: {
                headers: headers,
              },
            };
          },
        },
        'graphql-ws': {
          path: '/subscriptions',
        },
      },
      context: (context) => {
        if (context?.extra?.request) {
          return {
            req: {
              ...context?.extra?.request,
              headers: {
                ...context?.extra?.request?.headers,
                ...context?.connectionParams,
              },
            },
          };
        }
        return { req: context?.req };
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('queue'),
      }),
    }),
    BullModule.registerQueue({
      name: 'demo',
      // processors: [join(__dirname, 'queue-bull-mq/demo.processor.js')],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('ioredis'),
      }),
    }),
    // TodoItemModule,
    TutorialModule,
    EnvModule,
    AuthModule,
    UsersModule,
    QueueBullMqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  serverAdapter = new ExpressAdapter();
  constructor(@InjectQueue('demo') private queue: Queue) {
    this.serverAdapter.setBasePath('/admin/queues');
    createBullBoard({
      queues: [new BullMQAdapter(queue)],
      serverAdapter: this.serverAdapter,
    });
  }

  configure(consumer: MiddlewareConsumer) {
    const bullBoardRouter = this.serverAdapter.getRouter();
    consumer.apply(bullBoardRouter).forRoutes('/admin/queues');
  }
}
