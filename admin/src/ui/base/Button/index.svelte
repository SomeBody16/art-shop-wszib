<script lang="ts">
    import { Spinner } from '../Spinner'
    import { colorClasses } from './colorClasses'

    export let loading: boolean = false
    export let disabled: boolean = false
    export let color: keyof typeof colorClasses = 'primary'

    const colorClass = colorClasses[color]
</script>

<button
    {...$$restProps}
    class={`
flex h-12 w-full items-center justify-center rounded-lg border
border-transparent px-5 py-2.5 text-sm
font-medium text-white
focus:outline-none focus:ring-4
${disabled || loading ? colorClass.disabled : colorClass.base}
${$$props.class}
`}
    class:cursor-not-allowed={disabled}
    class:cursor-wait={loading}
    on:click
>
    {#if loading}
        <Spinner class="m-0 mr-3 inline !h-5 !w-5 p-0" />
    {/if}
    <slot />
</button>
