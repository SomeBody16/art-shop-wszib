<script lang="ts">
    import { ShippingRateForm } from 'ui'

    export let data
    export let form

    const values = form?.item as any
</script>

<h2 class="ml-4 mt-8 text-2xl font-extrabold leading-none">
    {data.title}
</h2>

<ShippingRateForm action="?/create" defaultValues={values} />
