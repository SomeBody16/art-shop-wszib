import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthUrlResponse {
    @Field()
    url: string
}

@ObjectType()
export class AuthTokenResponse {
    @Field()
    token: string
}
