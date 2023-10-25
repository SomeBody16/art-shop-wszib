import { GetSchema, getSchemaOr, Schema } from './Schema'
import { ZodDate } from 'zod'
import { ValidationOptions } from 'class-validator'

export const Date = (getSchema?: GetSchema<ZodDate>, validationOptions?: ValidationOptions) =>
    Schema((z) => getSchemaOr(z.date(), getSchema), {
        message: 'invalid_date',
        ...validationOptions,
    })
