import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { RolePermission } from '../entity/Role.entity'
import { UnauthorizedError } from '../error/Unauthorized.error'
import { AuthTokenResponse, AuthUrlResponse } from '../model/Auth.model'
import { AdminService } from '../service/Admin.service'
import { AuthService } from '../service/Auth.service'

@Resolver()
export class AuthResolver {
    constructor(protected authService: AuthService, protected adminService: AdminService) {}

    @Query(() => AuthUrlResponse)
    async getAuthUrl(@Args('redirectUrl') redirectUrl: string): Promise<AuthUrlResponse> {
        const url = this.authService.generateAuthUrl(redirectUrl)
        return { url }
    }

    @Mutation(() => AuthTokenResponse)
    async login(
        @Args('code') code: string,
        @Args('state') state: string,
        @Args('redirectUrl') redirectUrl: string,
    ): Promise<AuthTokenResponse> {
        try {
            const { admin, token } = await this.authService.authorize(code, state, redirectUrl)
            await this.adminService.assertHaveAllPermissions(admin.id, [RolePermission.LOGIN])

            return { token }
        } catch (e) {
            throw new UnauthorizedError()
        }
    }
}
