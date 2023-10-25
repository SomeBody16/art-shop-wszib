<script lang="ts">
    import { LL } from 'i18n'
    import {
        Button,
        Card,
        DebouncedSearchInput,
        Pagination,
        PriceDisplay,
        Sortable,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        sitemap,
    } from 'ui'
    import MaterialSymbolsVisibilityRounded from '~icons/material-symbols/visibility-rounded'

    export let data
    const meta = data.getShippingRates.meta
</script>

<div class="mb-2 flex justify-between">
    <div class="w-1/3">
        <DebouncedSearchInput name="search" placeholder={$LL.Search()} class="rounded-l-none border-l-0" />
    </div>
    <div class="w-1/5">
        <a href={sitemap.dashboard.shippingRate.create}>
            <Button class="!rounded-r-none">
                {$LL.Create()}
            </Button>
        </a>
    </div>
</div>

<Card class="mx-4 overflow-hidden rounded-lg border-none !p-0">
    <Table>
        <TableHead>
            <TableHeadCell>
                <Sortable by="name">
                    {$LL.ShippingRate.Name()}
                </Sortable>
            </TableHeadCell>
            <TableHeadCell>
                <Sortable by="price">
                    {$LL.ShippingRate.Price()}
                </Sortable>
            </TableHeadCell>
            <TableHeadCell>
                {$LL.ShippingRate.Estimate()}
            </TableHeadCell>
            <TableHeadCell>
                <Sortable by="createdAt">
                    {$LL.CreatedAt()}
                </Sortable>
            </TableHeadCell>
            <TableHeadCell />
        </TableHead>
        <TableBody>
            {#each data.getShippingRates.data as item (item.id)}
                <TableBodyRow>
                    <TableBodyCell>
                        {item.name}
                    </TableBodyCell>
                    <TableBodyCell>
                        <PriceDisplay price={item.price} currency={item.currency} />
                    </TableBodyCell>
                    <TableBodyCell>
                        {$LL.ShippingRate.Display.Estimate(item)}
                    </TableBodyCell>
                    <TableBodyCell>
                        {$LL.CreatedAtDate(item.createdAt)}
                    </TableBodyCell>
                    <TableBodyCell>
                        <a href={sitemap.dashboard.shippingRate.item(item.id)}>
                            <MaterialSymbolsVisibilityRounded
                                class="h-5 w-5 text-gray-500 transition duration-100 hover:text-white"
                            />
                        </a>
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</Card>
<Pagination {meta} />
