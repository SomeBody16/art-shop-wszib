import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class EmptyResponse {
    @Field()
    success: boolean

    protected constructor(success: boolean) {
        this.success = success
    }

    static succeed(): EmptyResponse {
        return new EmptyResponse(true)
    }

    static failed(): EmptyResponse {
        return new EmptyResponse(false)
    }
}
