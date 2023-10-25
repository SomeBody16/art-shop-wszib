import { DEFAULT_LOCALE } from '$env/static/private'
import { redirect, type ServerLoadEvent } from '@sveltejs/kit'
import { detectLocale } from 'i18n'

export const load = async (event) => {
    handleNewLocale(event)

    const locale = detectLocale(() => [event.cookies.get('locale') || DEFAULT_LOCALE])
    return { locale }
}

const handleNewLocale = (event: ServerLoadEvent) => {
    const newLocale = event.url.searchParams.get('locale')
    if (newLocale) {
        event.cookies.set('locale', newLocale, { path: '/' })

        const newUrl = new URL(event.url)
        newUrl.searchParams.delete('locale')
        throw redirect(303, newUrl.toString())
    }
}
