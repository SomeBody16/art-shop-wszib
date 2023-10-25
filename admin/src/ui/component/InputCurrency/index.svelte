<script lang="ts">
    import { InputSelect } from '../../base'

    export let name: string

    const currencies = ['PLN', 'EUR', 'USD']

    const items = currencies.map((value) => ({ value, label: value }))
</script>

<InputSelect searchable={false} {name} {items} divClass="!w-24" {...$$restProps}>
    <slot slot="label" name="label" />
</InputSelect>
