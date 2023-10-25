import type { Translations } from 'i18n'
import { sitemap } from 'ui'
import MaterialSymbolsBarChart4BarsRounded from '~icons/material-symbols/bar-chart-4-bars-rounded'
import MaterialSymbolsPriceChangeRounded from '~icons/material-symbols/price-change-rounded'
import MaterialSymbolsShoppingCartRounded from '~icons/material-symbols/shopping-cart-rounded'
import MdiTruckDelivery from '~icons/mdi/truck-delivery'

export const load = async (event) => {
    return {
        ...event.data,
        drawerItems: getDrawerItems(),
    }
}

type DrawerItem = {
    Icon: any
    href: string
    label: keyof Translations['Drawer']
}

const getDrawerItems = (): DrawerItem[] => {
    return [
        {
            Icon: MaterialSymbolsBarChart4BarsRounded,
            href: sitemap.dashboard.overview.root,
            label: 'Overview',
        },
        {
            Icon: MaterialSymbolsShoppingCartRounded,
            href: sitemap.dashboard.order.list,
            label: 'Order',
        },
        {
            Icon: MaterialSymbolsPriceChangeRounded,
            href: sitemap.dashboard.product.list,
            label: 'Product',
        },
        {
            Icon: MdiTruckDelivery,
            href: sitemap.dashboard.shippingRate.list,
            label: 'Shipping Rate',
        },
    ]
}
