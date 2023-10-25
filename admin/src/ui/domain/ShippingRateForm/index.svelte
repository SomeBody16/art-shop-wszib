<script lang="ts">
    import type { ShippingRateModel } from 'api'
    import { LL } from 'i18n'
    import { Button, Card, InputText } from '../../base'
    import { FormError, InputPrice } from '../../component'
    import DeliveryEstimateSelect from './DeliveryEstimateSelect.svelte'

    export let action: string
    export let defaultValues: ShippingRateModel | undefined = undefined

    export let canDelete = false
    let deleteForm: HTMLFormElement
    const handleDelete = () => deleteForm.submit()
</script>

{#if canDelete}
    <form class="hidden" method="POST" action="?/delete" bind:this={deleteForm} />
{/if}

<form class="flex flex-col gap-4 p-4" method="POST" {action}>
    <Card class="flex flex-col gap-4">
        <InputText name="name" defaultValue={defaultValues?.name} required>
            <span slot="label">{$LL.ShippingRate.Name()}</span>
        </InputText>
        <InputPrice
            currencyName="currency"
            defaultCurrency={defaultValues?.currency}
            priceName="price"
            defaultPrice={defaultValues?.price?.toString()}
            required
        />
        <DeliveryEstimateSelect {defaultValues} />
    </Card>
    <FormError />
    <div class="flex items-start justify-end gap-4">
        {#if canDelete}
            <Button type="button" color="red" class="!w-40" on:click={handleDelete}>
                {$LL.Delete()}
            </Button>
        {/if}
        <Button type="submit" class="!w-40">
            {$LL.Submit()}
        </Button>
    </div>
</form>
