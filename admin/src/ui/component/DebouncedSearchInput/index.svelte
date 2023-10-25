<script lang="ts">
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'
    import { writable } from 'svelte/store'
    import MaterialSymbolsSearch from '~icons/material-symbols/search'
    import { InputText } from '../../base'

    export let name: string
    export let placeholder: string = ''

    export let defaultValue: string = ''
    export let value: string = defaultValue

    let debouncedValue = writable(value)
    let timer: any = null
    let loading: boolean = false

    export let wait: number = 300

    $: {
        clearTimeout(timer)
        timer = setTimeout(() => {
            debouncedValue.set(value)
        }, wait)
    }

    debouncedValue.subscribe((value) => {
        loading = true
        const url = new URL($page.url)
        value ? url.searchParams.set(name, value) : url.searchParams.delete(name)
        url.toString() !== $page.url.toString() && goto(url, { keepFocus: true })
    })

    page.subscribe(() => {
        loading = false
    })
</script>

<InputText {name} {placeholder} {loading} bind:value {...$$restProps}>
    <MaterialSymbolsSearch slot="icon" />
</InputText>
