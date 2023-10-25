import { AssetService } from '@api/asset'
import { EmptyResponse } from '@api/core'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
    ProductCreateInput,
    ProductModel,
    ProductModelPaginateQuery,
    ProductModelPaginated,
    ProductPatchInput,
} from '../model/Product.model'
import { ProductService } from '../service/Product.service'

@Resolver(() => ProductModel)
export class ProductResolver {
    constructor(protected productService: ProductService, protected assetService: AssetService) {}

    @Query(() => ProductModel)
    async getProduct(@Args('id') id: string): Promise<ProductModel> {
        return this.productService.findById(id)
    }

    @Query(() => ProductModelPaginated)
    async getProducts(
        @Args('query', { nullable: true }) query: ProductModelPaginateQuery,
    ): Promise<ProductModelPaginated> {
        return this.productService.findMany(query)
    }

    @Mutation(() => ProductModel)
    async createProduct(@Args('data') data: ProductCreateInput): Promise<ProductModel> {
        const product = await this.productService.create(data)
        await this.assetService.accept(product.imageIds)
        return product
    }

    @Mutation(() => ProductModel)
    async patchProduct(@Args('id') id: string, @Args('data') data: ProductPatchInput): Promise<ProductModel> {
        return this.productService.patch(id, data)
    }

    @Mutation(() => EmptyResponse)
    async deleteProduct(@Args('id') id: string): Promise<EmptyResponse> {
        this.productService
            .findById(id)
            .then(async (product) => {
                await this.productService.deleteById(id)
                await this.assetService.delete(product.imageIds)
            })
            .catch()

        return EmptyResponse.succeed()
    }
}
