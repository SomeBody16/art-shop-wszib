import { ClientError, gql, GraphQLClient } from 'graphql-request'
import type { GraphQLError } from 'graphql-request/build/esm/types'
import { LLGet } from 'i18n'

export type GqlPaginateProps<T> = {
    name: string
    queryType: string
    fields: (keyof T)[]
    query?: {
        page?: number
        limit?: number
        sortBy?: [keyof T, string][]
        searchBy?: (keyof T)[]
        search?: string
        filter?: Record<keyof T, string | string[]>
    }
}

const allowedQueryKeys = ['page', 'limit', 'sortBy', 'searchBy', 'search', 'filter']

export class ApiClient extends GraphQLClient {
    requestPaginated<R, T>(props: GqlPaginateProps<T>) {
        const document = this.paginatedDocument(props.name, props.queryType, props.fields)
        return this.request<R>(document, { query: props.query })
    }

    requestPaginatedSearchParams<R, T>(props: GqlPaginateProps<T> & { query: URLSearchParams }) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: Record<string, any> = {}
        for (const [key, value] of props.query?.entries() || {}) {
            if (!allowedQueryKeys.includes(key)) {
                continue
            }

            if (key.startsWith('filter.')) {
                query.filter ??= {}
                query.filter[key.replace('filter.', '')] = value
                continue
            }
            if (key === 'sortBy') {
                query[key] = String(value)
                    //
                    .split(',')
                    .map((item) => item.split(':'))
                continue
            }
            if (['page', 'limit'].includes(key)) {
                query[key] = parseInt(String(value))
                continue
            }
            query[key] = value
        }
        return this.requestPaginated<R, T>({
            ...props,
            query,
        })
    }

    paginatedDocument<T>(name: string, queryType: string, fields: (keyof T)[]) {
        return gql`
        query ($query: ${queryType}) {
            ${name}(query: $query) {
                data {
                    ${fields.join(' ')}
                }
                meta {
                    currentPage
                    itemsPerPage
                    totalPages
                    totalItems
                    filter
                    search
                    searchBy
                    sortBy
                }
            }
        }
        `
    }

    parseErrors(error?: any): GraphQLError[] {
        if (error instanceof ClientError) {
            if (error.response.errors) {
                return error.response.errors
            }
        }
        return [
            {
                message: error?.message || LLGet().UnknownError(),
            } as GraphQLError,
        ]
    }
}
