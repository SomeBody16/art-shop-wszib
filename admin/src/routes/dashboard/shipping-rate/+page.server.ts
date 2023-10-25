import { apiClient, type ShippingRateModel, type ShippingRateModelPaginated } from 'api'
import { LLGet } from 'i18n'
import { sitemap, type BreadcrumbItem } from 'ui'

type Document = {
    getShippingRates: ShippingRateModelPaginated
}

export const load = async (event) => {
    const { getShippingRates } = await apiClient.requestPaginatedSearchParams<Document, ShippingRateModel>({
        name: 'getShippingRates',
        queryType: 'ShippingRateModelPaginateQuery',
        query: event.url.searchParams,
        fields: [
            'id',
            'name',
            'price',
            'currency',
            'deliveryEstimateMinUnit',
            'deliveryEstimateMaxUnit',
            'deliveryEstimateMinVal',
            'deliveryEstimateMaxVal',
            'createdAt',
        ],
    })

    return {
        title: LLGet().Drawer['Shipping Rate'](),
        breadcrumbs: [
            {
                label: LLGet().Drawer['Shipping Rate'](),
                href: sitemap.dashboard.shippingRate.list,
            },
        ] satisfies BreadcrumbItem[],
        getShippingRates,
    }
}
