<script lang="ts">
    import MaterialSymbolsChevronRight from '~icons/material-symbols/chevron-right'
    import type { BreadcrumbItem } from './types'

    export let items: BreadcrumbItem[]
</script>

<nav class={`flex ${$$props.class}`}>
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
        {#each items as item, index (item.href)}
            <li class="flex items-center">
                {#if index > 0} <MaterialSymbolsChevronRight /> {/if}
                <a href={item.href} class="ml-1 text-sm font-medium text-gray-400 hover:text-white md:ml-2">
                    {item.label}
                </a>
            </li>
        {/each}
    </ol>
</nav>
