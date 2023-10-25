import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudService } from '@api/core'
import { ShippingRateEntity } from '../entity/ShippingRate.entity'
import { ShippingRateModelPaginateQuery } from '../model/ShippingRate.model'

@Injectable()
export class ShippingRateService extends CrudService<ShippingRateEntity> {
    constructor(@InjectRepository(ShippingRateEntity) repository: Repository<ShippingRateEntity>) {
        super(repository, ShippingRateModelPaginateQuery.config)
    }
}
