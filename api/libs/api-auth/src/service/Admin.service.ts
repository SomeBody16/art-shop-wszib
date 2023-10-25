import { Injectable } from '@nestjs/common'
import { CrudService, NotFoundError } from '@api/core'
import { AdminEntity } from '../entity/Admin.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RolePermission } from '../entity/Role.entity'
import { RoleService } from './Role.service'
import { AdminModelPaginateQuery } from '../model/Admin.model'

@Injectable()
export class AdminService extends CrudService<AdminEntity> {
    constructor(
        @InjectRepository(AdminEntity) repository: Repository<AdminEntity>,
        protected roleService: RoleService,
    ) {
        super(repository, AdminModelPaginateQuery.config)
    }

    public async existsByEmail(email: string): Promise<boolean> {
        return this.repository.exist({ where: { email } })
    }

    public async assertExistsByEmail(email: string): Promise<void> {
        const exists = await this.existsByEmail(email)
        if (!exists) {
            throw new NotFoundError(this.repository.metadata.name, { email })
        }
    }

    public async findByEmail(email: string): Promise<AdminEntity> {
        return this.repository.findOneOrFail({ where: { email } }).catch(() => {
            throw new NotFoundError(this.repository.metadata.name, { email })
        })
    }

    public async deleteByEmail(email: string) {
        await this.repository.delete({ email })
    }

    async assertHaveAllPermissions(adminId: string, requiredPermissions: RolePermission[]) {
        const admin = await this.findById(adminId)
        await this.roleService.assertHaveAllPermissions(admin.roleId, requiredPermissions)
    }
}
