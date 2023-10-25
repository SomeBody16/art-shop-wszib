import { BaseEntity } from '@api/core'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { ShippingRateEntity } from './ShippingRate.entity'

@Entity()
export class ProductEntity extends BaseEntity {
    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text', unique: true })
    slug: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'text', array: true })
    imageIds: string[]

    @Column({ type: 'integer' })
    price: number

    @Column({ type: 'text' })
    currency: string

    @Column({ type: 'text', array: true })
    shippingCountries: string[]

    @Column({ type: 'timestamp', nullable: true })
    publishedAt?: Date

    @Column({ type: 'integer', nullable: true })
    available?: number

    @ManyToMany(() => ShippingRateEntity)
    @JoinTable()
    shippingRates: ShippingRateEntity[]
}
