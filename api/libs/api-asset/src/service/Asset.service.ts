import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { AcceptAssetEvent } from '../event/AcceptAsset.event'
import { DeleteAssetEvent } from '../event/DeleteAsset.event'

@Injectable()
export class AssetService {
    constructor(@Inject('ASSET_SERVICE') protected client: ClientProxy) {}

    async accept(ids: string[]) {
        this.client.emit<void, AcceptAssetEvent>(AcceptAssetEvent.name, { ids })
    }

    async delete(ids: string[]) {
        this.client.emit<void, DeleteAssetEvent>(DeleteAssetEvent.name, { ids })
    }
}
