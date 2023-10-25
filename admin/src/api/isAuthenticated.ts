import type { Cookies } from '@sveltejs/kit'

export const isAuthenticated = (cookies: Cookies) => {
    return !!cookies.get('auth_token')
}
