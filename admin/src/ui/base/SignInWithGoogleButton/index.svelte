<script lang="ts">
    import { goto } from '$app/navigation'
    import { LL } from 'i18n'
    import { sitemap } from 'ui'
    import GoogleIcon from './GoogleIcon.svelte'

    const handleClick = () => {
        goto(sitemap.auth.google.root)
    }
</script>

<button
    on:click={handleClick}
    class="mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg border border-gray-600 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-700"
>
    <GoogleIcon />
    {$LL['Sign in with Google']()}
</button>
