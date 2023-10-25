import { redirect } from '@sveltejs/kit'
import { DeliveryEstimateUnit, apiClient, gql, type EmptyResponse, type ShippingRateModel } from 'api'
import { LLGet } from 'i18n'
import { sitemap, type BreadcrumbItem } from 'ui'
import { FormDataUtil, sleep } from 'utils'

const document = gql`
    query ($id: String!) {
        getShippingRate(id: $id) {
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

type Document = {
    getShippingRate: ShippingRateModel
}

export const load = async (event) => {
    const { getShippingRate: item } = await apiClient.request<Document>(document, { id: event.params.id })

    return {
        title: item.name,
        breadcrumbs: [
            {
                label: LLGet().Drawer['Shipping Rate'](),
                href: sitemap.dashboard.shippingRate.list,
            },
            {
                label: item.name,
                href: sitemap.dashboard.shippingRate.item(item.id),
            },
        ] satisfies BreadcrumbItem[],
        item,
    }
}

export const actions = {
    update: async (event) => {
        const form = await FormDataUtil.create(event.request.formData())
        const variables = {
            id: event.params.id,
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
            patchShippingRate: ShippingRateModel
        }
        const document = gql`
            mutation ($id: String!, $data: ShippingRatePatchInput!) {
                patchShippingRate(id: $id, data: $data) {
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

        try {
            await apiClient.request<Document>(document, variables)
        } catch (e) {
            const errors = apiClient.parseErrors(e)
            return {
                item: variables.data,
                errors,
            }
        }
    },
    delete: async (event) => {
        type Document = {
            deleteShippingRate: EmptyResponse
        }
        const document = gql`
            mutation ($id: String!) {
                deleteShippingRate(id: $id) {
                    success
                }
            }
        `
        const { deleteShippingRate } = await apiClient.request<Document>(document, {
            id: event.params.id,
        })

        if (deleteShippingRate.success) {
            await sleep(500)
            throw redirect(303, sitemap.dashboard.shippingRate.list)
        }

        return {
            errors: apiClient.parseErrors(),
        }
    },
}
