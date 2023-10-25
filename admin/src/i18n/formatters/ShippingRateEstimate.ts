import { LLGet } from 'i18n'
import type { DeliveryEstimateUnit as DeliveryEstimateUnitType } from '../custom-types'
import type { Formatter } from './types'

export const DeliveryEstimateUnit: Formatter<DeliveryEstimateUnitType> = (locale) => (value) => {
    return LLGet().DeliveryEstimateUnit[value]()
}
