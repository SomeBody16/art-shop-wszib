import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common'

export interface Seeder {
    execute(): Promise<void>
}

export const SEEDER_METADATA = 'SEEDER_METADATA'

export const Seeder = () =>
    applyDecorators(
        //
        SetMetadata(SEEDER_METADATA, true),
        Injectable(),
    )
