import { redirect } from '@sveltejs/kit'
import { isAuthenticated } from 'api'
import { sitemap } from 'ui'

export const load = async (event) => {
    if (isAuthenticated(event.cookies)) {
        throw redirect(307, sitemap.dashboard.overview.root)
    }
}
