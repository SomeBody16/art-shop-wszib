<script lang="ts">
</script>

<div class={`block rounded-lg border border-gray-700 bg-gray-800 p-6 shadow ${$$props.class}`}>
    {#if $$slots.title}
        <div class="flex justify-between">
            <span>
                <slot name="title" />
            </span>
        </div>
    {/if}
    <slot />
</div>
