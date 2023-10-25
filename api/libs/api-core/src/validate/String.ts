import { getSchemaOr, Schema } from './Schema'
import * as z from 'zod'
import { ValidationOptions } from 'class-validator'

export const String = (getSchema?: (z: z.ZodString) => z.ZodType, validationOptions?: ValidationOptions) =>
    Schema((z) => getSchemaOr(z.string().nonempty(), getSchema), {
        message: 'invalid_string',
        ...validationOptions,
    })
