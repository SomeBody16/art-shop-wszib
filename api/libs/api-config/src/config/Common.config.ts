import { Injectable } from '@nestjs/common'
import { PortSchema } from '../schema'
import { createConfig } from './lib'

@Injectable()
export class CommonConfig extends createConfig((z) =>
    z
        .object({
            ENVIRONMENT: z.enum(['development', 'production']),

            URL__API__HOST: z.string(),
            URL__API__PORT__HTTP: PortSchema,

            URL__ASSETS__HOST: z.string(),
            URL__ASSETS__PORT__HTTP: PortSchema,
            URL__ASSETS__PORT__TCP: PortSchema,
        })
        .transform((env) => ({
            environment: {
                isDev: env.ENVIRONMENT === 'development',
                isProd: env.ENVIRONMENT === 'production',
                value: env.ENVIRONMENT,
            },

            url: {
                api: {
                    host: env.URL__API__HOST,
                    port: {
                        http: env.URL__API__PORT__HTTP,
                    },
                },
                assets: {
                    host: env.URL__ASSETS__HOST,
                    port: {
                        http: env.URL__ASSETS__PORT__HTTP,
                        tcp: env.URL__ASSETS__PORT__TCP,
                    },
                },
            },
        })),
) {}
