import {
    Body,
    Controller,
    Get,
    Logger,
    NotFoundException,
    Param,
    Post,
    Query,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { SharpService } from 'nestjs-sharp'
import * as z from 'zod'
import { AcceptAssetEvent } from '../event/AcceptAsset.event'
import { DeleteAssetEvent } from '../event/DeleteAsset.event'
import { AssetManagerService } from '../service/AssetManager.service'

const assetModelSchema = z.object({
    name: z.string(),
    slug: z.string().regex(/^[a-z0-9-_]+$/),
})

const fileSchema = z.object({
    mimetype: z.string(),
    buffer: z.any(),
})

@Controller()
export class AssetController {
    constructor(readonly assetManagerService: AssetManagerService, readonly sharpService: SharpService) {}

    @EventPattern(AcceptAssetEvent.name)
    async accept(event: AcceptAssetEvent) {
        await this.assetManagerService.setAccepted(event.ids, true)
    }

    @EventPattern(DeleteAssetEvent.name)
    async delete(event: DeleteAssetEvent) {
        await this.assetManagerService.setAccepted(event.ids, false)
    }

    @Post('/v1/asset')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@Body() body: any, @UploadedFile() uploadedFile: any) {
        // TODO: Better schema validation that works also with HTTP Controllers AND GraphQL Resolvers
        const meta = assetModelSchema.parse(body)
        const file = fileSchema.parse(uploadedFile)

        Logger.log(`Uploading asset: ${(uploadedFile.size / 1000).toFixed(1)} kb`)
        return await this.assetManagerService.upload({
            name: meta.name,
            slug: meta.slug,
            type: file.mimetype,
            blob: file.buffer,
        })
    }

    @Get('/v1/asset/:idOrSlug')
    async download(@Param('idOrSlug') idOrSlug: string, @Query() query: any, @Res() response: Response) {
        const { blob, type, name } = await this.assetManagerService.findByIdOrSlug(idOrSlug, {
            blob: true,
            type: true,
            name: true,
        })

        const fileName = this.assetManagerService.getFileName({ name, type })
        if (!this.assetManagerService.isImageType(type)) {
            // Download as file
            response.setHeader('Content-Disposition', `inline; filename=${fileName}`)
            response.setHeader('Content-Type', type)
            response.setHeader('Content-Length', blob.length)
            response.write(blob, 'binary')
            response.end()
            return
        }

        // Download as image
        let sharp = this.sharpService.edit(blob).webp()
        const { width, height } = query || {}
        if (width || height) {
            sharp = sharp.resize({ width, height })
        }

        const buffer = sharp.toBuffer()
        if (!buffer) {
            throw new NotFoundException()
        }

        response.setHeader('Content-Disposition', `inline; filename=${fileName}`)
        response.setHeader('Content-Type', 'image/webp')
        response.setHeader('Content-Length', buffer.length)
        response.write(buffer, 'binary')
        response.end()
    }
}
