import { Field, InputType, Int, ObjectType, PartialType, PickType, registerEnumType } from '@nestjs/graphql'
import { BaseModel, PaginatedModel, PaginateQueryInput, Validate } from '@api/core'
import { DeliveryEstimateUnit, ShippingRateEntity } from '../entity/ShippingRate.entity'
import { FilterOperator } from 'nestjs-paginate'

registerEnumType(DeliveryEstimateUnit, {
    name: 'DeliveryEstimateUnit',
})

@ObjectType()
export class ShippingRateModel extends BaseModel {
    @Field()
    @Validate.String()
    name: string

    @Field(() => Int)
    @Validate.Price()
    price: number

    @Field()
    @Validate.String()
    currency: string

    @Field(() => DeliveryEstimateUnit)
    @Validate.NativeEnum(DeliveryEstimateUnit)
    deliveryEstimateMinUnit: DeliveryEstimateUnit

    @Field(() => DeliveryEstimateUnit)
    @Validate.NativeEnum(DeliveryEstimateUnit)
    deliveryEstimateMaxUnit: DeliveryEstimateUnit

    @Field(() => Int)
    @Validate.Integer()
    deliveryEstimateMinVal: number

    @Field(() => Int)
    @Validate.Integer()
    deliveryEstimateMaxVal: number
}

@InputType()
export class ShippingRateModelPaginateQuery extends PaginateQueryInput<ShippingRateEntity>({
    sortableColumns: ['name', 'price', 'createdAt'],
    searchableColumns: ['name', 'price'],
    filterableColumns: {
        currency: [FilterOperator.IN],
        deliveryEstimateMinUnit: [FilterOperator.IN],
        deliveryEstimateMaxUnit: [FilterOperator.IN],
        deliveryEstimateMinVal: [FilterOperator.GTE, FilterOperator.LTE],
        deliveryEstimateMaxVal: [FilterOperator.GTE, FilterOperator.LTE],
        price: [FilterOperator.GTE, FilterOperator.LTE],
    },
}) {}

@ObjectType()
export class ShippingRateModelPaginated extends PaginatedModel(ShippingRateModel) {}

@InputType()
export class ShippingRateCreateInput extends PickType(
    ShippingRateModel,
    [
        'name',
        'price',
        'currency',
        'deliveryEstimateMinUnit',
        'deliveryEstimateMaxUnit',
        'deliveryEstimateMinVal',
        'deliveryEstimateMaxVal',
    ],
    InputType,
) {}

@InputType()
export class ShippingRatePatchInput extends PartialType(ShippingRateCreateInput) {}
