import { date as dateFormatter } from 'typesafe-i18n/formatters'
import type { Formatter } from './types'

export const date: Formatter<Date> = (locale) => (value) => {
    value = new Date(value)
    return dateFormatter(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })(value)
}
