import { BaseModel, Validate } from '@api/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { ProductModel } from './Product.model'
import { ShippingRateModel } from './ShippingRate.model'

@ObjectType()
export class OrderItemModel extends BaseModel {
    @Field()
    @Validate.Any()
    productSnapshot: ProductModel

    @Field()
    @Validate.Any()
    shippingRateSnapshot: ShippingRateModel
}
