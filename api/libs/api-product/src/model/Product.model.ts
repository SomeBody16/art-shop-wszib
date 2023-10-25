import { BaseModel, PaginatedModel, PaginateQueryInput, Validate } from '@api/core'
import { Field, InputType, ObjectType, OmitType, PartialType, PickType } from '@nestjs/graphql'
import { ProductEntity } from '../entity/Product.entity'

@ObjectType()
export class ProductModel extends BaseModel {
    @Field()
    @Validate.String()
    name: string

    @Field()
    @Validate.Slug()
    slug: string

    @Field()
    @Validate.String()
    description: string

    @Field(() => [String])
    @Validate.String((z) => z.array())
    imageIds: string[]

    @Field()
    @Validate.Price()
    price: number

    @Field()
    @Validate.String()
    currency: string

    @Field(() => [String])
    @Validate.String((z) => z.array())
    shippingCountries: string[]

    @Field({ nullable: true })
    @Validate.Date()
    @Validate.Optional()
    publishedAt?: Date

    @Field({ nullable: true })
    @Validate.Integer((z) => z.min(0))
    @Validate.Optional()
    available?: number
}

@InputType()
export class ProductModelPaginateQuery extends PaginateQueryInput<ProductEntity>({
    sortableColumns: ['createdAt'],
    searchableColumns: [],
}) {}

@ObjectType()
export class ProductModelPaginated extends PaginatedModel(ProductModel) {}

@InputType()
export class ProductCreateInput extends PickType(
    ProductModel,
    ['name', 'slug', 'description', 'imageIds', 'price', 'currency', 'shippingCountries', 'publishedAt', 'available'],
    InputType,
) {}

@InputType()
export class ProductPatchInput extends PartialType(OmitType(ProductCreateInput, ['slug'])) {}
