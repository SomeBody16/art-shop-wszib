import type { FormatterFunction } from 'typesafe-i18n/types/runtime/src/core.d.mts'
import type { Locales } from '../i18n-types'

export type Formatter<T> = (locale: Locales) => FormatterFunction<T, string>
