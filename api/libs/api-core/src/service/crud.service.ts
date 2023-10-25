import { PaginateConfig, PaginateQuery, Paginated, paginate } from 'nestjs-paginate'
import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { NotFoundError } from '../error'

export class CrudService<TEntity extends ObjectLiteral> {
    constructor(
        protected readonly repository: Repository<TEntity>,
        protected readonly paginateConfig: PaginateConfig<TEntity>,
    ) {}

    public async existsById(id: string): Promise<boolean> {
        return this.repository.exist({ where: { id } as any })
    }

    public async assertExistsById(id: string): Promise<void> {
        const exists = await this.existsById(id)
        if (!exists) {
            throw new NotFoundError(this.repository.metadata.name, { id })
        }
    }

    public async findById(id: string, options?: FindOneOptions<TEntity>): Promise<TEntity> {
        return this.repository.findOneOrFail({ where: { id } as any, ...options }).catch(() => {
            throw new NotFoundError(this.repository.metadata.name, { id })
        })
    }

    public async findMany(query: Omit<PaginateQuery, 'path'>): Promise<Omit<Paginated<TEntity>, 'links'>> {
        const result: any = await paginate<TEntity>(
            {
                ...query,
                path: '',
            },
            this.repository,
            this.paginateConfig,
        )
        delete result['links']
        return result
    }

    public async create(data: Partial<TEntity>, options?: FindOneOptions<TEntity>): Promise<TEntity> {
        const entity = this.repository.create(data as any)
        const { id } = (await this.repository.save(entity)) as any
        return this.findById(id, options)
    }

    public async patch(
        id: string,
        data: QueryDeepPartialEntity<TEntity>,
        options?: FindOneOptions<TEntity>,
    ): Promise<TEntity> {
        await this.repository.update(id, data)
        return this.findById(id, options)
    }

    public async deleteById(id: string) {
        await this.repository.delete(id)
    }
}
