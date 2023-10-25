import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudService } from '@api/core'
import { ProductEntity } from '../entity/Product.entity'
import { ProductModelPaginateQuery } from '../model/Product.model'

@Injectable()
export class ProductService extends CrudService<ProductEntity> {
    constructor(@InjectRepository(ProductEntity) repository: Repository<ProductEntity>) {
        super(repository, ProductModelPaginateQuery.config)
    }
}
