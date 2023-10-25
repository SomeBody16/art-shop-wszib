import type { FormattersInitializer } from 'typesafe-i18n'
import { DeliveryEstimateUnit } from './formatters/ShippingRateEstimate'
import { date } from './formatters/date'
import type { Formatters, Locales } from './i18n-types'

export const initFormatters: FormattersInitializer<Locales, Formatters> = (locale: Locales) => {
    const formatters: Formatters = {
        DeliveryEstimateUnit: DeliveryEstimateUnit(locale),
        date: date(locale),
    }

    return formatters
}
