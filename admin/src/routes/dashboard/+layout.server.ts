import { redirect } from '@sveltejs/kit'
import { isAuthenticated } from 'api'
import { sitemap } from 'ui'

export const load = (event) => {
    if (!isAuthenticated(event.cookies)) {
        throw redirect(307, sitemap.auth.root())
    }
}
