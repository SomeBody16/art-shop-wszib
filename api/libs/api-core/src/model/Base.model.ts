import { Field, ObjectType } from '@nestjs/graphql'
import * as Validate from '../validate'

@ObjectType()
export class BaseModel {
    @Field()
    @Validate.String()
    id: string

    @Field()
    @Validate.Date()
    createdAt: Date

    @Field()
    @Validate.Date()
    updatedAt: Date
}
