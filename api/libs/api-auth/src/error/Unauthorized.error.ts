import { GraphQLError } from 'graphql/error'

export class UnauthorizedError extends GraphQLError {
    constructor(extensions?: Record<string, unknown>) {
        super('Unauthorized', {
            extensions: {
                http: {
                    status: 401,
                },
                ...extensions,
            },
        })
    }
}
