import { BaseModel, Validate } from '@api/core'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AddressModel extends BaseModel {
    @Field()
    @Validate.String()
    city: string

    @Field()
    @Validate.String()
    state: string

    @Field()
    @Validate.String()
    country: string

    @Field()
    @Validate.String()
    line1: string

    @Field({ nullable: true })
    @Validate.String()
    @Validate.Optional()
    line2?: string

    @Field()
    @Validate.String()
    zipCode: string
}
