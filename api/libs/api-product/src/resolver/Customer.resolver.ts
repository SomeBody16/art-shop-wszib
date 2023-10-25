import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CustomerModel, CustomerModelPaginated, CustomerModelPaginateQuery } from '../model/Customer.model'
import { CustomerService } from '../service/Customer.service'
import { AddressService } from '../service/Address.service'
import { AddressModel } from '../model/Address.model'

@Resolver(() => CustomerModel)
export class CustomerResolver {
    constructor(protected customerService: CustomerService, protected addressService: AddressService) {}

    @Query(() => CustomerModel)
    async getCustomer(@Args('id') id: string): Promise<CustomerModel> {
        return this.customerService.findById(id)
    }

    @ResolveField(() => AddressModel)
    async address(@Parent() customer: CustomerModel): Promise<AddressModel> {
        return this.addressService.findById(customer.addressIds[0])
    }

    @Query(() => CustomerModelPaginated)
    async getCustomers(
        @Args('query', { nullable: true }) query: CustomerModelPaginateQuery,
    ): Promise<CustomerModelPaginated> {
        return this.customerService.findMany(query)
    }
}
