import { FilterableField, IDField } from "@nestjs-query/query-graphql"
import { GraphQLISODateTime, ID, InputType, ObjectType } from "@nestjs/graphql"
import { Type } from "class-transformer"
import { IsString } from "class-validator"
import { LinkEnum } from "../entities/link.enum"

@ObjectType()
@InputType("LinkDtoInput")
export class LinkDto {
    @IDField(() => ID)
    id?: number

    @FilterableField(() => String)
    @IsString()
    url: string

    @FilterableField(() => String)
    @IsString()
    thumb?: string

    @FilterableField(() => LinkEnum, { defaultValue: LinkEnum.NONE })
    typeLink?: LinkEnum


    @FilterableField(() => String, { defaultValue: 0 })
    size?: number

    @FilterableField(() => String, { nullable: true })
    description?: string

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
