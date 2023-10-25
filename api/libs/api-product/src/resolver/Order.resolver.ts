import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { EmptyResponse } from '@api/core'
import { OrderModel, OrderModelPaginated, OrderModelPaginateQuery } from '../model/Order.model'
import { OrderService } from '../service/Order.service'

@Resolver(() => OrderModel)
export class OrderResolver {
    constructor(protected orderService: OrderService) {}

    @Query(() => OrderModel)
    async getOrder(@Args('id') id: string): Promise<OrderModel> {
        return this.orderService.findById(id)
    }

    @Query(() => OrderModelPaginated)
    async getOrders(@Args('query', { nullable: true }) query: OrderModelPaginateQuery): Promise<OrderModelPaginated> {
        return this.orderService.findMany(query)
    }

    @Mutation(() => EmptyResponse)
    async deleteOrder(@Args('id') id: string): Promise<EmptyResponse> {
        this.orderService.deleteById(id).then()
        return EmptyResponse.succeed()
    }
}
