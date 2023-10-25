import { GraphQLError } from 'graphql/error'

export class BadRequestError extends GraphQLError {
    constructor(message: string, property: string, extensions?: Record<string, unknown>) {
        super(`Bad Request: '${message}'`, {
            extensions: {
                message,
                property,
                http: {
                    status: 400,
                },
                ...extensions,
            },
        })
    }
}
