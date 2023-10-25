import { GetSchema, getSchemaOr, Schema } from './Schema'
import { ZodBoolean } from 'zod'
import { ValidationOptions } from 'class-validator'

export const Boolean = (getSchema?: GetSchema<ZodBoolean>, validationOptions?: ValidationOptions) =>
    Schema((z) => getSchemaOr(z.boolean(), getSchema), {
        message: 'invalid_boolean',
        ...validationOptions,
    })
