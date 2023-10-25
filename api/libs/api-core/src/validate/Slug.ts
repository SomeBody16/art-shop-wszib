import { ValidationOptions } from 'class-validator'
import { GetSchema, getSchemaOr } from './Schema'
import { String } from './String'
import { ZodString } from 'zod'

export const Slug = (getSchema?: GetSchema<ZodString>, validationOptions?: ValidationOptions) =>
    String((z) => getSchemaOr(z.regex(/^[a-z0-9-_]+$/), getSchema), {
        message: 'invalid_slug',
        ...validationOptions,
    })
