import { redirect, type RequestHandler } from '@sveltejs/kit'
import { apiClient, gql, type AuthTokenResponse } from 'api'
import { ClientError } from 'graphql-request'
import { sitemap } from 'ui'
import { redirectUrl } from '../config'

const document = gql`
    mutation ($code: String!, $state: String!, $redirectUrl: String!) {
        login(code: $code, state: $state, redirectUrl: $redirectUrl) {
            token
        }
    }
`

interface GqlResponse {
    login: AuthTokenResponse
}

export const GET: RequestHandler = async (request) => {
    const code = request.url.searchParams.get('code')
    const state = request.url.searchParams.get('state')

    try {
        const { login } = await apiClient.request<GqlResponse>(document, { code, state, redirectUrl })
        request.cookies.set('auth_token', login.token, {
            path: '/',
        })
    } catch (e) {
        console.error(e)
        if (e instanceof ClientError) {
            const message = e.response.errors?.[0].message
            throw redirect(307, sitemap.auth.root(message))
        }
        throw redirect(307, sitemap.auth.root('UnknownError'))
    }

    throw redirect(307, sitemap.dashboard.overview.root)
}
