import { Type } from '@nestjs/common'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

export interface PaginatedResponseType<TModel> {
    items: TModel[]
    meta: {
        itemsPerPage: number
        totalItems: number
        currentPage: number
        totalPages: number
        sortBy: [string, string][]
        search: string
        filter: Record<string, string | string[]>
    }
}

@ObjectType()
export class PaginatedResponseMeta {
    @Field(() => Int)
    itemsPerPage: number

    @Field(() => Int)
    totalItems: number

    @Field(() => Int)
    currentPage: number

    @Field(() => Int)
    totalPages: number

    @Field(() => GraphQLJSON)
    sortBy: [string, string][]

    @Field(() => [String], { nullable: true })
    searchBy?: string[]

    @Field({ nullable: true })
    search?: string

    @Field(() => GraphQLJSON, { nullable: true })
    filter?: Record<string, string | string[]>
}

export const PaginatedModel = <TModel>(classRef: Type<TModel>) => {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedType {
        @Field(() => [classRef])
        data: TModel[]

        @Field(() => PaginatedResponseMeta)
        meta: PaginatedResponseMeta
    }
    return PaginatedType
}
