import { AuthConfig } from '@api/config'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { decode, sign, verify } from 'jsonwebtoken'

const AUTHORIZE_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'

type TokenResponse = {
    id_token: string
}

type IdTokenPayload = {
    email: string
}

@Injectable()
export class GoogleOAuth2Service {
    constructor(protected httpService: HttpService, protected config: AuthConfig) {}

    generateAuthURL(redirectUrl: string) {
        const state = sign({ valid: true }, this.config.google.clientSecret, {
            expiresIn: '2m',
        })

        const url = new URL(AUTHORIZE_URL)
        url.searchParams.set('response_type', 'code')
        url.searchParams.set('client_id', this.config.google.clientID)
        url.searchParams.set('redirect_uri', redirectUrl)
        url.searchParams.set('scope', 'email')
        url.searchParams.set('state', state)

        return url
    }

    async authorize(code: string, state: string, redirectUrl: string): Promise<IdTokenPayload> {
        try {
            verify(state, this.config.google.clientSecret)

            const postData = {
                grant_type: 'authorization_code',
                client_id: this.config.google.clientID,
                client_secret: this.config.google.clientSecret,
                redirect_uri: redirectUrl,
                code,
            }
            const { data } = await this.httpService.axiosRef.post<TokenResponse>(TOKEN_URL, postData)
            return decode(data.id_token) as IdTokenPayload
        } catch (e) {
            throw new Error('Failed to authorize with google')
        }
    }
}
