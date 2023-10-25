import { PUBLIC_URL_API } from '$env/static/public'
import { ApiClient } from './client'

export { gql } from 'graphql-request'
export * from './graphql'
export * from './isAuthenticated'

const endpoint = `${PUBLIC_URL_API}/graphql`
export const apiClient = new ApiClient(endpoint, {
    fetch,
})
