import { Column, Entity } from 'typeorm'
import { BaseEntity } from '@api/core'

export enum DeliveryEstimateUnit {
    hour = 'hour',
    day = 'day',
    business_day = 'business_day',
    week = 'week',
    month = 'month',
}

@Entity()
export class ShippingRateEntity extends BaseEntity {
    @Column({ type: 'text' })
    name: string

    @Column({ type: 'integer' })
    price: number

    @Column({ type: 'text' })
    currency: string

    @Column({ type: 'enum', enum: DeliveryEstimateUnit })
    deliveryEstimateMinUnit: DeliveryEstimateUnit

    @Column({ type: 'enum', enum: DeliveryEstimateUnit })
    deliveryEstimateMaxUnit: DeliveryEstimateUnit

    @Column({ type: 'integer' })
    deliveryEstimateMinVal: number

    @Column({ type: 'integer' })
    deliveryEstimateMaxVal: number
}
