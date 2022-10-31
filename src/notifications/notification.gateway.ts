import { NotificationsService } from './notifications.service';

export class NotificationGateway {
  constructor(private readonly notificationService: NotificationsService) {}
}
