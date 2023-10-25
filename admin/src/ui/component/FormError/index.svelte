<script lang="ts">
    import { page } from '$app/stores'
    import type { GraphQLError } from 'graphql'
    import { LL } from 'i18n'
    import { derived } from 'svelte/store'

    export let name: string | undefined = undefined

    const error = derived(page, ($page) => {
        const errors: GraphQLError[] | undefined = $page.form?.errors
        console.log(errors)
        if (!errors?.length) {
            return undefined
        }

        if (!name) {
            return errors.find((e) => !e.extensions?.property)
        }

        const error = errors.find((e) => e.extensions?.property === name)
        const message = error?.extensions?.message as any
        if (message) {
            return $LL.Validation[message](error?.extensions)
        }

        return error?.message || $LL.UnknownError()
    })

    error.subscribe((e) => console.log(name, e))
</script>

{#if $error}
    {$error}
{/if}
