/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { CommonConfig } from '@api/config'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

import cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const config: CommonConfig = app.get(CommonConfig)

    app.use(cookieParser())
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: config.url.assets.port.tcp,
        },
    })

    await app.startAllMicroservices()
    await app.listen(config.url.assets.port.http, '0.0.0.0')
    Logger.log(`🚀 Application is running on: ${await app.getUrl()}`)
}

bootstrap()
