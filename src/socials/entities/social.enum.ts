import { registerEnumType } from '@nestjs/graphql';

export enum SocialEnum {
    NONE = 'none',
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
    TIKTOK = 'tiktok',
    YAHOO = "yahoo",
    YOUTUBE = "youtube"
}
registerEnumType(SocialEnum, {
    name: 'SocialEnum',
});
