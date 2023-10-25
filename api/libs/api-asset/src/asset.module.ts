import { ApiConfigModule, CommonConfig } from '@api/config'
import { Inject, Logger, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { AssetService } from './service/Asset.service'

@Module({
    imports: [ApiConfigModule],
    providers: [
        //
        AssetService,
        {
            provide: 'ASSET_SERVICE',
            inject: [CommonConfig],
            useFactory: (common: CommonConfig) =>
                ClientProxyFactory.create({
                    transport: Transport.TCP,
                    options: {
                        host: common.url.assets.host,
                        port: common.url.assets.port.tcp,
                    },
                }),
        },
    ],
    exports: [AssetService],
})
export class ApiAssetModule implements OnApplicationBootstrap {
    constructor(@Inject('ASSET_SERVICE') protected client: ClientProxy, protected common: CommonConfig) {}

    async onApplicationBootstrap() {
        this.client
            .connect()
            .then(() => {
                const assetUrl = `${this.common.url.assets.host}:${this.common.url.assets.port.tcp}`
                Logger.log(`Connected to asset service at ${assetUrl}`)
            })
            .catch((e) => {
                Logger.error('Cannot connect to asset service.', e)
            })
    }
}

export * from './service/Asset.service'
