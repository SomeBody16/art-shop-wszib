import { BaseModel, PaginatedModel, PaginateQueryInput, Validate } from '@api/core'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { OrderEntity, OrderStatus } from '../entity/Order.entity'
import { CustomerModel } from './Customer.model'

registerEnumType(OrderStatus, {
    name: 'OrderStatus',
})

@ObjectType()
export class OrderModel extends BaseModel {
    @Field()
    @Validate.String()
    paymentId: string

    @Field(() => OrderStatus)
    @Validate.NativeEnum(OrderStatus)
    status: OrderStatus

    @Field()
    @Validate.Price()
    price: number

    @Field()
    @Validate.String()
    currency: string

    @Field()
    @Validate.Any()
    customerSnapshot: CustomerModel
}

@InputType()
export class OrderModelPaginateQuery extends PaginateQueryInput<OrderEntity>({
    sortableColumns: ['createdAt'],
    searchableColumns: [],
}) {}

@ObjectType()
export class OrderModelPaginated extends PaginatedModel(OrderModel) {}
