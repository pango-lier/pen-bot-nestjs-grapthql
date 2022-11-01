import { registerEnumType } from '@nestjs/graphql';

export enum ArticleStatusEnum {
    NONE = 'none',
    PENDING = 'pending',
    PROCESSING = 'processing',
    PUBLISHED = 'published',
    WARNING = 'warning',
    ERROR = 'ERROR'
}
registerEnumType(ArticleStatusEnum, {
    name: 'ArticleStatusEnum',
});
