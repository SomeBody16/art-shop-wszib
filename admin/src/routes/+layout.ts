import { loadLocaleAsync, setLocale } from 'i18n'

export const load = async (event) => {
    const locale = event.data.locale
    await loadLocaleAsync(locale)
    setLocale(locale)

    return event.data
}
