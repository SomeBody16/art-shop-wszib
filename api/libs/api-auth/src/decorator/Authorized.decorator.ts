import { RolePermission } from '../entity/Role.entity'
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthorizedGuard } from '../guard/Authorized.guard'

export type AuthorizedMetadata = {
    permissions?: Omit<RolePermission, 'SUPER_ADMIN' | 'LOGIN'>[]
}

export const AUTHORIZED_METADATA = 'AUTHORIZED_METADATA'
export const Authorized = (metadata?: AuthorizedMetadata) =>
    applyDecorators(
        //
        UseGuards(AuthorizedGuard),
        SetMetadata(AUTHORIZED_METADATA, metadata || {}),
    )
