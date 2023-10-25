import { redirect, type RequestHandler } from '@sveltejs/kit'
import { apiClient, gql, type AuthUrlResponse } from 'api'
import { redirectUrl } from './config'

const document = gql`
    query ($redirectUrl: String!) {
        getAuthUrl(redirectUrl: $redirectUrl) {
            url
        }
    }
`

interface Document {
    getAuthUrl: AuthUrlResponse
}

export const GET: RequestHandler = async () => {
    const { getAuthUrl } = await apiClient.request<Document>(document, { redirectUrl })
    throw redirect(307, getAuthUrl.url)
}
