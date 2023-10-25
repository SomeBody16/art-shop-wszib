import { Field, InputType, Int } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import * as Validate from '../validate'
import { PaginateConfig } from 'nestjs-paginate'
import { SortBy } from 'nestjs-paginate/lib/helper'
import { RefinementCtx } from 'zod'

const validateField = (
    ctx: RefinementCtx,
    value: string | string[],
    field: string,
    allowedOperators?: string[] | true,
) => {
    if (allowedOperators === true) {
        return
    }
    if (typeof value !== 'string') {
        for (const valueEntry of value) {
            validateField(ctx, valueEntry, field, allowedOperators)
        }
    }
    for (const operator of String(value).match(/\$[A-z]+/) || []) {
        if (['$not', '$and', '$or'].includes(operator)) {
            continue
        }
        if (!allowedOperators || !allowedOperators.includes(operator)) {
            ctx.addIssue({
                code: 'custom',
                message: `'${field}' allowed filters are: ${allowedOperators}`,
            })
        }
    }
}

const ValidateFilter = <TEntity>(config: PaginateConfig<TEntity>) =>
    Validate.Schema((z) => {
        if (!config.filterableColumns) {
            return z.void({ invalid_type_error: 'filter_not_allowed' })
        }
        const field = z.enum(Object.keys(config.filterableColumns) as any)
        const value = z.union([z.string(), z.string().array()])
        return z
            .record(field, value)
            .superRefine((filter, ctx) => {
                for (const [field, value] of Object.entries(filter)) {
                    validateField(ctx, value, field, config.filterableColumns?.[field])
                }
            })
            .optional()
    })

export type PaginateQueryInput<TModel> = {
    page?: number
    limit?: number
    search?: string
    searchBy?: (keyof TModel)[]
    sortBy?: [keyof TModel, 'ASC' | 'DESC'][]
    filter?: Record<keyof TModel, string | string[]>
}

export const PaginateQueryInput = <TModel>(config: PaginateConfig<TModel>) => {
    @InputType()
    class QueryInput {
        static config: PaginateConfig<TModel> = {
            defaultSortBy: [['createdAt', 'DESC']] as SortBy<TModel>,
            defaultLimit: 15,
            maxLimit: 50,
            ...config,
        }

        @Field(() => Int, { nullable: true })
        @Validate.Integer((z) => z.min(1))
        @Validate.Optional()
        page?: number

        @Field(() => Int, { nullable: true })
        @Validate.Integer((z) => z.min(1))
        @Validate.Optional()
        limit?: number

        @Field({ nullable: true })
        @Validate.Schema((z) => {
            if (!config.searchableColumns?.length) {
                return z.void({ invalid_type_error: 'search_not_allowed' })
            }
            return z.string().optional()
        })
        search?: string

        @Field(() => [String], { nullable: true })
        @Validate.Schema((z) => {
            if (!config.searchableColumns?.length) {
                return z.void({ invalid_type_error: 'sort_not_allowed' })
            }
            return z
                .enum(config.searchableColumns as any)
                .array()
                .optional()
        })
        searchBy?: (keyof TModel)[]

        @Field(() => GraphQLJSON, { nullable: true })
        @Validate.Schema((z) => {
            if (!config.sortableColumns?.length) {
                return z.void({ invalid_type_error: 'sort_not_allowed' })
            }
            const field = z.enum(config.sortableColumns as any)
            const sortDirection = z.enum(['ASC', 'DESC'])
            return z.tuple([field, sortDirection]).array().optional()
        })
        sortBy?: [keyof TModel, 'ASC' | 'DESC'][]

        @Field(() => GraphQLJSON, { nullable: true })
        @ValidateFilter(config)
        filter?: Record<keyof TModel, string | string[]>
    }
    return QueryInput
}
