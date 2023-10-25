import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SharpModule } from 'nestjs-sharp'
import { AssetController } from './controller/Asset.controller'
import { AssetEntity } from './entity/Asset.entity'
import { AssetManagerService } from './service/AssetManager.service'

@Module({
    imports: [TypeOrmModule.forFeature([AssetEntity]), SharpModule],
    providers: [AssetManagerService],
    controllers: [AssetController],
    exports: [],
})
export class ApiAssetManagerModule {}
