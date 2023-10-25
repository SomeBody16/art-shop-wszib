<script lang="ts">
    import { browser } from '$app/environment'
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'
    import type { PaginatedResponseMeta } from 'api'
    import { derived } from 'svelte/store'
    import MaterialSymbolsChevronLeft from '~icons/material-symbols/chevron-left'
    import MaterialSymbolsChevronRight from '~icons/material-symbols/chevron-right'
    import ChangePageButton from './ChangePageButton.svelte'

    export let meta: PaginatedResponseMeta

    const goToPage = (value: number) => {
        const url = new URL($page.url)
        value <= 1 ? url.searchParams.delete('page') : url.searchParams.set('page', value.toString())
        browser && goto(url)
    }

    const value = derived(page, ($page) => {
        return parseInt($page.url.searchParams.get('page') || '1')
    })

    const min = derived(value, ($value) => ($value - 1) * meta.itemsPerPage + 1)
    const max = derived(min, ($min) => Math.min($min + meta.itemsPerPage - 1, meta.totalItems))

    const disablePrev = derived(value, ($value) => $value <= 1)
    const disableNext = derived(value, ($value) => $value >= meta.totalPages)

    const handlePrev = () => goToPage($value - 1)
    const handleNext = () => goToPage($value + 1)
</script>

<div class="flex justify-between py-4 pl-4">
    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing&nbsp;
        <span class="font-semibold text-gray-900 dark:text-white">
            {$min}-{$max}
        </span>
        &nbsp;of&nbsp;
        <span class="font-semibold text-gray-900 dark:text-white">{meta.totalItems}</span>
    </span>
    <div class="inline-flex rounded-md rounded-r-none shadow-sm">
        <ChangePageButton on:click={handlePrev} disabled={$disablePrev}>
            <MaterialSymbolsChevronLeft class="h-5 w-5" />
        </ChangePageButton>
        <ChangePageButton on:click={handleNext} disabled={$disableNext} isRight>
            <MaterialSymbolsChevronRight class="h-5 w-5" />
        </ChangePageButton>
    </div>
</div>
