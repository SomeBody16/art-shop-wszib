import * as z from 'zod'

export const numberSchema = (createSchema: () => z.ZodNumber) =>
    z.preprocess((str) => parseInt(str as string), createSchema())
