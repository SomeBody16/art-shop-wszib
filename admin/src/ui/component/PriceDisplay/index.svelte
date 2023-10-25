<script lang="ts">
    import { page } from '$app/stores'
    import { number } from 'typesafe-i18n/formatters'

    export let price: number
    export let currency: string

    const formatted = number($page.data.locale, {
        style: 'currency',
        currency,
    })(price / 100)
</script>

{formatted}
