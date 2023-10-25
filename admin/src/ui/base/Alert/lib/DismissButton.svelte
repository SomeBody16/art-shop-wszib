<script lang="ts">
    export let className: string
</script>

<button
    class={`-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8
        rounded-lg bg-gray-800 p-1.5 hover:bg-gray-700 focus:ring-2 focus:ring-blue-400 ${className}`}
    on:click
>
    <svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
        />
    </svg>
</button>
