import { ApiAssetModule } from '@api/asset'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import AddressEntity from './entity/Address.entity'
import CustomerEntity from './entity/Customer.entity'
import { OrderEntity } from './entity/Order.entity'
import { OrderItemEntity } from './entity/OrderItem.entity'
import { ProductEntity } from './entity/Product.entity'
import { ShippingRateEntity } from './entity/ShippingRate.entity'
import { CustomerResolver } from './resolver/Customer.resolver'
import { OrderResolver } from './resolver/Order.resolver'
import { ProductResolver } from './resolver/Product.resolver'
import { ShippingRateResolver } from './resolver/ShippingRate.resolver'
import { OrderSeeder } from './seeder/Order.seeder'
import { AddressService } from './service/Address.service'
import { CustomerService } from './service/Customer.service'
import { OrderService } from './service/Order.service'
import { OrderItemService } from './service/OrderItem.service'
import { ProductService } from './service/Product.service'
import { ShippingRateService } from './service/ShippingRate.service'

@Module({
    controllers: [],
    providers: [
        AddressService,
        CustomerService,
        OrderService,
        OrderItemService,
        ProductService,
        ShippingRateService,
        CustomerResolver,
        OrderResolver,
        ProductResolver,
        ShippingRateResolver,
        OrderSeeder,
    ],
    exports: [],
    imports: [
        TypeOrmModule.forFeature([
            AddressEntity,
            CustomerEntity,
            OrderEntity,
            OrderItemEntity,
            ProductEntity,
            ShippingRateEntity,
        ]),
        ApiAssetModule,
    ],
})
export class ApiProductModule {}
