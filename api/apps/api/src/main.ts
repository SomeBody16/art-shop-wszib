import { ClassSerializerInterceptor, InternalServerErrorException, Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'

import { CommonConfig } from '@api/config'
import { BadRequestError } from '@api/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const config: CommonConfig = app.get(CommonConfig)

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: (errors) => {
                if ('zod' in errors[0].constraints) {
                    throw new BadRequestError(errors[0].constraints.zod, errors[0].property)
                }
                throw new InternalServerErrorException(
                    { errors },
                    'Invalid validation error, should contain "zod" constraint',
                )
            },
        }),
    )
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    app.use(cookieParser())

    await app.listen(config.url.api.port.http, '0.0.0.0')
    Logger.log(`🚀 Application is running on: ${await app.getUrl()}`)
}

bootstrap()
