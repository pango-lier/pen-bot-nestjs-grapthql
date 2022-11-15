import { SortDirection } from "@nestjs-query/core"
import { FilterableField, FilterableOffsetConnection, FilterableRelation, IDField, PagingStrategies, QueryOptions } from "@nestjs-query/query-graphql"
import { GraphQLISODateTime, ID, InputType, ObjectType } from "@nestjs/graphql"
import { Type } from "class-transformer"
import { IsString } from "class-validator"
import { ArticleDto } from "src/articles/dto/article.dto"
import { AccountDto } from "src/users/accounts/dto/account.dto"
import { SocialEnum } from "../entities/social.enum"

@InputType("SocialDtoInput")
@ObjectType()
@QueryOptions({
    pagingStrategy: PagingStrategies.OFFSET,
    enableTotalCount: true,
    defaultSort: [{ field: 'id', direction: SortDirection.DESC }],
})
@FilterableRelation('account', () => AccountDto, { nullable: true })
@FilterableOffsetConnection('articles', () => ArticleDto, {
    enableTotalCount: true,
    nullable: true,
})
export class SocialDto {
    @IDField(() => ID)
    id?: number

    @FilterableField(() => String)
    @IsString()
    email: string

    @FilterableField(() => String)
    @IsString()
    name: string

    @FilterableField(() => String)
    @IsString()
    username?: string

    @FilterableField(() => String)
    @IsString()
    password?: string

    @FilterableField(() => SocialEnum, { defaultValue: SocialEnum.NONE })
    socialType?: SocialEnum

    @Type(() => Date)
    @FilterableField(() => GraphQLISODateTime)
    deletedAt?: Date;

    @Type(() => Date)
    @FilterableField(() => GraphQLISODateTime)
    createdAt?: Date;

    @Type(() => Date)
    @FilterableField(() => GraphQLISODateTime)
    updatedAt?: Date;
}
