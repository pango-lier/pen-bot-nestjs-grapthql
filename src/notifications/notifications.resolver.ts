import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { NotificationDto } from './dto/notification.dto';
import {
  AuthorizerInterceptor,
  CRUDResolver,
  InjectPubSub,
} from '@nestjs-query/query-graphql';
import { PubSub } from 'graphql-subscriptions';
import { NotificationCount } from './dto/notification-count.dto';

import { getSubscriptionEventName } from '@nestjs-query/query-graphql/dist/src/resolvers/helpers';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { AuthenticatedUser } from 'src/auth/interface/authenticated-user.interface';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@Resolver(() => NotificationDto)
@UseGuards(JwtAuthGuard)
@UseInterceptors(AuthorizerInterceptor(NotificationDto))
export class NotificationsResolver extends CRUDResolver(NotificationDto, {
  CreateDTOClass: CreateNotificationInput,
  UpdateDTOClass: UpdateNotificationInput,
  guards: [JwtAuthGuard],
  enableSubscriptions: true,
}) {
  constructor(
    readonly service: NotificationsService,
    @InjectPubSub() readonly pubSub: PubSub,
  ) {
    super(service);
  }

  @Mutation(() => NotificationDto)
  async sendToast(
    @Args('input', { type: () => CreateNotificationInput })
    createToast: CreateNotificationInput,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.createToast(createToast, user.id);
  }

  @Mutation(() => NotificationCount)
  setNotificationCount(
    @Args('input', { type: () => NotificationCount })
    count: NotificationCount,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.setCount({ count: count.count }, user.id);
  }

  @Query(() => NotificationCount)
  async getCount(@CurrentUser() user: AuthenticatedUser) {
    return this.service.getCount(user.id);
  }

  @Subscription(() => NotificationCount)
  notificationCount(@CurrentUser() user: AuthenticatedUser) {
    return this.service.pubSub.asyncIterator(
      getSubscriptionEventName('notificationCount', {
        userId: { eq: user.id + '' },
      }),
    );
  }
}
