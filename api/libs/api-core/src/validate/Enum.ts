import { GetSchema, getSchemaOr, Schema } from './Schema'
import { Writeable, ZodEnum } from 'zod'
import { ValidationOptions } from 'class-validator'

export const Enum = <U extends string, T extends Readonly<[U, ...U[]]>>(
    values: T,
    getSchema?: GetSchema<ZodEnum<Writeable<T>>>,
    validationOptions?: ValidationOptions,
) =>
    Schema((z) => getSchemaOr(z.enum(values), getSchema), {
        message: 'invalid_enum',
        ...validationOptions,
    })
