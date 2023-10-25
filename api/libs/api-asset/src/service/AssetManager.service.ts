import { CrudService, NotFoundError } from '@api/core'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import mime from 'mime-type/with-db'
import { Repository } from 'typeorm'
import { AssetEntity } from '../entity/Asset.entity'

const selectFields: Partial<Record<keyof AssetEntity, boolean>> = {
    id: true,
    name: true,
    slug: true,
    type: true,
    blob: false,
    accepted: true,
    createdAt: true,
    updatedAt: true,
}

@Injectable()
export class AssetManagerService {
    protected readonly crud: CrudService<AssetEntity>

    constructor(@InjectRepository(AssetEntity) protected repository: Repository<AssetEntity>) {
        this.crud = new CrudService(repository, {
            sortableColumns: ['createdAt'],
            searchableColumns: [],
            defaultSortBy: [['createdAt', 'DESC']],
        })
    }

    async findByIdOrSlug(idOrSlug: string, select = selectFields) {
        return this.repository
            .findOneOrFail({
                where: [{ id: idOrSlug }, { slug: idOrSlug }],
                select,
            })
            .catch(() => {
                throw new NotFoundError(this.repository.metadata.name, { idOrSlug })
            })
    }

    async upload(data: Pick<AssetEntity, 'name' | 'slug' | 'blob' | 'type'>) {
        return this.crud.create(
            {
                ...data,
                accepted: false,
            },
            {
                select: selectFields,
            },
        )
    }

    async setAccepted(ids: string[], accepted: boolean) {
        await this.repository //
            .createQueryBuilder()
            .update()
            .where('id IN :ids', { ids })
            .andWhere('accepted = false')
            .set({ accepted })
            .execute()
    }

    public isImageType(type: string) {
        return ['image/png', 'image/gif', 'image/jpeg', 'image/webp'].includes(type)
    }

    public getFileName(asset: Pick<AssetEntity, 'name' | 'type'>): string {
        return this.isImageType(asset.type) ? `${asset.name}.webp` : `${asset.name}.${mime.extension(asset.type)}`
    }
}
