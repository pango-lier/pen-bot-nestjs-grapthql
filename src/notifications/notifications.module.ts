import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationDto } from './dto/notification.dto';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';

import { CreateNotificationInput } from './dto/create-notification.input';
import { NotificationCount } from './dto/notification-count.dto';
import { RedisPubSubProvider } from 'src/pub-sub/redis-pub-sub.provider';

const notificationsQueryTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([
  Notification,
  NotificationCount,
]);
@Module({
  providers: [NotificationsResolver, NotificationsService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryTypeOrmModule to register the entity with typeorm
      // and provide a QueryService
      imports: [notificationsQueryTypeOrmModule],
      pubSub: RedisPubSubProvider.provider(),
      services: [NotificationsService],
      // describe the resolvers you want to expose
      dtos: [
        { DTOClass: NotificationDto, CreateDTOClass: CreateNotificationInput },
      ],
    }),
    notificationsQueryTypeOrmModule,
  ],

  exports: [notificationsQueryTypeOrmModule, NotificationsService],
})
export class NotificationsModule {}
