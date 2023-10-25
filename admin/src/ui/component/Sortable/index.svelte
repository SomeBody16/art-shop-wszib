<script lang="ts">
    import { browser } from '$app/environment'

    import { goto } from '$app/navigation'

    import { writable } from 'svelte/store'
    import PhCaretDown from '~icons/ph/caret-down'
    import PhCaretUp from '~icons/ph/caret-up'
    import PhCaretUpDown from '~icons/ph/caret-up-down'

    import { page } from '$app/stores'

    type SortableDirection = 'ASC' | 'DESC' | undefined

    type TModel = $$Generic
    export let by: keyof TModel

    const value = writable<SortableDirection>(undefined)

    $: if (browser) {
        const [urlBy, urlValue] = $page.url.searchParams.get('sortBy')?.split(':') || []
        value.set(urlBy === by ? (urlValue as SortableDirection) : undefined)
    }

    function handleClick() {
        let newValue: SortableDirection = undefined
        switch ($value) {
            case 'ASC':
                newValue = 'DESC'
                break
            case 'DESC':
                newValue = undefined
                break
            default:
                newValue = 'ASC'
        }

        const url = new URL($page.url)
        url.searchParams.delete('sortBy')
        newValue && url.searchParams.set('sortBy', [by, newValue].join(':'))
        browser && goto(url)
    }
</script>

<button class="flex cursor-pointer items-center gap-1 hover:text-white" on:click|preventDefault={handleClick}>
    <span>
        <slot />
    </span>
    <span>
        {#if $value === 'ASC'}
            <PhCaretUp />
        {:else if $value === 'DESC'}
            <PhCaretDown />
        {:else}
            <PhCaretUpDown />
        {/if}
    </span>
</button>
