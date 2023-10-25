import { GetSchema, getSchemaOr, Schema } from './Schema'
import { ZodAny } from 'zod'
import { ValidationOptions } from 'class-validator'

export const Any = (getSchema?: GetSchema<ZodAny>, validationOptions?: ValidationOptions) =>
    Schema((z) => getSchemaOr(z.any(), getSchema), validationOptions)
