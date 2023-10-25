import { GetSchema, getSchemaOr } from './Schema'
import { String } from './String'
import { ZodString } from 'zod'
import { ValidationOptions } from 'class-validator'

export const Email = (getSchema?: GetSchema<ZodString>, validationOptions?: ValidationOptions) =>
    String((z) => getSchemaOr(z.email(), getSchema), {
        message: 'invalid_email',
        ...validationOptions,
    })
