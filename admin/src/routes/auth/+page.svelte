<script lang="ts">
    import { page } from '$app/stores'
    import { LL } from 'i18n'
    import { Alert, SignInWithGoogleButton } from 'ui'

    const error = $page.url.searchParams.get('error')
</script>

<section
    class="bg-gray-700 bg-opacity-60 bg-[url('/background.webp')] bg-cover bg-center bg-no-repeat bg-blend-multiply"
>
    <div class="pt:mt-0 mx-auto flex flex-col items-center px-6 py-8 md:h-screen">
        <div class="w-full rounded-lg bg-gray-800 shadow sm:max-w-md md:mt-0 xl:p-0">
            <div class="space-y-4 p-6 sm:p-8 md:space-y-6 lg:space-y-8">
                <div class="space-y-4 md:space-y-6">
                    <h1 class="mb-2 flex items-center justify-center text-2xl font-semibold text-white">
                        <img
                            class="mr-2 h-8 w-8"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                            alt="logo"
                        />
                        {$LL.AppName()}
                    </h1>
                    <SignInWithGoogleButton />

                    {#if error}
                        <Alert type="danger" class="border-t-4">{error}</Alert>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</section>
