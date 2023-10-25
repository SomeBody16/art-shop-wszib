import { Injectable } from '@nestjs/common'
import { createConfig } from './lib'

@Injectable()
export class DatabaseConfig extends createConfig((z) =>
    z
        .object({
            DATABASE__URL: z.string(),
        })
        .transform((env) => ({
            url: env.DATABASE__URL,
        })),
) {}
