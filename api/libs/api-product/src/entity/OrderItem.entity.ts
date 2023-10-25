import { BaseEntity } from '@api/core'
import { Column, Entity, JoinColumn, ManyToOne, ObjectType, OneToOne } from 'typeorm'
import { OrderEntity } from './Order.entity'
import { ProductEntity } from './Product.entity'
import { ShippingRateEntity } from './ShippingRate.entity'

@Entity()
export class OrderItemEntity extends BaseEntity {
    @Column({ type: 'text' })
    orderId: string

    @ManyToOne((): ObjectType<OrderEntity> => OrderEntity, (entity) => entity.items, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn()
    order: OrderEntity

    @Column({ type: 'jsonb' })
    productSnapshot: ProductEntity

    @Column({ type: 'jsonb' })
    shippingRateSnapshot: ShippingRateEntity
}
