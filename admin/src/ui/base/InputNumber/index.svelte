<script lang="ts">
    import { Spinner } from '../Spinner'

    export let name: string
    export let loading: boolean = false
    export let disabled: boolean = false
    export let autocomplete: string = 'off'
    export let error: string = ''
    export let placeholder: string = ''

    export let defaultValue: string = ''
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
        <input
            {...$$restProps}
            id={name}
            type="number"
            {name}
            class={`focus:border-primary-600focus:ring-primary-600 sm:text-sm" block h-12 w-full rounded-lg border border-gray-700 bg-gray-700 p-2.5 text-white placeholder-gray-400 outline-0 ${$$props.class}`}
            class:pl-10={$$slots.icon}
            class:border-red-500={error}
            class:input-disabled={disabled}
            {autocomplete}
            {placeholder}
            {disabled}
            on:change
            on:input
            bind:value
        />
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
