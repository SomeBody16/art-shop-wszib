import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { EmptyResponse } from '@api/core'
import {
    AdminCreateInput,
    AdminModel,
    AdminModelPaginated,
    AdminModelPaginateQuery,
    AdminPatchInput,
} from '../model/Admin.model'
import { AdminService } from '../service/Admin.service'
import { RoleService } from '../service/Role.service'
import { RoleModel } from '../model/Role.model'
import { Authorized } from '../decorator/Authorized.decorator'
import { Admin } from '../decorator/Admin.decorator'

@Resolver(() => AdminModel)
export class AdminResolver {
    constructor(protected adminService: AdminService, protected roleService: RoleService) {}

    @Authorized()
    @Query(() => AdminModel)
    async getAdmin(@Args('id') id: string, @Admin() admin: AdminModel): Promise<AdminModel> {
        if (id === '@me') {
            return admin
        }
        return this.adminService.findById(id)
    }

    @Authorized()
    @ResolveField(() => RoleModel)
    async role(@Parent() admin: AdminModel): Promise<RoleModel> {
        return this.roleService.findById(admin.roleId)
    }

    @Authorized()
    @Query(() => AdminModelPaginated)
    async getAdmins(@Args('query', { nullable: true }) query: AdminModelPaginateQuery): Promise<AdminModelPaginated> {
        return this.adminService.findMany(query)
    }

    @Authorized()
    @Mutation(() => AdminModel)
    async createAdmin(@Args('data') data: AdminCreateInput): Promise<AdminModel> {
        await this.roleService.assertExistsById(data.roleId)
        return this.adminService.create(data)
    }

    @Authorized()
    @Mutation(() => AdminModel)
    async patchAdmin(@Args('id') id: string, @Args('data') data: AdminPatchInput): Promise<AdminModel> {
        return this.adminService.patch(id, data)
    }

    @Authorized()
    @Mutation(() => EmptyResponse)
    async deleteAdmin(@Args('id') id: string): Promise<EmptyResponse> {
        this.adminService.deleteById(id).then()
        return EmptyResponse.succeed()
    }
}
