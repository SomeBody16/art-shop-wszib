import { GraphQLError } from 'graphql/error'
import { RolePermission } from '../entity/Role.entity'

export class ForbiddenError extends GraphQLError {
    constructor(requiredPermission: RolePermission, extensions?: Record<string, unknown>) {
        super('Forbidden', {
            extensions: {
                http: {
                    status: 403,
                },
                requiredPermission,
                ...extensions,
            },
        })
    }
}
