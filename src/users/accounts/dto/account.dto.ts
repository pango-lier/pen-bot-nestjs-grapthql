import { SortDirection } from "@nestjs-query/core";
import { FilterableField, FilterableRelation, IDField, PagingStrategies, QueryOptions } from "@nestjs-query/query-graphql";
import { GraphQLISODateTime, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { GroupDto } from "src/users/groups/dto/group.dto";

@ObjectType()
@InputType("AccountDtoInput")
@QueryOptions({
    pagingStrategy: PagingStrategies.OFFSET,
    enableTotalCount: true,
    defaultSort: [{ field: 'id', direction: SortDirection.DESC }],
})
@FilterableRelation('group', () => GroupDto, { nullable: true })
export class AccountDto {
    @IDField(() => ID)
    id?: number;

    @IsNotEmpty()
    @IsString()
    @FilterableField(() => String)
    name: string;

    @IsOptional()
    @IsBoolean()
    @FilterableField(() => Boolean, { defaultValue: true })
    active?: boolean;

    @IsString()
    @FilterableField(() => String)
    proxyId?: string

    @IsString()
    @FilterableField(() => String)
    proxyType?: string

    @Type(() => Date)
    @FilterableField(() => GraphQLISODateTime)
    createdAt?: Date;

    @Type(() => Date)
    @FilterableField(() => GraphQLISODateTime)
    expiresAt?: Date;

    @Type(() => Date)
    @FilterableField(() => GraphQLISODateTime)
    updatedAt?: Date;

    @Type(() => Date)
    @FilterableField(() => GraphQLISODateTime)
    deletedAt?: Date;
}
