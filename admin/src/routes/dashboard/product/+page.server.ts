import { apiClient, type ProductModel, type ProductModelPaginated } from 'api'
import { LLGet } from 'i18n'
import { sitemap, type BreadcrumbItem } from 'ui'

type Document = {
    getProducts: ProductModelPaginated
}

export const load = async (event) => {
    const { getProducts } = await apiClient.requestPaginatedSearchParams<Document, ProductModel>({
        name: 'getProducts',
        queryType: 'ProductModelPaginateQuery',
        query: event.url.searchParams,
        fields: [
            'id',
            'name',
            'slug',
            'description',
            'imageIds',
            'price',
            'currency',
            'shippingCountries',
            'available',
            'publishedAt',
            'createdAt',
        ],
    })

    return {
        title: LLGet().Drawer.Product(),
        breadcrumbs: [
            {
                label: LLGet().Drawer.Product(),
                href: sitemap.dashboard.product.list,
            },
        ] satisfies BreadcrumbItem[],
        getProducts,
    }
}
