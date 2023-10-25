import * as z from 'zod'

export const createConfig = <TSchema extends z.ZodType>(
    getSchema: (zod: typeof z) => TSchema,
): new () => z.infer<TSchema> => {
    class Config {
        schema = getSchema(z)

        constructor() {
            const validated = this.schema.parse(process.env)
            Object.assign(this, validated)
        }
    }

    return Config
}
