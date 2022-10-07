import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  GUEST = 'guest',
  USER = 'user',
  ADMIN = 'admin',
  SUPPER_ADMIN = 'supper-admin',
}
registerEnumType(Role, {
  name: 'Role',
});
