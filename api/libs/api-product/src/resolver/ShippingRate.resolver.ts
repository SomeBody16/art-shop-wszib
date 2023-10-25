import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
    ShippingRateCreateInput,
    ShippingRateModel,
    ShippingRateModelPaginated,
    ShippingRateModelPaginateQuery,
    ShippingRatePatchInput,
} from '../model/ShippingRate.model'
import { ShippingRateService } from '../service/ShippingRate.service'
import { EmptyResponse } from '@api/core'

@Resolver(() => ShippingRateModel)
export class ShippingRateResolver {
    constructor(protected shippingRateService: ShippingRateService) {}

    @Query(() => ShippingRateModel)
    async getShippingRate(@Args('id') id: string): Promise<ShippingRateModel> {
        return this.shippingRateService.findById(id)
    }

    @Query(() => ShippingRateModelPaginated)
    async getShippingRates(
        @Args('query', { nullable: true }) query: ShippingRateModelPaginateQuery,
    ): Promise<ShippingRateModelPaginated> {
        return this.shippingRateService.findMany(query)
    }

    @Mutation(() => ShippingRateModel)
    async createShippingRate(@Args('data') data: ShippingRateCreateInput): Promise<ShippingRateModel> {
        return this.shippingRateService.create(data)
    }

    @Mutation(() => ShippingRateModel)
    async patchShippingRate(
        @Args('id') id: string,
        @Args('data') data: ShippingRatePatchInput,
    ): Promise<ShippingRateModel> {
        return this.shippingRateService.patch(id, data)
    }

    @Mutation(() => EmptyResponse)
    async deleteShippingRate(@Args('id') id: string): Promise<EmptyResponse> {
        this.shippingRateService.deleteById(id).then()
        return EmptyResponse.succeed()
    }
}
