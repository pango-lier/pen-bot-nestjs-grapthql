import { Authorizer } from '@nestjs-query/query-graphql';
import { Filter } from '@nestjs-query/core';

import { NotificationDto } from './dto/notification.dto';
import { UserContext } from 'src/auth/interface/user-context.interface';

export class NotificationsAuthorizer implements Authorizer<NotificationDto> {
  authorize(context: UserContext): Promise<Filter<NotificationDto>> {
    return Promise.resolve({ userId: { eq: context.req.user.id } });
  }

  authorizeRelation(): Promise<Filter<unknown>> {
    return Promise.resolve({});
  }
}
