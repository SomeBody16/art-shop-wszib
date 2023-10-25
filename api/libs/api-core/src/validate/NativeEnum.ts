import { GetSchema, getSchemaOr, Schema } from './Schema'
import { ValidationOptions } from 'class-validator'
import { EnumLike, ZodNativeEnum } from 'zod/lib/types'

export const NativeEnum = <T extends EnumLike>(
    values: T,
    getSchema?: GetSchema<ZodNativeEnum<T>>,
    validationOptions?: ValidationOptions,
) =>
    Schema((z) => getSchemaOr(z.nativeEnum(values), getSchema), {
        message: 'invalid_enum',
        ...validationOptions,
    })
