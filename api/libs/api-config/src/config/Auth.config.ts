import { Injectable } from '@nestjs/common'
import { createConfig } from './lib'

@Injectable()
export class AuthConfig extends createConfig((z) =>
    z
        .object({
            JWT__SECRET: z.string(),
            JWT__EXPIRES_IN: z.string(),

            GOOGLE__CLIENT_ID: z.string(),
            GOOGLE__CLIENT_SECRET: z.string(),
        })
        .transform((env) => ({
            jwt: {
                secret: env.JWT__SECRET,
                expiresIn: env.JWT__EXPIRES_IN,
            },

            google: {
                clientID: env.GOOGLE__CLIENT_ID,
                clientSecret: env.GOOGLE__CLIENT_SECRET,
            },
        })),
) {}
