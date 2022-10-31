import { QueryService } from '@nestjs-query/core';
import { InjectPubSub } from '@nestjs-query/query-graphql';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { Repository } from 'typeorm';
import { CreateNotificationInput } from './dto/create-notification.input';

import { Notification } from './entities/notification.entity';
import { getSubscriptionEventName } from '@nestjs-query/query-graphql/dist/src/resolvers/helpers';
import { NotificationCount } from './dto/notification-count.dto';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@QueryService(Notification)
export class NotificationsService extends TypeOrmQueryService<Notification> {
  constructor(
    @InjectRepository(Notification) repo: Repository<Notification>,
    @InjectPubSub() readonly pubSub: PubSub,
    @InjectRedis() private readonly redis: Redis,
  ) {
    super(repo);
  }

  async createToast(
    toast: CreateNotificationInput,
    userId: number,
  ): Promise<Notification> {
    const notification = await this.createOne({
      ...toast,
      userId: userId,
    });
    this.pubSub.publish(
      getSubscriptionEventName('createdNotification', {
        userId: { eq: userId + '' },
      }),
      {
        createdNotification: notification,
      },
    );

    this.incCount(userId);
    return notification;
  }

  async toast(
    toast: CreateNotificationInput,
    userId: number,
  ): Promise<CreateNotificationInput> {
    this.pubSub.publish(
      getSubscriptionEventName('createdNotification', {
        userId: { eq: userId + '' },
      }),
      {
        createdNotification: {
          ...toast,
          userId: userId,
        },
      },
    );
    return toast;
  }

  async setCount(
    count: NotificationCount,
    userId?: number,
  ): Promise<NotificationCount> {
    if (userId) count = { ...count, userId: userId };
    const evenName = getSubscriptionEventName('notificationCount', {
      userId: { eq: count.userId + '' },
    });
    await this.redis.set(evenName, count?.count || 0); //reset count
    this.pubSub.publish(evenName, {
      notificationCount: count,
    });
    return count;
  }

  async getCount(userId: number): Promise<NotificationCount> {
    const evenName = getSubscriptionEventName('notificationCount', {
      userId: { eq: userId + '' },
    });
    const count: NotificationCount = {
      count: parseInt(await this.redis.get(evenName)),
      userId: userId,
    };
    this.pubSub.publish(evenName, {
      notificationCount: count,
    });
    return count;
  }

  async incCount(userId: number): Promise<NotificationCount> {
    const evenName = getSubscriptionEventName('notificationCount', {
      userId: { eq: userId + '' },
    });
    const count: NotificationCount = {
      count: await this.redis.incr(evenName),
      userId: userId,
    };
    this.pubSub.publish(evenName, {
      notificationCount: count,
    });
    return count;
  }
}
