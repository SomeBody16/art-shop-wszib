import { PUBLIC_URL_ADMIN } from '$env/static/public'
import { sitemap } from 'ui'

export const redirectUrl = `${PUBLIC_URL_ADMIN}${sitemap.auth.google.callback}`
