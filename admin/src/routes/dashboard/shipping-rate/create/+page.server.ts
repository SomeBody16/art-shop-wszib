import { redirect } from '@sveltejs/kit'
import { DeliveryEstimateUnit, apiClient, gql, type ShippingRateModel } from 'api'
import { LLGet } from 'i18n'
import { sitemap, type BreadcrumbItem } from 'ui'
import { FormDataUtil } from 'utils'

export const load = async () => {
    return {
        title: `${LLGet().Create()} ${LLGet().Drawer['Shipping Rate']()}`,
        breadcrumbs: [
            {
                label: LLGet().Drawer['Shipping Rate'](),
                href: sitemap.dashboard.shippingRate.list,
            },
            {
                label: LLGet().Create(),
                href: sitemap.dashboard.shippingRate.create,
            },
        ] satisfies BreadcrumbItem[],
    }
}

export const actions = {
    create: async (event) => {
        const form = await FormDataUtil.create(event.request.formData())
        const variables = {
            data: {
                name: form.getString('name'),
                price: form.getFloat('price'),
                currency: form.getString('currency'),
                deliveryEstimateMinUnit: form.getString('deliveryEstimateMinUnit') as DeliveryEstimateUnit,
                deliveryEstimateMaxUnit: form.getString('deliveryEstimateMaxUnit') as DeliveryEstimateUnit,
                deliveryEstimateMinVal: form.getFloat('deliveryEstimateMinVal'),
                deliveryEstimateMaxVal: form.getFloat('deliveryEstimateMaxVal'),
            },
        }

        type Document = {
            createShippingRate: ShippingRateModel
        }
        const document = gql`
            mutation ($data: ShippingRateCreateInput!) {
                createShippingRate(data: $data) {
                    id
                    name
                    price
                    currency
                    deliveryEstimateMinUnit
                    deliveryEstimateMaxUnit
                    deliveryEstimateMinVal
                    deliveryEstimateMaxVal
                    createdAt
                    updatedAt
                }
            }
        `

        let item: ShippingRateModel
        try {
            const { createShippingRate } = await apiClient.request<Document>(document, variables)
            item = createShippingRate
        } catch (e) {
            const errors = apiClient.parseErrors(e)
            return {
                item: variables,
                errors,
            }
        }

        throw redirect(303, sitemap.dashboard.shippingRate.item(item.id))
    },
}
