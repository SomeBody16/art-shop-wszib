import { ApiAssetModule } from '@api/asset'
import { ApiAuthModule } from '@api/auth'
import { ApiConfigModule } from '@api/config'
import { ApiProductModule } from '@api/product'
import { DiscoveryModule } from '@golevelup/nestjs-discovery'
import { Module } from '@nestjs/common'
import { AppGraphqlModule } from './module/app.graphql.module'
import { AppTypeOrmModule } from './module/app.typeorm.module'

@Module({
    imports: [
        //
        AppTypeOrmModule,
        AppGraphqlModule,
        DiscoveryModule,
        ApiConfigModule,
        ApiAuthModule,
        ApiProductModule,
        ApiAssetModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
