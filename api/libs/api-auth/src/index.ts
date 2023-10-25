import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminEntity } from './entity/Admin.entity'
import { RoleEntity } from './entity/Role.entity'
import { AdminService } from './service/Admin.service'
import { RoleService } from './service/Role.service'
import { AuthService } from './service/Auth.service'
import { ApiConfigModule } from '@api/config'
import { AdminResolver } from './resolver/Admin.resolver'
import { RoleResolver } from './resolver/Role.resolver'
import { AuthorizedGuard } from './guard/Authorized.guard'
import { AuthResolver } from './resolver/Auth.resolver'
import { HttpModule } from '@nestjs/axios'
import { GoogleOAuth2Service } from './service/oauth2/GoogleOAuth2.service'
import { SuperAdminSeeder } from './seeder/SuperAdmin.seeder'

@Module({
    imports: [ApiConfigModule, TypeOrmModule.forFeature([AdminEntity, RoleEntity]), HttpModule],
    controllers: [],
    providers: [
        AuthService,
        AdminService,
        RoleService,
        AuthResolver,
        AdminResolver,
        RoleResolver,
        AuthorizedGuard,
        GoogleOAuth2Service,
        SuperAdminSeeder,
    ],
    exports: [AuthorizedGuard, AuthService, AdminService, RoleService],
})
export class ApiAuthModule {}

export * from './error/Unauthorized.error'
export * from './error/Forbidden.error'
export * from './decorator/Admin.decorator'
export * from './decorator/Authorized.decorator'
