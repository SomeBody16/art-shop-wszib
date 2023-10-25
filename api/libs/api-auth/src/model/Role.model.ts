import { Field, InputType, ObjectType, PartialType, PickType, registerEnumType } from '@nestjs/graphql'
import { BaseModel, PaginatedModel, PaginateQueryInput, Validate } from '@api/core'
import { RoleEntity, RolePermission } from '../entity/Role.entity'

registerEnumType(RolePermission, {
    name: 'RolePermission',
})

@ObjectType()
export class RoleModel extends BaseModel {
    @Field()
    @Validate.String()
    name: string

    @Field(() => [RolePermission])
    @Validate.NativeEnum(RolePermission, (z) => z.array())
    permissions: RolePermission[]
}

@InputType()
export class RoleModelPaginateQuery extends PaginateQueryInput<RoleEntity>({
    sortableColumns: ['createdAt'],
}) {}

@ObjectType()
export class RoleModelPaginated extends PaginatedModel(RoleModel) {}

@InputType()
export class RoleCreateInput extends PickType(RoleModel, ['name', 'permissions'] as const, InputType) {}

@InputType()
export class RolePatchInput extends PartialType(RoleCreateInput) {}
