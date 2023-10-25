<script>
    import { LL } from 'i18n'
</script>

<aside class="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0">
    <div class="flex h-screen flex-col border-r border-gray-700 bg-gray-800 py-4">
        <div class="mb-5 flex items-center justify-center pl-2">
            <span class="self-center whitespace-nowrap text-2xl font-semibold text-white">
                {$LL.AppName()}
            </span>
        </div>
        <ul class="space-y-2">
            <slot name="items" />
        </ul>
    </div>
</aside>
<div class="ml-64">
    <slot />
</div>
