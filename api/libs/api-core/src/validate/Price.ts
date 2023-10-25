import { Integer } from './Integer'
import { GetSchema, getSchemaOr } from './Schema'
import { ZodNumber } from 'zod'
import { ValidationOptions } from 'class-validator'

export const Price = (getSchema?: GetSchema<ZodNumber>, validationOptions?: ValidationOptions) =>
    Integer((z) => getSchemaOr(z.min(0), getSchema), {
        message: 'invalid_price',
        ...validationOptions,
    })
