import { registerEnumType } from '@nestjs/graphql';

export enum LinkEnum {
    NONE = 'none',
    IMAGE = 'image',
    VIDEO = 'video',
}
registerEnumType(LinkEnum, {
    name: 'LinkEnum',
});
