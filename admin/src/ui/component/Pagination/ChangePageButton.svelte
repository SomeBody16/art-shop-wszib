<script lang="ts">
    export let disabled: boolean
    export let isRight: boolean = false
</script>

<button
    on:click
    {disabled}
    class="h-12 border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium
    text-gray-500 hover:bg-gray-600 hover:text-white
    focus:z-10 focus:text-white focus:outline-none focus:ring-2"
    class:disabled
    class:border-r-0={isRight}
    class:rounded-l-lg={!isRight}
>
    <slot />
</button>

<style>
    .disabled {
        @apply bg-gray-600;
    }
    .disabled:hover {
        @apply text-gray-500;
    }
</style>
