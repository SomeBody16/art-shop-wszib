import { Seeder } from '@api/core'
import { Logger } from '@nestjs/common'
import { faker } from '@api/util'
import AddressEntity from '../entity/Address.entity'
import CustomerEntity from '../entity/Customer.entity'
import { OrderEntity, OrderStatus } from '../entity/Order.entity'
import { OrderItemEntity } from '../entity/OrderItem.entity'
import { ProductEntity } from '../entity/Product.entity'
import { DeliveryEstimateUnit, ShippingRateEntity } from '../entity/ShippingRate.entity'
import { AddressService } from '../service/Address.service'
import { CustomerService } from '../service/Customer.service'
import { OrderService } from '../service/Order.service'
import { OrderItemService } from '../service/OrderItem.service'
import { ProductService } from '../service/Product.service'
import { ShippingRateService } from '../service/ShippingRate.service'

@Seeder()
export class OrderSeeder implements Seeder {
    protected logger = new Logger(OrderSeeder.name)

    constructor(
        protected addressService: AddressService,
        protected customerService: CustomerService,
        protected orderService: OrderService,
        protected orderItemService: OrderItemService,
        protected productService: ProductService,
        protected shippingRateService: ShippingRateService,
    ) {}

    async execute() {
        const count = 50
        for (let i = 1; i <= count; i++) {
            const percent = Math.floor((i / count) * 100)
            this.logger.log(`${i} / ${count} [${percent}%]...`)
            await this.createOrder()
        }
    }

    protected async createOrder(): Promise<OrderEntity> {
        const customer = await this.createCustomer()
        const order = await this.orderService.create({
            paymentId: faker.string.nanoid(),
            status: faker.enum.value(OrderStatus),
            price: faker.domain.price(),
            currency: faker.domain.currency(),
            customerSnapshot: faker.jsonify(customer),
            createdAt: faker.date.past(),
            customer,
        })

        await faker.createMany(1, 5, () => this.createOrderItem(order))

        return order
    }

    protected async createOrderItem(order: OrderEntity): Promise<OrderItemEntity> {
        const product = await this.createProduct()
        const shippingRate = faker.helpers.arrayElement(product.shippingRates)
        return this.orderItemService.create({
            orderId: order.id,
            productSnapshot: faker.jsonify(product),
            shippingRateSnapshot: faker.jsonify(shippingRate),
            createdAt: order.createdAt,
        })
    }

    protected async createProduct(): Promise<ProductEntity> {
        const name = faker.commerce.productName()
        const shippingRates = await faker.createMany(1, 5, () => this.createShippingRate())

        return this.productService.create(
            {
                name,
                slug: `${faker.helpers.slugify(name)}-${faker.string.nanoid()}`.toLowerCase(),
                description: faker.commerce.productDescription(),
                imageIds: faker.domain.images(),
                price: faker.domain.price(),
                currency: faker.domain.currency(),
                shippingCountries: faker.helpers.arrayElements(
                    ['PL', 'DE', 'US', 'RU'],
                    faker.number.int({ min: 1, max: 4 }),
                ),
                publishedAt: faker.datatype.boolean() ? faker.date.past() : undefined,
                available: faker.datatype.boolean() ? faker.number.int({ min: 0, max: 5 }) : undefined,
                createdAt: faker.date.past(),
                shippingRates,
            },
            {
                relations: {
                    shippingRates: true,
                },
            },
        )
    }

    protected async createShippingRate(): Promise<ShippingRateEntity> {
        const unit: DeliveryEstimateUnit = faker.enum.value(DeliveryEstimateUnit)
        const minValue = faker.number.int({ min: 1, max: 14 })
        const maxValue = faker.number.int({ min: minValue, max: 30 })

        return this.shippingRateService.create({
            name: faker.vehicle.vehicle(),
            price: faker.domain.price(),
            currency: faker.domain.currency(),
            deliveryEstimateMinUnit: unit,
            deliveryEstimateMaxUnit: unit,
            deliveryEstimateMinVal: minValue,
            deliveryEstimateMaxVal: maxValue,
            createdAt: faker.date.past(),
        })
    }

    protected async createCustomer(): Promise<CustomerEntity> {
        const address = await this.createAddress()

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        return this.customerService.create({
            name: firstName,
            surname: lastName,
            email: faker.internet.email({ firstName, lastName }),
            phone: faker.phone.number(),
            ip: faker.internet.ipv4(),
            addressIds: [address.id],
            createdAt: faker.date.past(),
        })
    }

    protected async createAddress(): Promise<AddressEntity> {
        return this.addressService.create({
            city: faker.location.city(),
            state: faker.location.state(),
            country: faker.location.country(),
            zipCode: faker.location.zipCode(),
            line1: faker.location.streetAddress(),
            line2: faker.datatype.boolean() ? undefined : faker.location.streetAddress(),
            createdAt: faker.date.past(),
        })
    }
}
