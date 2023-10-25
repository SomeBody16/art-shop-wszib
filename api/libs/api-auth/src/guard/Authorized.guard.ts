import { CanActivate, ExecutionContext, Injectable, Scope } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RolePermission } from '../entity/Role.entity'
import { AUTHORIZED_METADATA, AuthorizedMetadata } from '../decorator/Authorized.decorator'
import { GqlExecutionContext } from '@nestjs/graphql'
import { getCookie } from '@api/core'
import { UnauthorizedError } from '../error/Unauthorized.error'
import { AuthService } from '../service/Auth.service'
import { AdminService } from '../service/Admin.service'
import { RoleService } from '../service/Role.service'

@Injectable({ scope: Scope.REQUEST })
export class AuthorizedGuard implements CanActivate {
    constructor(
        protected reflector: Reflector,
        protected authService: AuthService,
        protected adminService: AdminService,
        protected roleService: RoleService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context)
        const requiredPermissions = this.getRequiredPermissions(ctx)
        if (!requiredPermissions.length) {
            return true
        }

        const authToken = getCookie(ctx, 'auth_token')
        if (!authToken) {
            throw new UnauthorizedError()
        }

        const { adminId } = await this.authService.verify(authToken)
        const admin = await this.adminService.findById(adminId).catch(() => {
            throw new UnauthorizedError()
        })
        await this.roleService.assertHaveAllPermissions(admin.roleId, requiredPermissions)

        ctx.getContext().admin = admin
        return true
    }

    getRequiredPermissions(context: GqlExecutionContext): RolePermission[] {
        const metadata = this.reflector.getAllAndOverride<AuthorizedMetadata>(AUTHORIZED_METADATA, [
            context.getHandler(),
            context.getClass(),
        ])
        if (metadata) {
            return ['LOGIN', ...(metadata.permissions || [])] as RolePermission[]
        }
        return []
    }
}
