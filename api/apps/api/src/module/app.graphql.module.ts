import { ApiConfigModule, CommonConfig } from '@api/config'
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs'
import { GraphQLModule } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import path from 'path'
import process from 'process'

const baseOut = path.join(process.cwd(), '../admin/src/api/graphql')

export const AppGraphqlModule = GraphQLModule.forRootAsync<YogaDriverConfig>({
    driver: YogaDriver,
    imports: [ApiConfigModule],
    inject: [CommonConfig],
    useFactory: (config: CommonConfig) => ({
        playground: config.environment.isDev,
        debug: config.environment.isDev,
        autoSchemaFile: path.join(baseOut, 'api.gql'),
        sortSchema: true,
        context: ({ req, res }) => ({ req, res }),
        definitions: {
            path: path.join(baseOut, 'api.ts'),
        },
        resolvers: {
            JSON: GraphQLJSON,
        },
        graphiql: {
            credentials: 'include',
        },
    }),
})
