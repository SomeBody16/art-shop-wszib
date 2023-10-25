import { AuthConfig } from '@api/config'
import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { AdminEntity } from '../entity/Admin.entity'
import { UnauthorizedError } from '../error/Unauthorized.error'
import { AdminService } from './Admin.service'
import { GoogleOAuth2Service } from './oauth2/GoogleOAuth2.service'

export type AuthTokenPayload = {
    adminId: string
}

@Injectable()
export class AuthService {
    constructor(
        protected config: AuthConfig,
        protected adminService: AdminService,
        protected googleOAuth2Service: GoogleOAuth2Service,
    ) {}

    generateAuthUrl(redirectUrl: string) {
        return this.googleOAuth2Service.generateAuthURL(redirectUrl).toString()
    }

    async authorize(code: string, state: string, redirectUrl: string): Promise<{ admin: AdminEntity; token: string }> {
        const { email } = await this.googleOAuth2Service.authorize(code, state, redirectUrl)

        const admin = await this.adminService.findByEmail(email)
        const token = this.sign(admin.id)

        return { admin, token }
    }

    verify(token: string): AuthTokenPayload {
        try {
            return jwt.verify(token, this.config.jwt.secret) as AuthTokenPayload
        } catch (e) {
            throw new UnauthorizedError()
        }
    }

    protected sign(adminId: string) {
        const payload: AuthTokenPayload = { adminId }
        return jwt.sign(payload, this.config.jwt.secret, {
            expiresIn: this.config.jwt.expiresIn,
        })
    }
}
