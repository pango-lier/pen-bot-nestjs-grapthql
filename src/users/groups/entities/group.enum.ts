import { registerEnumType } from '@nestjs/graphql';

export enum GroupEnum {
    NONE = "none",
    GOLOGIN = 'Gologin',
}
registerEnumType(GroupEnum, {
    name: 'GroupEnum',
});