import type { BaseTranslation } from '../i18n-types'

const en = {
    AppName: 'Alessalicia Art',
    'Sign in with Google': 'Sign in with Google',
    Drawer: {
        Overview: 'Overview',
        Order: 'Order',
        Product: 'Product',
        'Shipping Rate': 'Shipping Rate',
    },
    Overview: {},
    Order: {},
    Product: {
        Name: 'Name',
        Slug: 'Slug',
        Description: 'Description',
        Images: 'Images',
        Price: 'Price',
        Currency: 'Currency',
        ShippingCountries: 'Shipping Countries',
        PublishedAt: 'Published at',
        Available: 'Available',
    },
    ShippingRate: {
        Name: 'Name',
        Price: 'Price',
        Currency: 'Currency',
        Estimate: 'Estimate',
        Display: {
            Estimate:
                '{deliveryEstimateMinVal:number} {deliveryEstimateMinUnit:DeliveryEstimateUnit|DeliveryEstimateUnit} - {deliveryEstimateMaxVal:number} {deliveryEstimateMaxUnit:DeliveryEstimateUnit|DeliveryEstimateUnit}',
        },
    },
    DeliveryEstimateUnit: {
        business_day: 'Business Day',
        day: 'Day',
        hour: 'Hour',
        month: 'Month',
        week: 'Week',
    },
    Create: 'Create',
    Search: 'Search',
    Delete: 'Delete',
    Submit: 'Submit',
    CreatedAt: 'Created at',
    UpdatedAt: 'Updated at',
    CreatedAtDate: '{0:DateLike|date}',
    UpdatedAtDate: '{0:DateLike|date}',
    UnknownError: 'Unknown Error',
    Validation: {
        invalid_string: 'Invalid value',
    },
} satisfies BaseTranslation

export default en
