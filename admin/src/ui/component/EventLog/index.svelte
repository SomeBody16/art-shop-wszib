<script lang="ts">
    import type { DateLike } from 'i18n'
    import { LL } from 'i18n'
    import { Card } from '../../base'

    export let createdAt: DateLike
    export let updatedAt: Date | string | number | undefined = undefined
</script>

<Card class="m-4 flex justify-between">
    <div class="flex w-1/2 flex-col">
        <span>Created at:</span>
        <span>{$LL.CreatedAtDate(createdAt)}</span>
    </div>
    {#if updatedAt}
        <div class="flex w-1/2 flex-col">
            <span>Updated at:</span>
            <span>{$LL.UpdatedAtDate(updatedAt)}</span>
        </div>
    {/if}
</Card>
