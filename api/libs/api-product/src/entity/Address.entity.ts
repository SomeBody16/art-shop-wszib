import { BaseEntity } from '@api/core'
import { Column, Entity } from 'typeorm'

@Entity()
export default class AddressEntity extends BaseEntity {
    @Column({ type: 'text' })
    city: string

    @Column({ type: 'text' })
    state: string

    @Column({ type: 'text' })
    country: string

    @Column({ type: 'text' })
    line1: string

    @Column({ type: 'text', nullable: true })
    line2?: string

    @Column({ type: 'text' })
    zipCode: string
}
