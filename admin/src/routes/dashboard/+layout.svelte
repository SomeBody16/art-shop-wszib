<script lang="ts">
    import { page } from '$app/stores'
    import { LL } from 'i18n'
    import { Breadcrumb, DashboardDrawer } from 'ui'

    export let data
</script>

<svelte:head>
    <title>{$page.data.title}</title>
</svelte:head>

<DashboardDrawer>
    <div slot="items">
        {#each data.drawerItems as item}
            {@const isActive = $page.url.pathname.startsWith(item.href)}
            {@const Icon = item.Icon}
            <li>
                <a
                    href={item.href}
                    class="group mx-3 flex items-center rounded-lg p-2 text-base font-normal text-white transition duration-75"
                    class:bg-gray-700={isActive}
                    class:hover:bg-gray-700={!isActive}
                >
                    <Icon />
                    <span class="ml-3">
                        {$LL.Drawer[item.label]()}
                    </span>
                </a>
            </li>
        {/each}
    </div>

    <div class="flex flex-col">
        <Breadcrumb items={$page.data.breadcrumbs} class="m-4" />
        <!-- <Breadcrumb navClass="m-4">
            {#each $page.data.breadcrumbs || [] as item}
                <BreadcrumbItem href={item.href}>{item.label}</BreadcrumbItem>
            {/each}
        </Breadcrumb> -->
        <slot />
    </div>
</DashboardDrawer>
