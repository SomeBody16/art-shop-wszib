import { Injectable } from '@nestjs/common'
import { CrudService } from '@api/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RoleEntity, RolePermission } from '../entity/Role.entity'
import { ForbiddenError } from '../error/Forbidden.error'
import { RoleModelPaginateQuery } from '../model/Role.model'

@Injectable()
export class RoleService extends CrudService<RoleEntity> {
    constructor(@InjectRepository(RoleEntity) repository: Repository<RoleEntity>) {
        super(repository, RoleModelPaginateQuery.config)
    }

    async assertHaveAllPermissions(roleId: string, requiredPermissions: RolePermission[]): Promise<void> {
        const role = await this.findById(roleId)

        if (role.permissions.includes(RolePermission.SUPER_ADMIN)) {
            return
        }

        for (const requiredPerm of requiredPermissions) {
            if (!role.permissions.includes(requiredPerm)) {
                throw new ForbiddenError(requiredPerm)
            }
        }
    }
}
