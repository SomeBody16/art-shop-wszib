import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseEntity } from '@api/core'
import { RoleEntity } from './Role.entity'

@Entity()
export class AdminEntity extends BaseEntity {
    @Column({ type: 'text', unique: true })
    email: string

    @Column({ type: 'text' })
    roleId: string

    @OneToOne(() => RoleEntity)
    @JoinColumn()
    role: RoleEntity
}
