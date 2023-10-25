import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudService } from '@api/core'
import CustomerEntity from '../entity/Customer.entity'
import { CustomerModelPaginateQuery } from '../model/Customer.model'

@Injectable()
export class CustomerService extends CrudService<CustomerEntity> {
    constructor(@InjectRepository(CustomerEntity) repository: Repository<CustomerEntity>) {
        super(repository, CustomerModelPaginateQuery.config)
    }
}
