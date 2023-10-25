import { BaseEntity } from '@api/core'
import { Column, Entity } from 'typeorm'

@Entity()
export default class CustomerEntity extends BaseEntity {
    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text' })
    surname: string

    @Column({ type: 'text' })
    email: string

    @Column({ type: 'text' })
    phone: string

    @Column({ type: 'text' })
    ip: string

    @Column({ type: 'text', array: true })
    addressIds: string[]
}
