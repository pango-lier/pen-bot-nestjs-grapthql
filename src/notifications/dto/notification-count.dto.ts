import { FilterableField } from '@nestjs-query/query-graphql';
import { InputType, ObjectType } from '@nestjs/graphql';
@InputType('NotificationCountInput')
@ObjectType('NotificationCount')
export class NotificationCount {
  @FilterableField({ defaultValue: 0 })
  count: number;

  @FilterableField()
  userId?: number;
}
