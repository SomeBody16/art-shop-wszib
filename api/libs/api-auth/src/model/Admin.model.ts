import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { BaseModel, PaginatedModel, PaginateQueryInput, Validate } from '@api/core'
import { AdminEntity } from '../entity/Admin.entity'

@ObjectType()
export class AdminModel extends BaseModel {
    @Field()
    @Validate.Email()
    email: string

    @Field()
    @Validate.String()
    roleId: string
}

@InputType()
export class AdminModelPaginateQuery extends PaginateQueryInput<AdminEntity>({
    sortableColumns: ['createdAt'],
}) {}

@ObjectType()
export class AdminModelPaginated extends PaginatedModel(AdminModel) {}

@InputType()
export class AdminCreateInput extends PickType(AdminModel, ['email'] as const, InputType) {
    @Field()
    @Validate.String()
    roleId: string
}

@InputType()
export class AdminPatchInput extends PartialType(AdminCreateInput) {}
