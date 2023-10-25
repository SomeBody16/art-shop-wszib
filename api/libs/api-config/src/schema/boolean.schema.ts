import * as z from 'zod'

export const BooleanSchema = z.preprocess((str) => str === 'true', z.boolean())
