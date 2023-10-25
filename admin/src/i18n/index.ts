import { get } from 'svelte/store'
import LL from './i18n-svelte'

export type * from './custom-types'
export { default as LL, setLocale } from './i18n-svelte'
export type * from './i18n-types'
export * from './i18n-util'
export * from './i18n-util.async'

export const LLGet = () => get(LL)
