import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { DiscoveryService } from '@golevelup/nestjs-discovery'
import { Seeder, SEEDER_METADATA } from '@api/core'
import { Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    Logger.log('Clearing database...')
    const dataSource = app.get(DataSource)
    await dataSource.synchronize(true)

    const discoveryService = app.get(DiscoveryService)
    const seeders = await discoveryService.providersWithMetaAtKey(SEEDER_METADATA)
    Logger.log(`Found ${seeders.length} seeders...`)
    for (const { discoveredClass } of seeders) {
        Logger.log(`${discoveredClass.name}...`)
        const seeder = discoveredClass.instance as Seeder
        await seeder.execute()
    }

    Logger.log('🚀 Database seeded!')
    await app.close()
}

bootstrap()
