import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'
import * as z from 'zod'

@ValidatorConstraint()
class Constraint implements ValidatorConstraintInterface {
    protected lastErrorCode: string

    constructor(readonly schema: z.ZodType) {}

    validate(value: unknown): Promise<boolean> | boolean {
        const result = this.schema.safeParse(value)
        if ('error' in result) {
            this.lastErrorCode = result.error.issues?.[0]?.message
            return false
        }
        return true
    }

    defaultMessage(): string {
        return this.lastErrorCode || 'invalid_schema'
    }
}

export type GetSchema<T> = (z: T) => z.ZodType
export const getSchemaOr = <T extends z.ZodType>(defaultSchema: T, getSchema?: GetSchema<T>): z.ZodType =>
    getSchema?.(defaultSchema) || defaultSchema

export function Schema(getSchema: GetSchema<typeof z>, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'zod',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: new Constraint(getSchema(z)),
        })
    }
}
