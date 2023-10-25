import { BaseEntity } from '@api/core'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import CustomerEntity from './Customer.entity'
import { OrderItemEntity } from './OrderItem.entity'

export enum OrderStatus {
    waiting_for_payment = 'waiting_for_payment',
    processing = 'processing',
    complete = 'complete',
    canceled = 'canceled',
}

@Entity()
export class OrderEntity extends BaseEntity {
    @Column({ type: 'text' })
    paymentId: string

    @Column({ type: 'enum', enum: OrderStatus })
    status: OrderStatus

    @Column({ type: 'integer' })
    price: number

    @Column({ type: 'text' })
    currency: string

    @OneToOne(() => CustomerEntity)
    @JoinColumn()
    customer: CustomerEntity

    @Column({ type: 'jsonb' })
    customerSnapshot: CustomerEntity

    @OneToMany(() => OrderItemEntity, (entity) => entity.order)
    items: OrderItemEntity[]
}
