<!-- https://svelte-select-examples.vercel.app/examples -->

<script lang="ts">
    import Select from 'svelte-select'
    import { Spinner } from '../Spinner'

    type Value = $$Generic
    export let items: { label: string; value: Value }[] = []
    export let clearable = false

    export let name: string
    export let loading: boolean = false
    export let disabled: boolean = false
    export let error: string = ''
    export let placeholder: string = ''

    export let defaultValue: Value | undefined = undefined
    export let value = defaultValue

    export let divClass: string = ''
</script>

<div class={`w-full ${divClass}`}>
    {#if $$slots.label}
        <label for={name} class="mb-2 block text-sm font-medium text-white" class:!text-red-500={error}>
            <slot name="label" />
        </label>
    {/if}
    <div class="relative w-full">
        {#if $$slots.icon}
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-l-lg pl-3">
                <slot name="icon" />
            </div>
        {/if}
        {#if loading}
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <Spinner class="!h-5 !w-5" />
            </div>
        {/if}

        <Select
            {items}
            {placeholder}
            {disabled}
            {clearable}
            class={`w-full ${$$props.class}`}
            bind:value
            --border="none"
            --border-hover="none"
            --border-focused="none"
            --height="3rem"
            --background="var(--color-gray-700)"
            --list-background="var(--color-gray-800)"
            --list-border="1px solid var(--color-gray-700)"
            --item-is-active-bg="var(--color-gray-700)"
            --item-hover-bg="var(--color-gray-600)"
            --item-transition="100ms"
            {...$$restProps}
        >
            <input slot="input-hidden" let:value type="hidden" {name} value={value?.value} />
        </Select>
    </div>
    {#if error}
        <p class="mt-2 text-sm text-red-500">{error}</p>
    {/if}
</div>

<style>
    .input-disabled {
        @apply cursor-not-allowed text-gray-400 placeholder-gray-400;
    }
</style>
