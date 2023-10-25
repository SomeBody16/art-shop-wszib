import { Injectable } from '@nestjs/common'
import { BooleanSchema, PortSchema } from '../schema'
import { createConfig } from './lib'

@Injectable()
export class MailConfig extends createConfig((z) =>
    z
        .object({
            MAIL__TRANSPORT__HOST: z.string(),
            MAIL__TRANSPORT__PORT: PortSchema,
            MAIL__TRANSPORT__IGNORE_TLS: BooleanSchema,
            MAIL__TRANSPORT__SECURE: BooleanSchema,
            MAIL__TRANSPORT__AUTH__USER: z.string(),
            MAIL__TRANSPORT__AUTH__PASS: z.string(),
            MAIL__DEFAULTS__FROM: z.string(),
        })
        .transform((env) => ({
            transport: {
                host: env.MAIL__TRANSPORT__HOST,
                port: env.MAIL__TRANSPORT__PORT,
                ignoreTLS: env.MAIL__TRANSPORT__IGNORE_TLS,
                secure: env.MAIL__TRANSPORT__SECURE,
                auth: {
                    user: env.MAIL__TRANSPORT__AUTH__USER,
                    pass: env.MAIL__TRANSPORT__AUTH__PASS,
                },
            },
            defaults: {
                from: env.MAIL__DEFAULTS__FROM,
            },
        })),
) {}
