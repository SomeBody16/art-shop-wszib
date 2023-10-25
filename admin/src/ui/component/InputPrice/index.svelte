<script lang="ts">
    import { PUBLIC_DEFAULT_CURRENCY } from '$env/static/public'
    import { LL } from 'i18n'
    import { InputCurrency } from '../InputCurrency'
    import FormattedInput from './FormattedInput.svelte'

    export let currencyName: string
    export let priceName: string

    export let defaultCurrency: string | undefined = PUBLIC_DEFAULT_CURRENCY
    export let defaultPrice: string | undefined = undefined

    export let required: boolean = false
</script>

<div class="flex-start flex gap-4">
    <FormattedInput name={priceName} defaultValue={defaultPrice} {required}>
        <slot name="priceLabel" slot="label">{$LL.ShippingRate.Price()}</slot>
    </FormattedInput>
    <InputCurrency name={currencyName} defaultValue={defaultCurrency} {required}>
        <slot name="currencyLabel" slot="label">{$LL.ShippingRate.Currency()}</slot>
    </InputCurrency>
</div>
