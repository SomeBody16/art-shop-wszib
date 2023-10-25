import { Module } from '@nestjs/common'

import { ApiAssetManagerModule } from '@api/asset'
import { ApiConfigModule } from '@api/config'
import { AppTypeOrmModule } from './module/app.typeorm.module'

@Module({
    imports: [
        //
        ApiConfigModule,
        AppTypeOrmModule,
        ApiAssetManagerModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
