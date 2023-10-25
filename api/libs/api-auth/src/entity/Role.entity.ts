import { Column, Entity } from 'typeorm'
import { BaseEntity } from '@api/core'

export enum RolePermission {
    SUPER_ADMIN = 'SUPER_ADMIN',
    LOGIN = 'LOGIN',
}

@Entity()
export class RoleEntity extends BaseEntity {
    @Column({ type: 'text' })
    name: string

    @Column({ type: 'enum', enum: RolePermission, array: true })
    permissions: RolePermission[]
}
