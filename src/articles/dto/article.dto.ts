import { SortDirection } from "@nestjs-query/core";
import { FilterableField, FilterableOffsetConnection, FilterableRelation, IDField, KeySet, PagingStrategies, QueryOptions } from "@nestjs-query/query-graphql";
import { GraphQLISODateTime, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { LinkDto } from "src/links/dto/link.dto";
import { SocialDto } from "src/socials/dto/social.dto";
import { ArticleStatusEnum } from "../entities/article-status.enum";


@ObjectType()
@InputType("ArticleDtoInput")
@QueryOptions({
    pagingStrategy: PagingStrategies.OFFSET,
    enableTotalCount: true,
    defaultSort: [{ field: 'id', direction: SortDirection.DESC }],
})
@FilterableRelation('social', () => SocialDto, { nullable: true })
// @FilterableOffsetConnection('links', () => LinkDto, {
//     enableTotalCount: true,
//     nullable: true,
// })
export class ArticleDto {
    @IDField(() => ID)
    id: number

    @FilterableField(() => String, { nullable: true })
    @IsString()
    title?: string

    @FilterableField(() => String, { nullable: true })
    @IsString()
    description?: string

    @FilterableField(() => String, { nullable: true })
    @IsString()
    content: string

    @FilterableField(() => ArticleStatusEnum, { defaultValue:ArticleStatusEnum.NONE })
    status?: ArticleStatusEnum

    @FilterableField(() => String, { defaultValue: true })
    active?: boolean

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
