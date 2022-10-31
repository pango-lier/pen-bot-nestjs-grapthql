import { registerEnumType } from '@nestjs/graphql';

export enum RoleEnum {
  GUEST = 'guest',
  USER = 'user',
  ADMIN = 'admin',
  SUPPER_ADMIN = 'supper-admin',
}
registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});
