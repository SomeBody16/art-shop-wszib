import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'

export const getCookie = (ctx: GqlExecutionContext, name: string): string | undefined => {
    const req: Request = ctx.getContext().req
    return req.cookies[name]
}
