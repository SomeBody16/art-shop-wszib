import { BaseModel, PaginatedModel, PaginateQueryInput, Validate } from '@api/core'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import CustomerEntity from '../entity/Customer.entity'

@ObjectType()
export class CustomerModel extends BaseModel {
    @Field()
    @Validate.String()
    name: string

    @Field()
    @Validate.String()
    surname: string

    @Field()
    @Validate.Email()
    email: string

    @Field()
    @Validate.String()
    phone: string

    @Field()
    @Validate.String()
    ip: string

    @Field(() => [String])
    @Validate.String((z) => z.array())
    addressIds: string[]
}

@InputType()
export class CustomerModelPaginateQuery extends PaginateQueryInput<CustomerEntity>({
    sortableColumns: ['createdAt'],
    searchableColumns: [],
}) {}

@ObjectType()
export class CustomerModelPaginated extends PaginatedModel(CustomerModel) {}
