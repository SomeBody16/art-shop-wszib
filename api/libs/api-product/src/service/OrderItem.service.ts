import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudService } from '@api/core'
import { OrderItemEntity } from '../entity/OrderItem.entity'

@Injectable()
export class OrderItemService extends CrudService<OrderItemEntity> {
    constructor(@InjectRepository(OrderItemEntity) repository: Repository<OrderItemEntity>) {
        super(repository, {
            sortableColumns: ['createdAt'],
            searchableColumns: [],
            defaultSortBy: [['createdAt', 'DESC']],
        })
    }
}
