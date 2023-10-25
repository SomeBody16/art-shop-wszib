import { Seeder } from '@api/core'
import { AdminService } from '../service/Admin.service'
import { RoleService } from '../service/Role.service'
import { RolePermission } from '../entity/Role.entity'

@Seeder()
export class SuperAdminSeeder implements Seeder {
    constructor(protected adminService: AdminService, protected roleService: RoleService) {}

    async execute() {
        const superAdminRole = await this.roleService.create({
            name: 'Super Admin',
            permissions: ['SUPER_ADMIN'] as RolePermission[],
        })
        await this.adminService.create({
            email: 'f.nowakowski2000@gmail.com',
            roleId: superAdminRole.id,
        })
    }
}
