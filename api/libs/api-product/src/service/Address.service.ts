import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudService } from '@api/core'
import AddressEntity from '../entity/Address.entity'

@Injectable()
export class AddressService extends CrudService<AddressEntity> {
    constructor(@InjectRepository(AddressEntity) repository: Repository<AddressEntity>) {
        super(repository, {
            sortableColumns: ['createdAt'],
            searchableColumns: [],
            defaultSortBy: [['createdAt', 'DESC']],
        })
    }
}
