import { GetSchema, getSchemaOr, Schema } from './Schema'
import { ZodNumber } from 'zod'
import { ValidationOptions } from 'class-validator'

export const Integer = (getSchema?: GetSchema<ZodNumber>, validationOptions?: ValidationOptions) =>
    Schema((z) => getSchemaOr(z.number().int(), getSchema), {
        message: 'invalid_integer',
        ...validationOptions,
    })
