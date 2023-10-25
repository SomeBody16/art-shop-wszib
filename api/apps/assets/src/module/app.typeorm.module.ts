import { ApiConfigModule, CommonConfig, DatabaseConfig } from '@api/config'
import { TypeOrmModule } from '@nestjs/typeorm'

export const AppTypeOrmModule = TypeOrmModule.forRootAsync({
    imports: [ApiConfigModule],
    inject: [CommonConfig, DatabaseConfig],
    useFactory: (common: CommonConfig, database: DatabaseConfig) => ({
        type: 'postgres',
        url: database.url,
        synchronize: common.environment.isDev,
        autoLoadEntities: true,
        ssl: true,
        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    }),
})
