<script lang="ts">
    import { DeliveryEstimateUnit, type ShippingRateModel } from 'api'
    import { LL } from 'i18n'
    import { InputNumber, InputSelect } from '../../base'

    type Values = Pick<
        ShippingRateModel,
        'deliveryEstimateMinVal' | 'deliveryEstimateMinUnit' | 'deliveryEstimateMaxVal' | 'deliveryEstimateMaxUnit'
    >
    export let defaultValues: Values | undefined = undefined

    const items = Object.entries(DeliveryEstimateUnit).map(([unit, value]) => ({
        label: $LL.DeliveryEstimateUnit[unit](),
        value,
    }))
</script>

<div class="flex gap-4">
    <InputNumber
        name="deliveryEstimateMinVal"
        defaultValue={defaultValues?.deliveryEstimateMinVal?.toString()}
        required
    >
        <span slot="label">Min</span>
    </InputNumber>
    <InputSelect
        name="deliveryEstimateMinUnit"
        {items}
        searchable={false}
        defaultValue={defaultValues?.deliveryEstimateMinUnit}
        required
    >
        <span slot="label">{$LL.ShippingRate.Estimate()}</span>
    </InputSelect>
    <InputNumber
        name="deliveryEstimateMaxVal"
        defaultValue={defaultValues?.deliveryEstimateMaxVal?.toString()}
        required
    >
        <span slot="label">Min</span>
    </InputNumber>
    <InputSelect
        name="deliveryEstimateMaxUnit"
        {items}
        searchable={false}
        defaultValue={defaultValues?.deliveryEstimateMaxUnit}
        required
    >
        <span slot="label">{$LL.ShippingRate.Estimate()}</span>
    </InputSelect>
</div>
