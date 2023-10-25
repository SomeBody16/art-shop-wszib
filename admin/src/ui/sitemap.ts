export const sitemap = {
    auth: {
        root: (error?: string) => `/auth${error ? `?error=${error}` : ''}`,
        google: {
            root: '/auth/google',
            callback: '/auth/google/callback',
        },
    },
    dashboard: {
        overview: {
            root: '/dashboard/overview',
        },
        order: {
            list: '/dashboard/order',
            item: (id: string) => `/dashboard/order/${id}`,
            create: `/dashboard/order/create`,
        },
        product: {
            list: '/dashboard/product',
            item: (slug: string) => `/dashboard/product/${slug}`,
            create: `/dashboard/product/create`,
        },
        shippingRate: {
            list: '/dashboard/shipping-rate',
            item: (id: string) => `/dashboard/shipping-rate/${id}`,
            create: `/dashboard/shipping-rate/create`,
        },
    },
}
