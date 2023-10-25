import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudService } from '@api/core'
import { OrderEntity } from '../entity/Order.entity'
import { OrderModelPaginateQuery } from '../model/Order.model'

@Injectable()
export class OrderService extends CrudService<OrderEntity> {
    constructor(@InjectRepository(OrderEntity) repository: Repository<OrderEntity>) {
        super(repository, OrderModelPaginateQuery.config)
    }
}
