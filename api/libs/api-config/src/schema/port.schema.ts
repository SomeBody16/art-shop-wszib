import * as z from 'zod'
import { numberSchema } from './number.schema'

export const PortSchema = numberSchema(() => z.number().min(1).max(65535))
