import { GraphQLError } from 'graphql/error'

export class NotFoundError extends GraphQLError {
    constructor(subject: string, extensions?: Record<string, unknown>) {
        super(`${subject} not found`, {
            extensions: {
                message: 'not_found',
                subject,
                http: {
                    status: 404,
                },
                ...extensions,
            },
        })
    }
}
