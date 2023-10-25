<script lang="ts">
    import { EventLog, ShippingRateForm } from 'ui'

    export let data
    export let form
</script>

<h2 class="ml-4 mt-8 text-2xl font-extrabold leading-none">{data.title}</h2>

<ShippingRateForm canDelete defaultValues={{ ...data.item, ...form?.item }} action="?/update" />
<EventLog createdAt={data.item.createdAt} updatedAt={data.item.updatedAt} />
