import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { EmptyResponse } from '@api/core'
import {
    RoleCreateInput,
    RoleModel,
    RoleModelPaginated,
    RoleModelPaginateQuery,
    RolePatchInput,
} from '../model/Role.model'
import { RoleService } from '../service/Role.service'

@Resolver(() => RoleModel)
export class RoleResolver {
    constructor(protected roleService: RoleService) {}

    @Query(() => RoleModel)
    async getRole(@Args('id') id: string): Promise<RoleModel> {
        return this.roleService.findById(id)
    }

    @Query(() => RoleModelPaginated)
    async getRoles(@Args('query', { nullable: true }) query: RoleModelPaginateQuery): Promise<RoleModelPaginated> {
        return this.roleService.findMany(query)
    }

    @Mutation(() => RoleModel)
    async createRole(@Args('data') data: RoleCreateInput): Promise<RoleModel> {
        return this.roleService.create(data)
    }

    @Mutation(() => RoleModel)
    async patchRole(@Args('id') id: string, @Args('data') data: RolePatchInput): Promise<RoleModel> {
        return this.roleService.patch(id, data)
    }

    @Mutation(() => EmptyResponse)
    async deleteRole(@Args('id') id: string): Promise<EmptyResponse> {
        this.roleService.deleteById(id).then()
        return EmptyResponse.succeed()
    }
}
