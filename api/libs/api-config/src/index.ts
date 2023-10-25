import { Module } from '@nestjs/common'
import { AuthConfig } from './config/Auth.config'
import { CommonConfig } from './config/Common.config'
import { DatabaseConfig } from './config/Database.config'
import { MailConfig } from './config/Mail.config'

@Module({
    controllers: [],
    providers: [AuthConfig, CommonConfig, DatabaseConfig, MailConfig],
    exports: [AuthConfig, CommonConfig, DatabaseConfig, MailConfig],
})
export class ApiConfigModule {}

export * from './config/Auth.config'
export * from './config/Common.config'
export * from './config/Database.config'
export * from './config/Mail.config'
