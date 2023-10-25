import { BaseEntity } from '@api/core'
import { Column, Entity } from 'typeorm'

@Entity()
export class AssetEntity extends BaseEntity {
    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text', unique: true })
    slug: string

    @Column({ type: 'text' })
    type: string

    @Column({ type: 'bytea', nullable: true })
    blob?: any

    @Column({ type: 'boolean' })
    accepted: boolean
}
