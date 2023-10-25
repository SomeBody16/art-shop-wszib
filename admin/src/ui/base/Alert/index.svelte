<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import DefaultIcon from './lib/DefaultIcon.svelte'
    import DismissButton from './lib/DismissButton.svelte'
    import { colorOf, type AlertType } from './props'
    export let dispatch = createEventDispatcher()

    type TVariant = 'top-border'
    export let variant: TVariant = 'top-border'

    export let type: AlertType = 'info'
    export let icon: any = DefaultIcon
    export let dismissable: boolean = false

    const color = colorOf(type)
</script>

{#if variant == 'top-border'}
    <div class={`mb-4 flex p-4 ${color.text} ${color.border} border-t-4 bg-gray-800 ${$$props.class}`} role="alert">
        {icon}
        <div class="ml-3 text-sm">
            <slot />
        </div>
        {#if dismissable}
            <DismissButton className={color.text} on:click={() => dispatch('dismiss')} />
        {/if}
    </div>
{/if}
